import React from "react";
import "./Palette.css";

const Palette = ({ colors, onChangeColor }) => {
  const style = [];
  colors.forEach(color => {
    style.push({
      background: color
    });
  });

  return (
    <div className="palette">
      {colors.map((color, idx) => (
        <div
          className="rectangle"
          onClick={() => onChangeColor(idx)}
          key={idx}
          id={idx}
          style={style[idx]}
        />
      ))}
    </div>
  );
};

export default Palette;
