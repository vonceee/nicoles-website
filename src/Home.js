import React, { useState } from "react";
import envelopeClosed from "./assets/envelope.png";
import envelopeOpen from "./assets/envelope-open.png";

function Home({ onContinue }) {
  const [opened, setOpened] = useState(false);

  const handleEnvelopeClick = () => {
    setOpened(true);
  };

  return (
    <div className="container">
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
              <span className="greeting">Happy 12th Birthday, Princess! 🎉🥳</span>
              <br /><br />
              yo sis, happy birthday i hope youre doing well, you grow up so fast you're like so tall na you're taller than ate😆
              enjoy your day, imissyou, Keep up the good work in school—I’m proud of you! 
              Hope makapag bonding us soon😩.
              <br /><br />
              Kuya loves you always! ❤️ Take care and enjoy your day! 🎂🎁
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
