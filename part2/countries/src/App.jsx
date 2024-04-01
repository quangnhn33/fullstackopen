import { useEffect, useState } from "react"
import axios from "axios"
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [shownCountries, setShownCountries] = useState([]);

  const toggleCountry = (countryName) => {
    setShownCountries(shownCountries.includes(countryName)
      ? shownCountries.filter(name => name !== countryName)
      : [...shownCountries, countryName]);
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      console.log(response.data)
      setCountries(response.data);
    })
  }, [])

  const handleSearchOnChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredCountries = search === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div>find countries <input type="text" value={search} onChange={handleSearchOnChange} /></div>
      {filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> :
        filteredCountries.length === 1 ? <Country country={filteredCountries[0]} /> :
          filteredCountries.map(country =>
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => toggleCountry(country.name.common)}>
                {shownCountries.includes(country.name.common) ? 'Hide' : 'Show'}
              </button>
              {shownCountries.includes(country.name.common) && <Country country={country} />}
            </div>
          )
      }
    </div>
  )
}

export default App

