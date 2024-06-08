import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimalCard from './AnimalCard';

const AnimalGallery = ({ type }) => {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await axios.get(`https://freetestapi.com/api/v1/${type}`);
      setAnimals(response.data);
    };
    fetchAnimals();
  }, [type]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderDetails = (animal) => {
    if (type === 'birds'){
      return (
        <>
        <p>Species: {animal.species}</p>
        <p>Family: {animal.family}</p>
        <p>Habitat: {animal.habitat}</p>
        <p>Place of Found: {animal.place_of_found}</p>
        <p>Diet: {animal.diet}</p>
        <p>Description: {animal.description}</p>
        <p>Weight (kg): {animal.weight_kg}</p>
        <p>Height (cm): {animal.height_cm}</p>
        </>
      );
    } else if (type === 'dogs') {
      return (
        <>
        <p>Breed Group: {animal.breed_group}</p>
        <p>Size: {animal.size}</p>
        <p>Lifespan: {animal.lifespan}</p>
        <p>Origin: {animal.origin}</p>
        <p>Temperament: {animal.temperament}</p>
        <p>Colors: {animal.colors.join(',')}</p>
        <p>Description: {animal.description}</p>
        </>
      );
    } else if (type === 'cats')
      return (
        <>
        <p>Origin: {animal.origin}</p>
        <p>Temperament: {animal.temperament}</p>
        <p>Colors: {animal.colors.join(',')}</p>
        <p>Description: {animal.description}</p>
        </>
      );
  };

  return (
    <section>
      <input
        type="text"
        placeholder="Search animals..."
        value={search}
        onChange={handleSearchChange}
      />
      <div className="animal-gallery">
        {filteredAnimals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} onClick={setSelectedAnimal} />
        ))}
      </div>
      {selectedAnimal && (
        <div className="animal-popup">
          <h2>{selectedAnimal.name}</h2>
          <img src={selectedAnimal.image} alt={selectedAnimal.name} />
          {renderDetails(selectedAnimal)}
          <button onClick={() => setSelectedAnimal(null)}>Close</button>
        </div>
      )}
    </section>
  );
};

export default AnimalGallery;
