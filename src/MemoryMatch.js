import React, { useState, useEffect } from "react";
import "./styles/MemoryMatch.css";
import album1 from "./assets/album1.jpg";
import album2 from "./assets/album2.jpg";
import album3 from "./assets/album3.jpg";
import album4 from "./assets/album4.jpg";

const cardImages = [
  { id: 1, src: album1 },
  { id: 2, src: album2 },
  { id: 3, src: album3 },
  { id: 4, src: album4 },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const MemoryMatch = ({ onContinue }) => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const totalPairs = cardImages.length;
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffledCards = shuffleArray([...cardImages, ...cardImages]).map(
      (card, index) => ({
        ...card,
        uuid: index,
        flipped: false,
        matched: false,
      })
    );
    setCards(shuffledCards);
    setTurns(0);
    setMatchedPairs(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameOver(false);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      if (!choiceOne) {
        setChoiceOne(card);
      } else if (!choiceTwo && card !== choiceOne) {
        setChoiceTwo(card);
      }
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && matchedPairs === totalPairs) {
      setTimeout(() => setGameOver(true), 500);
    }
  }, [cards, matchedPairs, totalPairs]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="memory-match-overlay">
      <div className="memory-match-container">
        <h2>Memory Match Game</h2>
        <div className="card-grid">
          {cards.map((card) => (
            <div
              key={card.uuid}
              className={`card ${
                card.matched || card === choiceOne || card === choiceTwo
                  ? "flipped"
                  : ""
              }`}
              onClick={() => handleChoice(card)}
            >
              <div className="card-front">
                <img src={card.src} alt="card front" />
              </div>
              <div className="card-back">
                <span>?</span>
              </div>
            </div>
          ))}
        </div>
        <p>Turns: {turns}</p>
        <button className="restart-button" onClick={startGame}>
          Restart Game
        </button>
      </div>

      {gameOver && (
        <div className="congrats-message">
          <h2>Congratulations!</h2>
          <p>You completed the game in {turns} turns!</p>
          <button className="continue-button" onClick={onContinue}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;
