import React from 'react'

const SearchBox = (props) => {
    const handleSearchState = (event) => {
        props.setSearchState(event.target.value)
    }

    return (
        <div>
            find countries: <input 
            value={props.searchState}
            onChange={handleSearchState}/>
        </div>
  )
}

export default SearchBox