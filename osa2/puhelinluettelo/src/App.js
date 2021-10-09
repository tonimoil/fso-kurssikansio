import React, { useEffect, useState } from 'react'
import FilterField from './components/FilterField'
import Numbers from './components/Numbers'
import AddField from './components/AddField'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterState, setFilterState ] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  })

  const addNew = (event) => {
    event.preventDefault()

    persons.map(person => person.name).includes(newName)
     ? window.alert(`${newName} is already added to phonebook`)
     : setPersons(persons.concat({
        name : newName,
        number : newNumber,
      }),
      personService
        .create({name : newName, number:newNumber})
      )
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
