import './App.css';
import GraphiQL from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import 'graphiql/graphiql.css';
import { useState, useEffect } from 'react';

function App() {
  const fetcher = createGraphiQLFetcher({
    url: 'http://localhost:8085/query',
  });

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
    <div className="container">
      <div className="nav-bar">
        { 
          heroes.map((hero, index) => (
            <button
              onClick={() => {handleButton(index)}}
              className = {activeButton === index ? "button-active" : "button-deactive" }>
              {hero.name}
            </button>
          ))
        }
      </div>
      <div className="graphiql">
        <GraphiQL fetcher={fetcher} />
      </div>
    </div>
  )
}

export default App;