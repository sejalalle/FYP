import React, { useRef, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Cylinder = ({
  faceColors,
  faceImages,
  imagePositions,
  imageScales,
  setSelectedFace,
}) => {
  const cylinderRef = useRef();

  const textures = useMemo(() => {
    return faceImages.map((image) => {
      if (!image) return null;
      const texture = new THREE.TextureLoader().load(image);
      texture.needsUpdate = true;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    });
  }, [faceImages]);

  useEffect(() => {
    textures.forEach((texture) => {
      if (texture) texture.needsUpdate = true;
    });
  }, [textures]);

  const materials = useMemo(() => {
    return faceColors.map((color, index) => {
      const baseMaterial = new THREE.MeshBasicMaterial({
        color: color || "#ffffff",
        side: THREE.DoubleSide,
      });

      if (textures[index]) {
        textures[index].center.set(0.5, 0.5);
        textures[index].repeat.set(imageScales[index], imageScales[index]);
        textures[index].offset.set(imagePositions[index].x, imagePositions[index].y);

        const imageMaterial = new THREE.MeshBasicMaterial({
          map: textures[index],
          transparent: true,
          alphaTest: 0.1,
          side: THREE.DoubleSide,
        });

        return [baseMaterial, imageMaterial];
      }

      return [baseMaterial];
    });
  }, [faceColors, textures, imagePositions, imageScales]);

  const handleFaceClick = (event, faceIndex) => {
    event.stopPropagation();
    setSelectedFace(faceIndex);
  };

  return (
    <group>
      <mesh ref={cylinderRef} onPointerDown={(event) => handleFaceClick(event, 0)}>
        <cylinderGeometry args={[1, 1, 2, 64, 1, true]} />
        {materials[0]?.map((material, matIndex) => (
          <primitive key={`0-${matIndex}`} attach={`material-0`} object={material} />
        ))}
      </mesh>

      <mesh
        position={[0, 1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={(event) => handleFaceClick(event, 1)}
      >
        <circleGeometry args={[1, 64]} />
        {materials[1]?.map((material, matIndex) => (
          <primitive key={`1-${matIndex}`} attach="material" object={material} />
        ))}
      </mesh>

      <mesh
        position={[0, -1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerDown={(event) => handleFaceClick(event, 2)}
      >
        <circleGeometry args={[1, 64]} />
        {materials[2]?.map((material, matIndex) => (
          <primitive key={`2-${matIndex}`} attach="material" object={material} />
        ))}
      </mesh>
    </group>
  );
};

const CylinderRenderer = ({
  faceColors,
  faceImages,
  imagePositions,
  imageScales,
  setSelectedFace,
  backgroundColor,
}) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Cylinder
          faceColors={faceColors}
          faceImages={faceImages}
          imagePositions={imagePositions}
          imageScales={imageScales}
          setSelectedFace={setSelectedFace}
        />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default CylinderRenderer;