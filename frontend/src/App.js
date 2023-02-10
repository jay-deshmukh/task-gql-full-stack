import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [heroes, setHeroes] = useState([])
  const [activeButton, setActiveButton] = useState(0);

  const handleButton = (index) => {
    setActiveButton(index)
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8085/query', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            heroes
            {
              name
            }
          }`
        })
      });

      const json = await response.json();
      
      setHeroes(json.data.heroes);
    }

    fetchData()
    .catch(console.error);
  }, [])

  return (
    <div className="container nav-bar">
      { 
      
      heroes.map((hero, index) => (
            <button
              name="heroButton"
              key={hero.name}
              onClick={() => {handleButton(index)}}
              className = {activeButton === index ? "button-active" : "button-deactive" }>
              {hero.name}
            </button>
        ))
      }
    </div>
  )
}

export default App;