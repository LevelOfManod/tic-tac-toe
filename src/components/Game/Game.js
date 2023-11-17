import React, { useState } from "react";
import Board from "../Board/Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    if (nextHistory.length === 10) {
      console.log("Tous les coups ont été joués.");
      const deleteScoreZone = document.getElementById("winner");
      const nextTour = document.getElementById("nextTourZone");
      const winnerName = document.getElementById("winnerName");
      deleteScoreZone.style.display = "block";
      nextTour.style.display = "none";
      winnerName.style.display = "none";
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    const deleteScoreZone = document.getElementById("winner");
    deleteScoreZone.style.display = "none";
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Revenir au coup n° " + move;
    } else {
      description = "- Revenir au début -";
    }
    return (
      <li key={move}>
        <button className="btnMove w100" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  const refreshPage = () => {
    document.location.reload();
  };

  return (
    <div className="flex aic gp50 game">
      <div className="w60 h100">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          reload={() => refreshPage()}
        />
      </div>

      <div className="settings flex flexCol w40">
        <div className="flex flexCol gp50">
          <button onClick={refreshPage} className="btnRestart">
            Recommencer
          </button>
          
          {history.length > 1 && <ul className="flex flexCol gp16">{moves}</ul>}
        </div>
      </div>
    </div>
  );
};

export default Game;
