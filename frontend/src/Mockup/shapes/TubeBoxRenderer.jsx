import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const TubeBox = ({
  faceColors,
  faceImages,
  imagePositions,
  imageScales,
  setSelectedFace,
}) => {
  const boxRef = useRef();
  const [textures, setTextures] = useState([]);

  useEffect(() => {
    const loadedTextures = faceImages.map((image) => {
      if (image) {
        const texture = new THREE.TextureLoader().load(image, () => {
          texture.needsUpdate = true;
          setTextures((prev) => [...prev]);
        });
        return texture;
      }
      return null;
    });

    setTextures(loadedTextures);
  }, [faceImages]);

  const materials = faceColors.map((color, index) => {
    const baseMaterial = new THREE.MeshBasicMaterial({
      color: color || "#ffffff",
      side: THREE.DoubleSide,
    });

    if (textures[index]) {
      textures[index].center.set(0.5, 0.5);
      textures[index].repeat.set(imageScales[index], imageScales[index]);
      textures[index].offset.set(imagePositions[index].x, imagePositions[index].y);
      textures[index].needsUpdate = true;

      const imageMaterial = new THREE.MeshBasicMaterial({
        map: textures[index],
        transparent: true,
        side: THREE.DoubleSide,
      });

      return [baseMaterial, imageMaterial];
    }

    return [baseMaterial];
  });

  const handleFaceClick = (event) => {
    setSelectedFace(event.face.materialIndex);
  };

  return (
    <group>
      <mesh ref={boxRef} onPointerDown={handleFaceClick}>
        <boxGeometry args={[5, 1, 1]} />
        {materials.map((materialSet, index) =>
          materialSet.map((material, subIndex) => (
            <primitive key={`${index}-${subIndex}`} attach={`material-${index}`} object={material} />
          ))
        )}
      </mesh>
    </group>
  );
};

const TubeBoxRenderer = ({
  faceColors,
  faceImages,
  imagePositions,
  imageScales,
  setSelectedFace,
  backgroundColor,
}) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 3, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <TubeBox
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

export default TubeBoxRenderer;