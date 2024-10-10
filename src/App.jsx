import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import WeatherDado from './components/WeatherDado/WeatherDado';
import apiDatabase from './services/apiDatabase';

function App() {
  const [dado, setDado] = useState(null);
  const [weather, setWeather] = useState([]);
  const [weatherSpecific, setWeatherSpecific] = useState(null);
  const inputCity = useRef();
  const inputLatitude = useRef();
  const inputLongitude = useRef();

  // Busca dados meteorológicos por nome da cidade
  async function apiDataCity() {
    const city = inputCity.current.value;
    const firstUrl = `https://www.meteoblue.com/en/server/search/query3?query=${city}&apikey=n8dU3vSGkyNxma2L&itemsPerPage=1`;
    try {
      const dataCity = await axios.get(firstUrl);
      const { lat, lon } = dataCity.data.results[0]; 
      setWeather(dataCity.data.results[0]);
      
      const Url1 = `https://my.meteoblue.com/packages/basic-day?apikey=n8dU3vSGkyNxma2L&lat=${lat}&lon=${lon}&asl=595&format=json&forecast_days=1`;

      const dataSpecific = await axios.get(Url1);
      setWeatherSpecific(dataSpecific.data); 
      createMetadatas(dataSpecific.data);
      setDado(true);
    } catch (error) {
      console.error("Erro ao buscar dados da cidade:", error);
    }
  }

  // Busca dados meteorológicos por latitude e longitude
  async function apiDataLocation() {
    const lat = inputLatitude.current.value;
    const lon = inputLongitude.current.value;
    const secondUrl = `https://www.meteoblue.com/en/server/search/query3?query=${lat}%20${lon}&apikey=n8dU3vSGkyNxma2L&itemsPerPage=1`;

    try {
      const dataLocation = await axios.get(secondUrl);
      const { lat, lon } = dataLocation.data.results[0];
      setWeather(dataLocation.data.results[0]);

      const Ur2 = `https://my.meteoblue.com/packages/basic-day?apikey=n8dU3vSGkyNxma2L&lat=${lat}&lon=${lon}&asl=595&format=json&forecast_days=1`;

      const dataSpecific = await axios.get(Ur2);
      setWeatherSpecific(dataSpecific.data);
      createMetadatas(dataSpecific.data);
      setDado(true);
    } catch (error) {
      console.error("Erro ao buscar dados da localização:", error);
    }
  }

  // Valida a tecla Enter no input da cidade
  function enterInInputCity(event) {
    if (event.key === 'Enter') {
      apiDataCity();
    }
  }

  // Valida a tecla Enter nos inputs de latitude e longitude
  function enterInInputLocation(event) {
    if (event.key === 'Enter') {
      apiDataLocation();
    }
  }

  // Envia dados da API para o banco de dados
  async function createMetadatas(metadata) {
    try {
      const response = await apiDatabase.post('/metadata', metadata);

      if (response.status === 201) {
        console.log('Metadados criados com sucesso!');
      } else {
        console.error('Erro ao criar metadados:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar metadados:', error);
    }
  }

  // Busca todos os metadados do banco de dados
  async function buscaTodosMetadados() {
    try {
      const response = await apiDatabase.get('/metadata');
      console.log(response);
      if (response.status === 200) {
        console.log('Metadados encontrados:', response.data);
        return response.data;
      } else {
        console.error(
          'Erro ao buscar metadados:',
          response.status,
          response.statusText
        );
        throw new Error(
          `Erro ao buscar metadados: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error('Erro ao buscar metadados:', error);
      throw error; 
    }
  }

  return (
    <div className='container' id='container'>
      <div>
        <div>
          <h1>Seu Guia Para o Tempo</h1>
        </div>
        
        <input 
          ref={inputCity} 
          onKeyDown={(event) => enterInInputCity(event)} 
          className='inputCity' 
          type="text" 
          placeholder='Nome da Ciadade'
        />
        <button className='buttonCity' onClick={apiDataCity}>Buscar</button>
      </div>

      <div>
        <input 
          ref={inputLatitude} 
          onKeyDown={(event) => enterInInputLocation(event)} 
          className="inputLatitude" 
          type="text" 
          placeholder='Latitude' 
        />
        <input 
          ref={inputLongitude} 
          onKeyDown={(event) => enterInInputLocation(event)} 
          className="inputLongitude" 
          type="text" 
          placeholder='Longitude' 
        />
        <button onClick={apiDataLocation} className="btLocation">Buscar</button>
      </div>

      {dado && <WeatherDado weather={weather} weatherSpecific={weatherSpecific}/>}

      <button onClick={buscaTodosMetadados} className="btLocation">Buscar dados banco</button>
    </div>
  );
}

export default App;