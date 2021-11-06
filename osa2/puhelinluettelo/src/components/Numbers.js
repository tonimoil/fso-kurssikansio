import React from 'react'

const Numbers = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
            {props.filteredList.map (person => <li key={person.name}>{person.name} {person.number}<button id={person.id} name={person.name} onClick={(e) => props.deleteFunction(e)}>delete</button></li>)}
            </ul>
        </div>
    )
}
export default Numbers
