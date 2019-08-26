import React from "react";
import "./Palette.css";

const Palette = ({ colors, isColorClicked, onChangeColor }) => {
  const style = [];
  colors.map((color, idx) => {
    style.push({
      background: color
    });
  });

  return (
    <div className="palette">
      {colors.map((color, idx) => (
        <div
          className={`${isColorClicked[idx] ? "clicked" : "rectangle"}`}
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
