import React, { useState } from "react";
import "./styles/QuizGame.css";

const questions = [
  {
    question: "What is Princess's favorite color?",
    options: ["Pink", "Blue", "Green", "Yellow"],
    correct: "Pink",
    messages: {
      correct: "That's right! Princess adores pink!",
      incorrect: "Oops! Try again—she loves pink!"
    }
  },
  {
    question: "What subject does Princess excel at?",
    options: ["Math", "Science", "Art", "History"],
    correct: "Art",
    messages: {
      correct: "Exactly! Her creativity shines in Art!",
      incorrect: "Not quite—she's truly gifted in Art!"
    }
  },
  {
    question: "Which snack is Princess’s favorite?",
    options: ["Chips", "Cookies", "Fruit", "Candy"],
    correct: "Candy",
    messages: {
      correct: "Correct! Candy is her sweet delight!",
      incorrect: "Nope, you gotta know—she loves Candy!"
    }
  },
  // Add additional questions as needed
];

const QuizGame = () => {
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
    <div className="quiz-container">
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
          <p>Your score: {score} / {questions.length}</p>
          <button className="restart-button" onClick={restartQuiz}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
