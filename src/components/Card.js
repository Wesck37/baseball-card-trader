import React, { useState } from 'react';
import './Card.css';

const Card = ({ frontImage, backImage, title, link }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <div className={`card ${flipped ? 'flipped' : ''}`}>
        <div className="front">
          <img src={frontImage} alt={`${title} Front`} />
        </div>
        <div className="back">
          <img src={backImage} alt={`${title} Back`} />
        </div>
      </div>
      <h3>{title}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer">
        View on eBay
      </a>
    </div>
  );
};

export default Card;
