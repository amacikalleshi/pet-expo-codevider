import React from 'react';

const Header = ({ setAnimalType, setView }) => {
  const handleAnimalTypeClick = (type) => {
    setAnimalType(type);
    setView('catalog');
  };

  return (
    <header>
      
      <nav>
        <button onClick={() => setView('about')}>About Us</button>
        <button onClick={() => setView('contact')}>Contact Us</button>
        <div className="dropdown">
          <button className="dropbtn">Animal Category</button>
          <div className="dropdown-content">
            <button onClick={() => handleAnimalTypeClick('cats')}>Cats</button>
            <button onClick={() => handleAnimalTypeClick('dogs')}>Dogs</button>
            <button onClick={() => handleAnimalTypeClick('birds')}>Birds</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
