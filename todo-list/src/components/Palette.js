import React, { Component } from "react";
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
          onClick={onChangeColor}
          key={idx}
          id={idx}
          style={style[idx]}
        />
      ))}
    </div>
  );
};

export default Palette;
