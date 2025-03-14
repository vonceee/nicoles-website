import React, { useState, useEffect } from "react";
import "./styles/Timer.css";
import FaPlay from "./assets/timermode-play-48.png";
import FaRedo from "./assets/timermode-reset-48.png";

const TimerMode = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 1, seconds: 0 });
  const [remainingTime, setRemainingTime] = useState(timeToSeconds(time));
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const circumference = 2 * Math.PI * 60;
  const progress = remainingTime / timeToSeconds(time);

  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  function formatTwoDigits(num) {
    return String(num).padStart(2, "0");
  }

  function timeToSeconds({ hours, minutes, seconds }) {
    return hours * 3600 + minutes * 60 + seconds;
  }

  function secondsToTime(seconds) {
    return {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };
  }

  const handleStartPause = () => {
    if (remainingTime > 0) setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingTime(timeToSeconds(time));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateTime = (field, value) => {
    const newTime = {
      ...time,
      [field]: Math.max(0, Math.min(value, field === "hours" ? 99 : 59)),
    };
    setTime(newTime);
    setRemainingTime(timeToSeconds(newTime));
  };

  return (
    <div className="timer-container">
      {/* Timer Circle */}
      <div className="circular-timer" onClick={openModal}>
        <svg viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="60" className="background-circle" />
          <circle
            cx="75"
            cy="75"
            r="60"
            className="progress-circle"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress * circumference}
          />
        </svg>
        <div className="timer-display">
          {formatTwoDigits(secondsToTime(remainingTime).hours)}:
          {formatTwoDigits(secondsToTime(remainingTime).minutes)}:
          {formatTwoDigits(secondsToTime(remainingTime).seconds)}
        </div>
      </div>

      {/* Buttons */}
      <div className="timer-buttons">
        <button onClick={handleStartPause} className="icon-button">
          <img src={FaPlay} alt="Start" width="30" height="30" />
        </button>
        <button onClick={handleReset} className="icon-button">
          <img src={FaRedo} alt="Reset" width="30" height="30" />
        </button>
      </div>

      {/* Time Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Set Timer</h3>
            <div className="time-inputs">
              {["hours", "minutes", "seconds"].map((unit) => (
                <div key={unit} className="time-control">
                  <button onClick={() => updateTime(unit, time[unit] + 1)}>▲</button>
                  <input
                    type="number"
                    value={formatTwoDigits(time[unit])}
                    onChange={(e) => updateTime(unit, parseInt(e.target.value) || 0)}
                    onBlur={(e) => updateTime(unit, parseInt(e.target.value) || 0)} // Ensure format when unfocused
                  />
                  <button onClick={() => updateTime(unit, time[unit] - 1)}>▼</button>
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button className="ok-button" onClick={closeModal}>OK</button>
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerMode;
