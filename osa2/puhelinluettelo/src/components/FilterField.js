import React from 'react'

const FilterField = (props) => {
    const handleFilterStateChange = (event) => {
        props.setFilterState(event.target.value)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with: <input 
            value={props.filterState}
            onChange={handleFilterStateChange}/>
        </div>
  )
}

export default FilterField