import React, { useState } from 'react'

const getRandom = (max) => {
  return Math.floor(Math.random() * max)
}
//testi

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [maxIndex, setMax] = useState(0)

  const handleClick = () => {
    const anecdote = getRandom(anecdotes.length)
    setSelected(anecdote)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
    const max = (element) => element === Math.max(...copy)
    setMax(copy.findIndex(max))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleClick}>Anekdootti</button>
      <button onClick={vote}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
      has {votes[maxIndex]} votes.
    </div>
  )
}

export default App