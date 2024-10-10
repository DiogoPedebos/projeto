import './WeatherDado.css'

function WeatherDado(props) {

    console.log(props.weather)
    console.log(props.weatherSpecific)
    
    return (
        <div>
            <h1>Cidade {props.weather.name}</h1>
            <p>Data: {props.weatherSpecific.metadata.modelrun_updatetime_utc}</p>
            <p>Temp Max{props.weatherSpecific.data_day.temperature_max}</p>
            <p>Temp Min{props.weatherSpecific.data_day.temperature_min}</p>
            <p>Situação tempo{props.weatherSpecific.data_day.pictocode}</p>
            <p>Velocidade vento{props.weatherSpecific.data_day.windspeed_mean}</p>
            <p>Direção Vento{props.weatherSpecific.data_day.winddirection}</p>
            <p>Probabilidade Chuva{props.weatherSpecific.data_day.precipitation_probability}</p>
        </div>
    )
}

export default WeatherDado




