import { useEffect, useState } from "react";

const BASE_URL = 'https://the-trivia-api.com/v2/questions?limit=1';

const Trivia = () => {

  const [data, setData] = useState(null);

  const [options, setOptions] = useState(null);

  const [correctOption, setCorrectOption] = useState(null);

  const [category, setCategory] = useState(localStorage.getItem('trivia-category') || 'all');

  const [selectedOption, setSelectedOption] = useState(null);

  const [displayText, setDisplayText] = useState(null);

  const [displayColor, setDisplayColor] = useState(null);

  const [over, setOver] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    localStorage.setItem('trivia-category', category);
  }, [category]);
  
  async function fetchData() {
    try {
      setIsLoading(true);
      const fetchURL = category === 'all' ? BASE_URL : `${BASE_URL}&categories=${category}`;
      let response = await fetch(fetchURL);
      if (!response.ok) throw new Error('Failed to fetch data!');
      let result = await response.json();
      setData(result[0]);
      const arr = [...result[0].incorrectAnswers, result[0].correctAnswer];
      shuffle(arr);
      setOptions(arr);
      setCorrectOption(result[0].correctAnswer);
    }
    catch(err) {
      setError(err.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handleSelect(optionNumber) {
    if (over) return;
    setSelectedOption(optionNumber);
  }

  function handleViewAnswer() {
    if (over) return;
    setDisplayText(`The answer is ${correctOption}`);
    setDisplayColor('green');
    setOver(true);
  }

  function handleCheck() {
    if (over) return;
    if (selectedOption === null) {
      setDisplayText('Choose at least one option');
      setDisplayColor('indianred');
    }
    else if (options[selectedOption] === correctOption) {
      setDisplayText('Correct');
      setDisplayColor('green');
      setOver(true);
    }
    else {
      setDisplayText(`Incorrect, the answer is ${correctOption}`);
      setDisplayColor('indianred');
      setOver(true);
    }
  }

  function handleNewQuestion() {
    fetchData();
    setDisplayText(null);
    setDisplayColor(null);
    setSelectedOption(null);
    setOver(false);
  }

  return (
    <main className="Trivia">
      {
        error ?
        <p style={{fontSize: '2rem', color: 'indianred'}}>{error}</p> :
        isLoading ?
        <p style={{fontSize: '2rem', color: '#00ADB5'}}>Loading...</p> :
        <form className='container' onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="trivia-category">Choose category:</label>
          <select name="trivia-category" id="trivia-category" value={category} onChange={handleCategoryChange}>
            <option value="all">All</option>
            <option value="music">Music</option>
            <option value="sports_and_leisure">Sports</option>
            <option value="film_and_tv">Film</option>
            <option value="arts_and_literature">Art / Literature</option>
            <option value="history">History</option>
            <option value="society_and_culture">Society / Culture</option>
            <option value="science">Science</option>
            <option value="geography">Geography</option>
            <option value="food_and_drink">Food & Drinks</option>
            <option value="general_knowledge">General Knowledge</option>
          </select>
          <p>{data.question.text}</p>
          <div className="options">
            <div className="option">
              <input type="radio" name="options" id="1" onChange={() => handleSelect(0)} checked={selectedOption === 0} />
              <label htmlFor="1">{options[0]}</label>
            </div>
            <div className="option">
              <input type="radio" name="options" id="2" onChange={() => handleSelect(1)} checked={selectedOption === 1} />
              <label htmlFor="2">{options[1]}</label>
            </div>
            <div className="option">
              <input type="radio" name="options" id="3" onChange={() => handleSelect(2)} checked={selectedOption === 2} />
              <label htmlFor="3">{options[2]}</label>
            </div>
            <div className="option">
              <input type="radio" name="options" id="4" onChange={() => handleSelect(3)} checked={selectedOption === 3} />
              <label htmlFor="4">{options[3]}</label>
            </div>
          </div>
          <div className="button-group">
            <button onClick={handleViewAnswer}>View answer</button>
            <button onClick={handleCheck}>Submit</button>
            <button onClick={handleNewQuestion}>New question</button>
          </div>
          {
            displayText &&
            <div className="display" style={{backgroundColor: displayColor}}>{displayText}</div>
          }
        </form>
      }
    </main>
  );
};

export default Trivia;