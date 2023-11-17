import React from "react";

const Square = ({ value, onSquareClick }) => {

  return (
    <button onClick={onSquareClick} className="square w100">
      {value}
    </button>
  );
};

export default Square;
