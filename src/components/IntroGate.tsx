import React, { useState } from 'react';

interface IntroGateProps {
  onEnter: () => void;
}

export const IntroGate: React.FC<IntroGateProps> = ({ onEnter }) => {
  const [exiting, setExiting] = useState(false);

  const handleClick = () => {
    setExiting(true);
    // Give time for scale/opacity exit animation (0.9s duration from style.css)
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div
      id="intro"
      className={exiting ? 'exit' : ''}
      onClick={handleClick}
    >
      <img
        src="https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsind.png"
        className="intro-logo"
        alt="arcsendo logo"
        referrerPolicy="no-referrer"
      />
      <div className="intro-enter">
        click to enter<span>_</span>
      </div>
    </div>
  );
};
export default IntroGate;
