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
                Happy 12th Birthday, Princess! 🎉🥳
              </span>
              <br /><br />
              Yo sis, happy birthday how you doin? I hope you're doing well, you
              grow up so fast—you’re like so tall na, even taller than Ate! 😆
              Sorry, medyo busy sa school si Kuya. Chat mo ko minsan di ka na nagcha-chat, imissyou. 
              Keep up the good work in school—I'm proud of you! I'm here if you need help. 
              Hope makapag-bonding us soon😩. Here's a simple game hope you like it. Btw this only works on laptop or pc i didnt design it for phone xD.
              <br /><br />
              Kuya loves you always! XOXO ❤️ Take care and enjoy your day! 🎂🎁
              <br /><br />
              <span className="signature">~ Kuya</span>
            </p>
            <div className="continue-label" onClick={onContinue}>
              Continue
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
