import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useNotificationDispatch } from './components/NotificationContext'
import { useState } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updateAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
      // const anecdotes = queryClient.getQueryData(['anecdotes'])
      // queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const notificationDispatch = useNotificationDispatch()
  const [timeoutId, setTimeoutId] = useState(null)

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    notificationDispatch({ type: 'SET', payload: `you voted '${anecdote.content}'` })
    const newTimeoutId = setTimeout(() => {
      notificationDispatch({ type: 'REMOVE' })
    }, 5000)
    setTimeoutId(newTimeoutId)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes()
  })

  // console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
