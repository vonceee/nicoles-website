import React, { useState } from "react";
import "./styles/QuizGame.css";

const questions = [
  {
    question: "When is Nicole & Johncenn's anniversary?",
    options: ["November 21, 2015", "September 7, 2015", "September 10, 2015", "August 14, 2015"],
    correct: "September 7, 2015",
    messages: {
      correct:
        "Correct! Grabe, It's been 9 years already, time flies so fast! and i love you still~ 💓",
      incorrect:
        "Oops! It's actually September 7! Nicole specifically chose to say YES on the day 7 as it is God's number. 💓"
    }
  },
  {
    question: "What is Nicole & Johncenn's Go To Duet in Karaoke?",
    options: ["My Way", "Breaking Free", "Always Remember Us This Way", "Way Back Into Love"],
    correct: "Way Back Into Love",
    messages: {
      correct: "Correct! We spent hours singing & practicing this song together! 🎤",
      incorrect: "Not quite! HAHA It's way back into love. We spent hours singing this song together! 🎤"
    }
  },
  {
    question: "What is Nicole & Johncenn's Favorite Bonding Together?",
    options: ["Praying", "Eating", "Watching Movies", "👀👀"],
    correct: "Praying",
    messages: {
      correct:
        "Correct! Actually, ALL OF THE ABOVE! But our most favorite is praying together. 💓",
      incorrect:
        "Not quite! Actually, ALL OF THE ABOVE! But our most favorite is praying together. 💓"
    }
  }
];

const QuizGame = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(option);
      setShowFeedback(true);
      if (option === currentQuestion.correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="quiz-overlay">
      <div className="quiz-container">
        {/* Close Button */}
        {onClose && (
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        )}
        {!quizComplete ? (
          <div className="quiz-card">
            <h2>{currentQuestion.question}</h2>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    selectedAnswer === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {showFeedback && (
              <div className="feedback-message">
                {selectedAnswer === currentQuestion.correct
                  ? currentQuestion.messages.correct
                  : currentQuestion.messages.incorrect}
              </div>
            )}
            {selectedAnswer && (
              <button className="next-button" onClick={handleNextQuestion}>
                Next Question
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-card">
            <h2>Quiz Complete!</h2>
            <p>
              Your score: {score} / {questions.length}
            </p>
            <button className="restart-button" onClick={restartQuiz}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
