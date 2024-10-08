import './WeatherDado.css';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function WeatherDado(props) {

    // Função para obter a descrição e a imagem correspondente ao código meteorológico
    function obterValorPtPT(code) {
        var periodo = verificarPeriodo(props.weatherSpecific.metadata.modelrun_updatetime_utc);
        
        // Objeto que mapeia os códigos meteorológicos às descrições e imagens correspondentes
        const codigos = {
            1: {
                descricao: "Limpo, sem nuvens",
                imagem: periodo === 'dia' ? "/01_iday.png" : "/01_inight.png"
            },
            2: {
                descricao: "Limpo e algumas nuvens",
                imagem: periodo === 'dia' ? "/02_iday.png" : "/02_inight.png"
            },
            3: {
                descricao: "Parcialmente enevoado",
                imagem: periodo === 'dia' ? "/03_iday.png" : "/03_inight.png"
            },
            4: {
                descricao: "Nublado",
                imagem: periodo === 'dia' ? "/04_iday.png" : "/04_inight.png"
            },
            5: {
                descricao: "Nevoeiro",
                imagem: periodo === 'dia' ? "/05_iday.png" : "/05_inight.png"
            },
            6: {
                descricao: "Nublado com chuva",
                imagem: periodo === 'dia' ? "/06_iday.png" : "/06_inight.png"
            },
            7: {
                descricao: "Misto com aguaceiros",
                imagem: periodo === 'dia' ? "/07_iday.png" : "/07_inight.png"
            },
            8: {
                descricao: "Aguaceiros, possíveis trovoadas",
                imagem: periodo === 'dia' ? "/08_iday.png" : "/08_inight.png"
            },
            9: {
                descricao: "Nublado com neve",
                imagem: periodo === 'dia' ? "/09_iday.png" : "/09_inight.png"
            },
            10: {
                descricao: "Variável com aguaceiros de neve",
                imagem: periodo === 'dia' ? "/10_iday.png" : "/10_inight.png"
            },
            11: {
                descricao: "Muito nublado com misto de neve e chuva",
                imagem: periodo === 'dia' ? "/11_iday.png" : "/11_inight.png"
            },
            12: {
                descricao: "Nublado com chuva ligeira",
                imagem: periodo === 'dia' ? "/12_iday.png" : "/12_inight.png"
            },
            13: {
                descricao: "Nublado com neve ligeira",
                imagem: periodo === 'dia' ? "/13_iday.png" : "/13_inight.png"
            },
            14: {
                descricao: "Muito nublado com chuva",
                imagem: periodo === 'dia' ? "/14_iday.png" : "/14_inight.png"
            },
            15: {
                descricao: "Muito nublado com neve",
                imagem: periodo === 'dia' ? "/15_iday.png" : "/15_inight.png"
            },
            16: {
                descricao: "Muito nublado com chuva ligeira",
                imagem: periodo === 'dia' ? "/16_iday.png" : "/16_inight.png"
            },
            17: {
                descricao: "Muito nublado com neve ligeira",
                imagem: periodo === 'dia' ? "/17_iday.png" : "/17_inight.png"
            }
        };

        return codigos[code];
    }

    // Função para obter a direção cardeal com base no ângulo em graus
    function obterDirecaoCardeal(graus) {
        graus = (graus % 360 + 360) % 360;

        const direcoes = {
            "N": [348.75, 11.25],
            "NNE": [11.25, 33.75],
            "NE": [33.75, 56.25],
            "ENE": [56.25, 78.75],
            "E": [78.75, 101.25],
            "ESE": [101.25, 123.75],
            "SE": [123.75, 146.25],
            "SSE": [146.25, 168.75],
            "S": [168.75, 191.25],
            "SSW": [191.25, 213.75],
            "SW": [213.75, 236.25],
            "WSW": [236.25, 258.75],
            "W": [258.75, 281.25],
            "WNW": [281.25, 303.75],
            "NW": [303.75, 326.25],
            "NNW": [326.25, 348.75],
        };

        for (let direcao in direcoes) {
            const [inicio, fim] = direcoes[direcao];
            if (graus >= inicio && graus < fim || (direcao === "N" && (graus >= inicio || graus < fim))) {
                return direcao;
            }
        }

        return undefined; 
    }

    // Função para verificar o período do dia (dia ou noite)
    function verificarPeriodo(dataHora) {
        const hora = dataHora.slice(11, 16);
        const [horas, minutos] = hora.split(':').map(Number);
        const totalMinutos = horas * 60 + minutos;

        if (totalMinutos >= 6 * 60 && totalMinutos <= 18 * 60) {
            return "dia";
        } else {
            return "noite";
        }
    }

    // Obtém a descrição e a imagem do tempo atual
    const result = obterValorPtPT(props.weatherSpecific.data_day.pictocode);

    return (
        <div className='weather-container'>
            <h2>{props.weather.name}</h2>

            <div className='weather-info'>
                <img src={result.imagem} alt={result.descricao} /> 
                <p className='temperature'>{Math.round(props.weatherSpecific.data_day.temperature_instant)}ºC</p>
            </div>

            <p className='description'>{result.descricao}</p>
            
            <div>
                <p>Direção do Vento: {obterDirecaoCardeal(props.weatherSpecific.data_day.winddirection)}º</p>
                <p>Velocidade do Vento: {Math.round(props.weatherSpecific.data_day.windspeed_mean)} km/h</p>
                <p>Probabilidade de Chuva: {Math.round(props.weatherSpecific.data_day.precipitation_probability)}%</p>
            </div>
            
            <div className='details'>
                <p>Temp Max: {Math.round(props.weatherSpecific.data_day.temperature_max)}</p>
                <p>Temp Min: {Math.round(props.weatherSpecific.data_day.temperature_min)}</p>
            </div>
            
            <div>
                <p className='day'>{format(new Date(props.weatherSpecific.metadata.modelrun_updatetime_utc), 'EEEE', { locale: ptBR })}</p> 
            </div>

        </div>
    );
}

export default WeatherDado;
