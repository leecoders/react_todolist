import React from "react";
import "./Palette.css";

const Palette = ({ colors, opacities, onChangeColor }) => {
  const style = [];
  colors.map((color, idx) => {
    style.push({
      background: color
      // opacity: opacities[idx] // 이 부분 수정해야할 듯
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
