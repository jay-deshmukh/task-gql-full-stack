import 'graphiql/graphiql.css';
import React from 'react'
import GraphiQL from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

function Graphi() {

  const fetcher = createGraphiQLFetcher({
    url: 'http://localhost:8085/query',
  });

  return (
    <div className="graphiql">
        <GraphiQL fetcher={fetcher} />
    </div>
  )
}

export default Graphi;