import React, { useState, useRef } from "react";
import envelopeClosed from "./assets/envelope.png";
import envelopeOpen from "./assets/envelope-open.png";
import openingSound from "./assets/opening-sound.mp3"; // Ensure this file exists in your assets folder

function Home({ onContinue }) {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);

  const handleEnvelopeClick = () => {
    setOpened(true);
    // Play the sound effect when the envelope is opened
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="container">
      {/* Audio element for the envelope opening sound */}
      <audio ref={audioRef} src={openingSound} preload="auto" />

      {!opened ? (
        <div className="envelope-container" onClick={handleEnvelopeClick}>
          <img
            src={envelopeClosed}
            alt="Closed Envelope"
            className="envelope closed"
          />
          <div className="label">Click to Open</div>
        </div>
      ) : (
        <div className="envelope-container">
          <img
            src={envelopeOpen}
            alt="Open Envelope"
            className="envelope open"
          />
          <div className="letter">
            <p className="message">
              <span className="greeting">
                Happy 9 years and 9 months, mahal Johncenn! 🥰🎉🥳
              </span>
              <br /><br />
              Almost a decade of love, laughter, and everything in between! 💖 I just want to let you know
              that I am so grateful for you and everything that you do. As alwasys, you are my rock, my partner, and my best friend. I love you so much! 💕
              <br /><br />
              You deserve all the good things that life has to offer! ❤️
              <br /><br />
              <span className="signature">~ Take care, Mahal Nicole 😘</span>
            </p>
            <div className="continue-label" onClick={onContinue} style={{ color: 'pink' }}>
              Next Chapter
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
