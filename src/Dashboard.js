import React, { useState, useRef } from 'react';
import './styles/Dashboard.css';
import backgroundMusic from './assets/8bits.mp3';
import buttonClickSound from './assets/button-click.wav';

// Import images from your assets
import calculatorImg from './assets/icons8-calculator-64.png';
import timerImg from './assets/icons8-timer-64.png';
import notesImg from './assets/icons8-notes-64.png';

// Import your downloaded volume icons
import volumeOnIcon from './assets/volume-on.png';
import volumeOffIcon from './assets/volume-off.png';

// Import your tool components
import ScientificCalculator from './ScientificCalculator';
import Timer from './Timer';
import Notes from './Notes';
import MemoryMatch from './MemoryMatch';
import QuizGame from './QuizGame';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // activeTool can be "memoryMatch", "quizGame", "calculator", "timer", "notes", or null
  const [activeTool, setActiveTool] = useState(null);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  const clickAudioRef = useRef(null); // Ref for the button click sound

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play();
    }
  };

  const handleToolsClick = (e) => {
    e.preventDefault();
    playClickSound();
    setIsModalOpen(true);
    setActiveTool(null);
  };

  const handleCloseModal = () => {
    playClickSound();
    setIsModalOpen(false);
    setActiveTool(null);
  };

  const handleSelectTool = (tool) => {
    playClickSound();
    setActiveTool(tool);
  };

  const handleToggleMute = () => {
    playClickSound();
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleMessageClick = () => {
    playClickSound();
    // Navigate back to Home.js (assuming home is served at '/')
    window.location.href = '/';
  };

  return (
    <>
      {/* Background Music */}
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop />

      {/* Button click sound */}
      <audio ref={clickAudioRef} src={buttonClickSound} preload="auto" />

      <div className="dashboard">
        {/* Menu Container */}
        <div className="menu-container">
          <ul className="menu">
            <li>
              <a
                href="#"
                onClick={() => {
                  playClickSound();
                  setActiveTool("memoryMatch");
                }}
              >
                Start
              </a>
            </li>
            <li>
              <a href="#" onClick={handleMessageClick}>
                Letter
              </a>
            </li>
            <li>
              <button className="volume-button" onClick={handleToggleMute}>
                <img
                  src={muted ? volumeOffIcon : volumeOnIcon}
                  alt="Volume"
                  className="volume-icon"
                />
              </button>
            </li>
          </ul>
        </div>

        {/* Toolbar Modal */}
        {isModalOpen && !activeTool && (
          <div className="toolbar-modal">
            <div className="toolbar-content">
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
              <h2>Tools</h2>
              <div className="tool-icons">
                <button onClick={() => handleSelectTool('calculator')}>
                  <img src={calculatorImg} alt="Calculator" />
                </button>
                <button onClick={() => handleSelectTool('timer')}>
                  <img src={timerImg} alt="Timer" />
                </button>
                <button onClick={() => handleSelectTool('notes')}>
                  <img src={notesImg} alt="Notes" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render the active tool */}
        {activeTool === 'memoryMatch' && (
          <div className="tool-component">
            <MemoryMatch
              onContinue={() => setActiveTool("quizGame")}
              onClose={() => setActiveTool(null)}
            />
          </div>
        )}
        {activeTool === 'quizGame' && (
          <div className="tool-component">
            <QuizGame onClose={() => setActiveTool(null)} />
          </div>
        )}
        {activeTool === 'calculator' && (
          <div className="tool-component">
            <ScientificCalculator onBack={() => setActiveTool(null)} />
          </div>
        )}
        {activeTool === 'timer' && (
          <div className="tool-component">
            <Timer onBack={() => setActiveTool(null)} />
          </div>
        )}
        {activeTool === 'notes' && (
          <div className="tool-component">
            <Notes onBack={() => setActiveTool(null)} />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
