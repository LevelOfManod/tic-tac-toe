import React from "react";
import Square from "../Square/Square";

import Croix from "../asset/img/croix.svg";
import Rond from "../asset/img/rond.svg";

const Board = ({ xIsNext, squares, onPlay, reload }) => {

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      const aImage = squares[a] && squares[a].props && squares[a].props.src;
      const bImage = squares[b] && squares[b].props && squares[b].props.src;
      const cImage = squares[c] && squares[c].props && squares[c].props.src;

      if (aImage && aImage === bImage && aImage === cImage) {
        return aImage === Croix ? "X" : "O";
      }
    }

    return null;
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = <img className="target" src={Croix} alt="croix" />;
    } else {
      nextSquares[i] = <img className="target" src={Rond} alt="rond" />;
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = {
    winner: "",
    next: "",
  };

  if (winner) {
    const winnerZone = document.getElementById("winner");
    const nextTourZone = document.getElementById("nextTourZone");
    const nobodyWin = document.getElementById("nobodyWin");
    nextTourZone.style.display = "none"
    nobodyWin.style.display = "none"
    winnerZone.style.display = "block";
    status.winner = winner + " a gagné";
  } else {
    status.next = "Prochain tour: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flexCol board h100">
      <div id="nextTourZone" className="status tal">{status.next}</div>

      <div id="winner">
        <div className="winnerArea flex flexCol jcs aic gp50">
          <div id="winnerName">
            <p className="tag">{status.winner}</p>
          </div>

          <div id="nobodyWin">
            <p className="tag">Aucun joueur n'a gagné</p>
          </div>

          <div>
            <button onClick={reload} className="btnRestart">
              Recommencer une nouvelle partie
            </button>
          </div>
        </div>
      </div>

      <div className="boardRow flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="boardRow flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="boardRow flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

export default Board;
