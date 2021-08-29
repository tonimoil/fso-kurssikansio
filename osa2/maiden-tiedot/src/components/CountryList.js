import Country from "./Country"
import React from 'react'

const CountryList = (props) => {
    const filteredList = props.filteredList

    return (
        <div>
            {filteredList.length > 10 
            ? <p>Too many search options!</p>
            : filteredList.length === 1 ?
            <div>
                <h1>{filteredList[0].name}</h1>
                  <div>capital {filteredList[0].capital}</div>
                  <p>population {filteredList[0].population}</p>
                <h3>languages</h3>
                  <ul>
                    {filteredList[0].languages.map(x => <li key={x.name}>{x.name}</li>)}
                  </ul>
                <img src={filteredList[0].flag} height='100' width='auto' alt='flag'/>
                {props.finland.location.country === filteredList[0].name
                ? <div>
                    <h2>Weather in Helsinki</h2>
                    <p>temperature: {props.finland.current.temperature}</p>
                    <img src={props.finland.current.weather_icons[0]} height='50' width='auto' alt='flag' padding='5px'/>
                    <p>wind: {props.finland.current.wind_speed} mph direction {props.finland.current.wind_dir}</p>
                </div>
                : <h2>Weather coming soon</h2>}
            </div>
            : filteredList.map(country => <Country key={country.alpha3Code} country={country} setSearchState={props.setSearchState}/>)}
      </div>
  )
}

export default CountryList
