import React from 'react'

const Country = (props) => {
    const showCountry = () => {
        props.setSearchState(props.country.name.toLowerCase())
    }

    return (
        <div>
            {props.country.name} <button onClick={showCountry}>show</button>
        </div>
  )
}

export default Country