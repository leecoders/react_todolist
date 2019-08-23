import React from "react";
import "./Palette.css";

const Palette = ({ colors, opacities, onChangeColor }) => {
  const style = [];
  colors.map((color, idx) => {
    style.push({
      background: color,
      opacity: opacities[idx]
    });
  });

  return (
    <div className="palette">
      {colors.map((color, idx) => (
        <div
          className="rectangle"
          onClick={() => {
            onChangeColor(idx);
          }}
          key={idx}
          id={idx}
          style={style[idx]}
        />
      ))}
    </div>
  );
};

export default Palette;
