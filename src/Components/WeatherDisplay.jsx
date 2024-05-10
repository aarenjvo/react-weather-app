import React, { useState, useEffect } from 'react'
import './WeatherApp.css'
import './Assets/Images/sunny_cloud_icon.png'
import './Assets/Images/cloud_snow_icon.png'
import './Assets/Images/dark_snow_icon.png'
import './Assets/Images/cloudy_snow_icon.png'
import './Assets/Images/sunny_icon.png'
import './Assets/Images/sunny_rain_icon.png'
import './Assets/Images/sunny_windy_icon.png'
import './Assets/Images/thunder_icon.png'
import './Assets/Images/moon_icon.png'

function GetWeather() {
    // Create state to store weather data
    const [weatherData, setWeatherData] = useState(null)
    const [location, setLocation] = useState('')
    const [error, setError] = useState(null)
    // Create a state to track whether data is being fetched or not
    const [isFetching, setIsFetching] = useState(false)


    useEffect(() => {

        async function fetchWeatherData() {
            
            // API request options
            const options = { method: 'GET', headers: { accept: 'application/json' } }

            // Fetch weather data
            const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
            const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`

            try {
                const response = await fetch(url, options)
                const data = await response.json()
                setWeatherData(data)
                console.log(data)
            } catch (err) {
                setError(err)
                console.log(err)
            } finally {
                setIsFetching(false)
            }
        }

        // Fetch weather data only if location is not empty
        if (location.trim() !== '' && isFetching) {
            fetchWeatherData()
        } else {
            setWeatherData(null)
        }
    }, [location, isFetching])

    const handleFetchWeather = () => {
        setIsFetching(true)
    }

    return (
        <main>
            <div className='container'>
                <h2>Weather Data:</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        value={location}
                        type='text'
                        placeholder='Enter a location'
                        onChange={(event) => setLocation(event.target.value)} />
                    <button type='button' onClick={handleFetchWeather} disabled={!location.trim()}>
                        {isFetching ? 'Fetching...' : 'Get Weather'}
                    </button>
                </form>
                {weatherData && (
                    <div>
                    <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                    </div>
                )}
                {error && <p>Error fetching dataL {error.message}</p>}
            </div>
        </main>
    )

}

export default GetWeather