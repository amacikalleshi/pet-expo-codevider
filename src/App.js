import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const App = () => {
  const [animals, setAnimals] = useState([]);
  const [type, setType] = useState('cats');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    fetchAnimals();
  }, [type]);

  const fetchAnimals = async () => {
    let url = '';
    switch (type) {
      case 'dogs':
        url = 'https://freetestapi.com/api/v1/dogs';
        break;
      case 'cats':
        url = 'https://freetestapi.com/api/v1/cats';
        break;
      case 'birds':
        url = 'https://freetestapi.com/api/v1/birds';
        break;
      default:
        return;
    }
    const response = await fetch(url);
    const data = await response.json();
    setAnimals(data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div>
        <header>
          <h1>Pet Expo</h1>
          <nav>
            <Link to="/">Animal Catalog</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <div className="dropdown">
              <button className="dropbtn">Animal Catalog</button>
              <div className="dropdown-content">
                <button onClick={() => setType('cats')}>Cats</button>
                <button onClick={() => setType('dogs')}>Dogs</button>
                <button onClick={() => setType('birds')}>Birds</button>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="welcome-banner">Welcome to Our Pet Expo</div>
                {type !== 'about' && type !== 'contact' && (
                  <input
                    type="text"
                    placeholder="Search for an animal..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                )}
                {type !== 'about' && type !== 'contact' && (
                  <>
                    <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                    <section>
                      <div className="animal-gallery">
                        {filteredAnimals.map(animal => (
                          <div key={animal.id} className="animal-card" onClick={() => setSelectedAnimal(animal)}>
                            <img src={animal.image} alt={animal.name} />
                            <h3>{animal.name}</h3>
                            <p>{type === 'birds' ? animal.place_of_found : animal.origin}</p>
                          </div>
                        ))}
                      </div>
                      {selectedAnimal && (
                        <div className="animal-popup">
                          <h2>{selectedAnimal.name}</h2>
                          <img src={selectedAnimal.image} alt={selectedAnimal.name} />
                          {type === 'birds' ? (
                            <>
                              <p>Species: {selectedAnimal.species}</p>
                              <p>Family: {selectedAnimal.family}</p>
                              <p>Habitat: {selectedAnimal.habitat}</p>
                              <p>Place of Found: {selectedAnimal.place_of_found}</p>
                              <p>Diet: {selectedAnimal.diet}</p>
                              <p>Description: {selectedAnimal.description}</p>
                              <p>Weight (kg): {selectedAnimal.weight_kg}</p>
                              <p>Height (cm): {selectedAnimal.height_cm}</p>
                            </>
                          ) : type === 'dogs' ? (
                            <>
                              <p>Breed Group: {selectedAnimal.breed_group}</p>
                              <p>Size: {selectedAnimal.size}</p>
                              <p>Lifespan: {selectedAnimal.lifespan}</p>
                              <p>Origin: {selectedAnimal.origin}</p>
                              <p>Temperament: {selectedAnimal.temperament}</p>
                              <p>Colors: {selectedAnimal.colors.join(', ')}</p>
                              <p>Description: {selectedAnimal.description}</p>
                            </>
                          ) : (
                            <>
                              <p>Origin: {selectedAnimal.origin}</p>
                              <p>Temperament: {selectedAnimal.temperament}</p>
                              <p>Colors: {selectedAnimal.colors.join(', ')}</p>
                              <p>Description: {selectedAnimal.description}</p>
                            </>
                          )}
                          <button onClick={() => setSelectedAnimal(null)}>Close</button>
                        </div>
                      )}
                    </section>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/about"
            element={
              <section className="about">
                <h2>About Us</h2>
                <p>Welcome to Pet Expo! We are dedicated to bringing together pet lovers from all over the world. Our expo features a wide variety of animals, including cats, dogs, and birds. Each year, we host events, workshops, and exhibitions to educate and entertain our visitors. Join us to explore the amazing world of pets and meet fellow enthusiasts.</p>
                <img src="https://via.placeholder.com/800x400.png?text=Pet+Expo+Event" alt="Pet Expo Event" />
                <p>Our mission is to promote responsible pet ownership, support animal welfare, and provide a platform for pet enthusiasts to connect and share their experiences. We believe that pets bring joy and companionship to our lives, and we are committed to celebrating this special bond.</p>
                <img src="https://via.placeholder.com/800x400.png?text=Pet+Lovers" alt="Pet Lovers" />
                <p>Join us at our next event and become part of the Pet Expo community. Whether you are a seasoned pet owner or looking to learn more about pets, we have something for everyone. From educational seminars to fun activities, Pet Expo is the perfect place to discover, learn, and enjoy.</p>
              </section>
            }
          />
          <Route
            path="/contact"
            element={
              <section className="contact">
                <h2>Contact Us</h2>
                <p>We'd love to hear from you! If you have any questions, suggestions, or inquiries, please reach out to us using the following contact information:</p>
                <p>Email: info@petexpo.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Address: 123 Pet Expo Avenue, Animal City, AC 12345</p>
                <form>
                  <input type="text" placeholder="Your Name" id="name" required />
                  <input type="email" placeholder="Your Email" required />
                  <textarea placeholder="Your Message" rows="4" required></textarea>
                  <button type="submit">Send Message</button>
                </form>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434693288!2d-122.41941608468102!3d37.77492977975907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c2c6b1d5%3A0x1162ac6b1d5c0!2s123%20Pet%20Expo%20Avenue%2C%20San%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1624304879538!5m2!1sen!2sus"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </section>
            }
          />
        </Routes>
        <footer>
          <p>Contact us: info@petexpo.com | +123 456 7890</p>
          <p>&copy; 2024 Pet Expo. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
