import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === "") {
      return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)).sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()
  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(notify(`You voted for '${anecdotes.find(anecdote => anecdote.id === anecdote.id).content}'`, 5))
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnnecdoteList