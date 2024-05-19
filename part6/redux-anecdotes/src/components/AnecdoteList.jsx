import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setMessage, removeMessage } from "../reducers/messageReducer"
import { useState } from "react"

const AnnecdoteList = () => {
  const [timeOutId, setTimeOutId] = useState(null)
  const anecdotes = useSelector(state => {
    if (state.filter === "") {
      return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)).sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()
  const handleVote = (id) => {
    dispatch(vote(id))
    dispatch(setMessage(`You voted for '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
    if (timeOutId) {
      clearTimeout(timeOutId)
    }
    const newTimeOutId = setTimeout(() => {
      dispatch(removeMessage())
      setTimeOutId(null)
    }, 5000)
    setTimeOutId(newTimeOutId)
  }
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnnecdoteList