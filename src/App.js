import logo from './logo.svg';
import './App.css';
import GetWeather from './Components/WeatherDisplay'
import React from 'react'


function App() {
  const PORT = process.env.PORT
  console.log('Success🤟🏼,', `listening on port ${PORT}`)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <GetWeather />
    </div>
  );
}

export default App;
