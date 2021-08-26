import React from 'react'

const Course = (props) => {
    const courses = props.courses
    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => <div key={course.id}> <Header name={course.name}/> <Content parts={course.parts}/> <Total course={course}/> </div>)}
      </div>
    )
  }
  
  const Header = (props) => {
    return <h3>{props.name}</h3>
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part}/>)}
      </div>
    )
  }
  
  const Part = (props) => {
    const {name, exercises} = props.part  
    return (
      <>
        <p>{name} {exercises}</p>
      </>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce((s,p) => s + p.exercises, 0)
    return (
      <div>
        <h4>total of {total} exercises</h4>
      </div>
    )
  }

  export default Course