import { useEffect, useState } from "react";

const URL = 'https://the-trivia-api.com/v2/questions?limit=1';

const Trivia = () => {

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [URL]);

  async function fetchData() {
    try {
      setIsLoading(true);
      let response = await fetch(URL);
      if (!response.ok) throw new Error('Failed to fetch data!');
      let result = await response.json();
      setData(result[0]);
    }
    catch(err) {
      setError(err.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="Trivia">
      {
        error ?
        <p style={{fontSize: '2rem', color: 'indianred'}}>{error}</p> :
        isLoading ?
        <p style={{fontSize: '2rem', color: '#00ADB5'}}>Loading...</p> :
        <form className='container' onSubmit={(e) => e.preventDefault()}>
          <p>{data.question.text}</p>
          <div className="options">
            <div className="option">
              <input type="radio" name="options" id="1" />
              <label htmlFor="1">One</label>
            </div>
            <div className="option">
              <input type="radio" name="options" id="2" />
              <label htmlFor="2">Two</label>
            </div>
            <div className="option">
              <input type="radio" name="options" id="3" />
              <label htmlFor="3">Three</label>
            </div>
            <div className="option">
              <input type="radio" name="options" id="4" />
              <label htmlFor="4">Four</label>
            </div>
          </div>
          <div className="button-group">
            <button>View answer</button>
            <button>Submit</button>
            <button onClick={fetchData}>New question</button>
          </div>
          <div className="display">Display</div>
        </form>
      }
    </main>
  );
};

export default Trivia;