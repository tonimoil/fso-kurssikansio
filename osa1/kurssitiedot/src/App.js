import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  const tuloste = props.parts.parts.map(x => <Part key={x.key} name={x.name} exercises={x.exercises}/>)
  return (
    <div>
        {tuloste}
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Total = (props) => {
  const total = props.total.parts.map(x => x.exercises).reduce((a,b) => a + b)
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        key: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        key: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        key: 3
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course}/>
      <Total total={course} />
    </div>
  )
}

export default App
