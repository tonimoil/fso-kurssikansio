import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBox from './components/SearchBox'
import CountryList from './components/CountryList'

function App() {
  const [ data, setData ] = useState([])
  const [ finland, setFinland ] = useState('')
  const [ searchState, setSearchState ] = useState('')

  const api_key = process.env.REACT_APP_API_KEY
  const filteredList = data.filter(country => country.name.toLowerCase().includes(searchState))

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=Finland`)
      .then(response => {
        setFinland(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })
    }, [])

  return (
    <div>
      <SearchBox searchState={searchState} setSearchState={setSearchState}/>
      <CountryList filteredList={filteredList} setSearchState={setSearchState} finland={finland}/>
    </div>
  );
}

export default App;
