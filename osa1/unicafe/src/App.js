import React, { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={() => props.f(props.v + 1)}>{props.name}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <tr><td>{props.text}</td><td> {props.value}</td></tr>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  const all = good + neutral + bad
  const average = (good - bad)/all || 0
  const positive = (good / (all)) * 100 || 0

  if (all === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <tr><td>all </td><td> {all}</td></tr>
          <tr><td>average </td><td> {average.toFixed(1)}</td></tr>
          <tr><td>positive </td><td> {positive.toFixed(1)} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name='good' v={good} f={setGood}/>
      <Button name='neutral' v={neutral} f={setNeutral}/>
      <Button name='bad' v={bad} f={setBad}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App