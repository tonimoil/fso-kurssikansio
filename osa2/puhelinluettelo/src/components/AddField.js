import React from 'react'

const AddField = (props) => {
    const handleNameChange = (event) => {
        props.setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      props.setNewNumber(event.target.value)
    }
    return (
    <div>
        <h2>Add a new person</h2>
        <form onSubmit={props.addNew}>
            <div>
                name: <input 
                value={props.newName}
                onChange={handleNameChange}/>
            </div>
            <div>
                number: <input 
                value={props.newNumber}
                onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </div>
  )
}

export default AddField