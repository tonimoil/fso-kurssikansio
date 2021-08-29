import React, { useEffect, useState } from 'react'
import FilterField from './components/FilterField'
import Numbers from './components/Numbers'
import AddField from './components/AddField'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterState, setFilterState ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const addNew = (event) => {
    event.preventDefault()

    persons.map(person => person.name).includes(newName)
     ? window.alert(`${newName} is already added to phonebook`)
     : setPersons(persons.concat({
        name : newName,
        id : persons.length + 1,
        number : newNumber,
      }))
      setNewName('')
      setNewNumber('')
  } 

  const filteredList = persons.filter(person => person.name.toLowerCase().includes(filterState))

  return (
    <div>
      <FilterField filterState={filterState} setFilterState={setFilterState} />
      <AddField addNew={addNew} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <Numbers filteredList={filteredList}/>
    </div>
  )

}

export default App
