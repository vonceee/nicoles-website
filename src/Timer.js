import React, { useState } from 'react';
import './styles/Timer.css';
import TimerMode from './TimerMode';
import StopwatchMode from './StopwatchMode';
import FocusMode from './FocusMode';
import timerIcon from './assets/timer-timer-48.png';
import stopwatchIcon from './assets/timer-stopwatch-48.png';
import focusIcon from './assets/timer-focus-48.png';

const Timer = ({ onBack }) => {
  const [mode, setMode] = useState(null);

  const renderOptionsPanel = () => (
    <div className="select-mode-panel">
      <h2>Select Mode</h2>
      <ul className="select-mode-buttons">
        <li>
          <button onClick={() => setMode("timer")}>
            <img src={timerIcon} alt="Timer" className="mode-icon" />
            Timer
          </button>
        </li>
        <li>
          <button onClick={() => setMode("stopwatch")}>
            <img src={stopwatchIcon} alt="Stopwatch" className="mode-icon" />
            Stopwatch
          </button>
        </li>
        <li>
          <button onClick={() => setMode("focus")}>
            <img src={focusIcon} alt="Focus Mode" className="mode-icon" />
            Focus Mode
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="timer-tool-modal">
      <div className="timer-tool">
        <div className="timer-header">
          <h2>Timer Tool</h2>
          {onBack && (
            <button className="close-button" onClick={onBack}>&times;</button>
          )}
        </div>
        <div className="timer-body">
          {mode === null && renderOptionsPanel()}
          {mode === "timer" && <TimerMode progress={0.5} time="25:00" />}
          {mode === "stopwatch" && <StopwatchMode />}
          {mode === "focus" && <FocusMode />}
        </div>
      </div>
    </div>
  );
};

export default Timer;
