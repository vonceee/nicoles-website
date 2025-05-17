import React, { useState, useEffect, useRef } from "react";
import "./styles/MemoryMatch.css";
import album1 from "./assets/pic1.jpg";
import album2 from "./assets/pic2.jpg";
import album3 from "./assets/pic3.jpg";
import album4 from "./assets/pic4.jpg";
import cardClickSound from "./assets/button-click.wav";

const cardImages = [
  { id: 1, src: album1 },
  { id: 2, src: album2 },
  { id: 3, src: album3 },
  { id: 4, src: album4 },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const MemoryMatch = ({ onContinue, onClose }) => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const totalPairs = cardImages.length;
  const [gameOver, setGameOver] = useState(false);

  const clickAudioRef = useRef(null);

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play();
    }
  };

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
    playClickSound();
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
      <audio ref={clickAudioRef} src={cardClickSound} preload="auto" />
      <div className="memory-match-container">
        {onClose && (
          <button className="close-button" onClick={onClose}>&times;</button>
        )}
        <h2>Memory Match</h2>
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