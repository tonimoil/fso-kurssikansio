import React, { useEffect, useState } from 'react'
import FilterField from './components/FilterField'
import Notification from './components/Notification'
import Numbers from './components/Numbers'
import AddField from './components/AddField'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterState, setFilterState ] = useState('')
  const [ notificationForm, setNotification ] = useState({
    message : null,
    notificationType : 0
  })

  /* Haetaan data tietokannasta frontendiin */
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  /* Virheviestin näyttämiseen funktio */
  const showMessage = (a, b) => {
    setNotification({
      ...notificationForm,
      message : a,
      notificationType : b
    }
    )
    setTimeout(() => {
      setNotification({
        ...notificationForm,
        message : null,
        notificationType : 0})
    }, 5000)
  }

  /* Add-painikkeen funktio */
  const addNew = (event) => {
    event.preventDefault()

    persons.map(person => person.name).includes(newName)
    ? window.confirm(`${newName}  is already on phonebook, replace the old number with a new?`)
      ? personService /* Päivitetään henkilö */
        .update(persons.find(person => person.name === newName).id, {name : newName, number : newNumber})
        .then(response => {
            setPersons(persons.map(person => person.name !== newName ? person : response.data))
            showMessage(`Changes to ${newName} was made`, 0)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.name !== newName))
          showMessage(`${newName} has already been removed from the server`, 1)
        })
        : showMessage(`No changes was made to ${newName}`, 0)
    : personService /* Lisätään henkilö */
      .create({name : newName, number : newNumber})
      .then(response => {
        setPersons(persons.concat({name : newName, number : newNumber, id : response.data.id}))
        showMessage(`Added ${newName}`, 0)
      })

    setNewName('')
    setNewNumber('')
  }

  /* Delete-painikkeen funktio */
  const removeNumber = (e) => {
    e.preventDefault()
    try {
      const personid = e.target.getAttribute("id")
      const personname = e.target.getAttribute("name")

      if (window.confirm(`Remove ${personname}?`)) {
        setPersons(persons.filter(person => person.id !== parseInt(personid)))
        personService.deleteWithId(personid)
        showMessage(`${personname} was removed`, 0)
      }
      else {
        showMessage(`No changes were made`, 0)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  const filteredList = persons.filter(person => person.name.toLowerCase().includes(filterState))

  return (
    <div>
      <Notification message={notificationForm.message} notificationType={notificationForm.notificationType}/>
      <FilterField filterState={filterState} setFilterState={setFilterState} />
      <AddField addNew={addNew} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <Numbers filteredList={filteredList} deleteFunction={removeNumber}/>
    </div>
  )

}

export default App
