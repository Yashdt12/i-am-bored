import { useState, useEffect } from 'react';

const CAT_IMAGE_URL = 'https://shibe.online/api/cats';

const CAT_FACT_URL = 'https://meowfacts.herokuapp.com';

const DOG_IMAGE_URL = 'https://dog.ceo/api/breeds/image/random';

const DOG_FACT_URL = 'https://dogapi.dog/api/facts';

const CatsAndDogsFacts = () => {

  const [imageURL, setImageURL] = useState(null);

  const [fact, setFact] = useState(null);

  const [choice, setChoice] = useState(localStorage.getItem('choice') || 'cat');

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [CAT_IMAGE_URL, CAT_FACT_URL, DOG_IMAGE_URL, DOG_FACT_URL, choice]);

  async function fetchData() {
    try {
      setIsLoading(true);
      let response = await fetch(choice === 'cat' ? CAT_IMAGE_URL : DOG_IMAGE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch image data!');
      }
      let result = await response.json();
      setImageURL(choice === 'cat' ? result[0] : result.message);

      response = await fetch(choice === 'cat' ? CAT_FACT_URL : DOG_FACT_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch fact!');
      }
      result = await response.json();
      setFact(choice === 'cat' ? result.data[0] : result.facts[0]);
    }
    catch(err) {
      setError(err.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleToggle = () => {
    const newChoice = choice === 'cat' ? 'dog' : 'cat';
    setChoice(newChoice);
    localStorage.setItem('choice', newChoice);
  };

  return (
    <main className='CatsAndDogsFacts'>
      {
        error ?
        <p style={{fontSize: '2rem', color: 'indianred'}}>{error}</p> :
        isLoading ?
        <p style={{fontSize: '2rem', color: '#00ADB5'}}>Loading...</p> :
        <div className='container'>
          <div className='controls'>
            <button onClick={handleToggle}>Toggle</button>
            <button onClick={fetchData}>New</button>
          </div>
          <p>{fact}</p>
          <img src={imageURL} alt={`Image of a random ${choice}`} />
        </div>
      }
    </main>
  );
};

export default CatsAndDogsFacts;