import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherDado from './components/WeatherDado/WeatherDado.jsx'


function App() {
  const [dado, setDado] = useState(null);
  const [weather, setWeather] = useState([]);
  const [weatherSpecific, setWeatherSpecific] = useState(null);
  const inputCity = useRef();
  const inputLatitude = useRef();
  const inputLongitude = useRef();


  async function apiDataCity() {
    const city = inputCity.current.value;
    const firstUrl = `https://www.meteoblue.com/en/server/search/query3?query=${city}&apikey=n8dU3vSGkyNxma2L&itemsPerPage=1`;
    try {
      const dataCity = await axios.get(firstUrl);
      const { lat, lon } = dataCity.data.results[0]; // Extrai lat e lon aqui
      setWeather(dataCity.data.results[0]);
      console.log(firstUrl)
      const Url1 = `https://my.meteoblue.com/packages/basic-day?apikey=n8dU3vSGkyNxma2L&lat=${lat}&lon=${lon}&asl=595&format=json&forecast_days=1`;


      const dataSpecific = await axios.get(Url1);
      setWeatherSpecific(dataSpecific.data); // Armazena dataSpecific.data  
      setDado(true)
    } catch (error) {
      console.error("Erro ao buscar dados da cidade:", error);
    }
  }

  async function apiDataLocation() {
    const lat = inputLatitude.current.value;
    const lon = inputLongitude.current.value;
    const secondUrl = `https://www.meteoblue.com/en/server/search/query3?query=${lat}%20${lon}&apikey=n8dU3vSGkyNxma2L&itemsPerPage=1`;

    try {
      const dataLocation = await axios.get(secondUrl);
      const { lat, lon } = dataLocation.data.results[0]; // Extrai lat e lon aqui
      setWeather(dataLocation.data.results[0]);

      const Ur2 = `https://my.meteoblue.com/packages/basic-day?apikey=n8dU3vSGkyNxma2L&lat=${lat}&lon=${lon}&asl=595&format=json&forecast_days=1`;

      const dataSpecific = await axios.get(Ur2);
      setWeatherSpecific(dataSpecific.data); // Armazena dataSpecific.data
      setDado(true)
    } catch (error) {
      console.error("Erro ao buscar dados da localização:", error);
    }
  }

  // Função para validar enter no input
  function enterInInputCity(event) {
    if (event.key === 'Enter') {
      apiDataCity()
    }
  }

  // Função para validar enter no input
  function enterInInputLocation(event) {
    if (event.key === 'Enter') {
      apiDataLocation()
    }
  }


  return (


    <div className='container' id='container'>
      <div>
        <div>
          <h1>Seu Guia Para o Tempo</h1>
        </div>
        
        <input ref={inputCity} onKeyDown={(event) => enterInInputCity(event)} className='inputCity' type="text" placeholder='Nome da Ciadade'/>
        <button className='buttonCity' onClick={apiDataCity}>Buscar</button>
      </div>

      <div>
        <input ref={inputLatitude} onKeyDown={(event) => enterInInputLocation(event)} className="inputLatitude" type="text" placeholder='Latitude' />
        <input ref={inputLongitude} onKeyDown={(event) => enterInInputLocation(event)} className="inputLongitude" type="text" placeholder='Longitude' />
        <button onClick={apiDataLocation} className="btLocation">Buscar</button>
      </div>


      {dado &&  <WeatherDado weather={weather} weatherSpecific={weatherSpecific}/>}

    </div>
  )
}

export default App
