import { createAnecdote } from "../services/requests"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "./NotificationContext"
import { useState } from "react"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const [timeoutId, setTimeoutId] = useState(null)
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
      // const anecdotes = queryClient.getQueryData(['anecdotes'])
      // queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      if (timeoutId) {
        clearTimeout(timeoutId)
        setTimeoutId(null)
      }
      dispatch({ type: 'SET', payload: `you created '${newAnecdote.content}'` })
      const newTimeoutId = setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
      setTimeoutId(newTimeoutId)
    },
    onError: (error) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        setTimeoutId(null)
      }
      dispatch({ type: 'SET', payload: `too short anecdote, must have length 5 or more'` })
      const newTimeoutId = setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
      setTimeoutId(newTimeoutId)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
