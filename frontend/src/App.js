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
    <div className='App'>
      <div className='center'>
        {
          heroes.map((hero, _) => (
            <button class="buttons" onClick="">{hero.name}</button>
            
          ))
        }
      </div>
      <div>
        <GraphiQL fetcher={fetcher} />
      </div>
    </div>
  )
}

export default App;