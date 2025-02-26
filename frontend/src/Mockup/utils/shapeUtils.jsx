export const getBoxDimensions = (boxType) => {
    const dimensions = {
      "square-box": { width: 10, height: 10, depth: 10 },
      "tall-bottle-box": { width: 8, height: 20, depth: 8 },
      "tuck-end-box": { width: 12, height: 10, depth: 5 },
      "pizza-box": { width: 15, height: 3, depth: 15 },
      "flip-top-box": { width: 10, height: 8, depth: 5 },
      "cylinder": { radius: 6, height: 12 },
    };
  
    return dimensions[boxType] || { width: 10, height: 10, depth: 10 };
  };
  
  export const convertInchesToCM = (value) => (value * 2.54).toFixed(2);
  