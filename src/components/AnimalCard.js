import React from 'react';

const AnimalCard = ({ animal, onClick, type }) => {
  return (
    <div className="animal-card" onClick={() => onClick(animal)}>
      <img src={animal.image} alt={animal.name} />
      <h3>{animal.name}</h3>
      <p>{type === 'birds' ? `Habitat: ${animal.habitat}` : `Origin: ${animal.origin}`}</p>
    </div>
  );
};

export default AnimalCard;
