import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(response => {
                setWeather(response.data);
            });
    }, []);


    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} width="100" />
            <h2>Weather in {country.capital[0]}</h2>
            {weather && (
                <div>
                    <div><b>temperature:</b> {(weather.current.temp - 273.15).toFixed(2)} Celsius</div>
                    <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`} alt={weather.current.weather[0].description} />
                    <div><b>wind:</b> {weather.current.wind_speed} m/s</div>
                </div>
            )}
        </div>
    )
}

export default Country