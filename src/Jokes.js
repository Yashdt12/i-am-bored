import { useEffect, useState } from "react";

const JOKES_URL = 'https://official-joke-api.appspot.com/jokes/random';

const Jokes = () => {

  const [joke, setJoke] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  async function fetchJoke() {
    try {
      setIsLoading(true);
      const response = await fetch(JOKES_URL);
      const data = await response.json();
      setJoke({setup: data.setup, punchline: data.punchline});
    } catch(err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchJoke();
  }, [JOKES_URL])

  return (
    <main className='Jokes'>
      {
        error ?
        <p style={{fontSize: '2rem', color: 'indianred'}}>{error}</p> :
        isLoading ?
        <p style={{fontSize: '2rem', color: '#00ADB5'}}>Loading...</p> :
        <div className='container'>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
          <button onClick={fetchJoke}>Another one</button>
        </div>
      }
    </main>
  );
};

export default Jokes;