import React from 'react'

const Numbers = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
            {props.filteredList.map (person => <li key={person.id}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )
}
export default Numbers