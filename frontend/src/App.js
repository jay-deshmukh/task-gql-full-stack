import './App.css'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

const endpoint = 'http://localhost:8085/query'
const HEROES_QUERY = `
{ heroes { name ...on Human { hasLightsaber } ...on Droid { primaryFunction } } }
`

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}
function Example() {
  const { data, isLoading, error } = useQuery('heroes', () => {
    return axios({
      url: endpoint,
      method: 'post',
      data: {
        query: HEROES_QUERY
      }
    }).then((result) => result.data.data)
  })

  if (isLoading) return 'Loading...'
  if (error) return <pre>{error.message}</pre>

  return (
    <div className='main'>
      <div className='main-content'>
        <div className='box-wrap'>
          {data.heroes.map((hero) => (
            <div className='box' key={hero.name}>
              {hero.name}
            </div>
          ))}
          <div className='box'>.....</div>
        </div>
        <div className='main-box'>GraphiQL</div>
      </div>
    </div>
  )
}
