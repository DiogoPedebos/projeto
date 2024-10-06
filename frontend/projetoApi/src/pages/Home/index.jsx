import './style.css'
// import Trash from '../../assets/img.ex' importação de imagem de exemplo

function Home() {

  const dados_day = [{
    "id": 1,
        "tempo": "2024-10-06T00:00:00.000Z",
        "temperaturaInstantanea": 18.22,
        "precipitacao": 0,
        "previsibilidade": 76,
        "temperaturaMaxima": 30.38,
        "pressaoMediaNivelDoMar": 1013,
        "velocidadeDoVentoMedia": 1.57,
        "horasDePrecipitacao": 0,
        "pressaoMinimaNivelDoMar": 1011,
        "pictocode": 2,
        "fracaoDeNeve": 0,
        "horasComUmidadeMaior90": 0,
        "precipitacaoConvectiva": 0,
        "umidadeRelativaMaxima": 75,
        "temperaturaMinima": 16.66,
        "direcaoDoVento": 90,
        "temperaturaSensacaoMaxima": 31.84,
        "umidadeRelativaMinima": 40,
        "temperaturaSensacaoMedia": 24.13,
        "velocidadeDoVentoMinima": 0.76,
        "temperaturaSensacaoMinima": 16.26,
        "probabilidadeDePrecipitacao": 9,
        "indiceUv": 7,
        "manchasDeChuva": "0000000000000000000000000000000000000000000000000",
        "temperaturaMedia": 23.32,
        "pressaoMaximaNivelDoMar": 1016,
        "umidadeRelativaMedia": 60,
        "classeDePrevisibilidade": 4,
        "velocidadeDoVentoMaxima": 2.39
  }]

  return (

    <div>
      <div>
        <div>
          <form>
            {/* <button type='button'><img src={Trash}/></button> */}
            <button type='button'>Pesquisar1</button>
            <input name='consCidade' type="text" />
          </form>
        </div>
        <div>
          <form>
            <button type='button'>Pesquisar2</button>
            <input name='lat' type="number" />
            <input name='lon' type="number" />
          </form>
        </div>
      </div>

      {dados_day.map(dado_day => (

        <div kay={dado_day.id}>
          <h1>vDiaSemana {dado_day.tempo}</h1>
          <p>Temperatura Mínima: {dado_day.temperaturaMinima}</p>
          <p>Temperatura Máxima: {dado_day.temperaturaMaxima}</p>
          <p>Atual Clima: {dado_day.pictocode}</p>
          <p>Velocidade do Vento: {dado_day.velocidadeDoVentoMedia}</p>
          <p>Direção do Vento: {dado_day.direcaoDoVento}</p>
          <p>Probabilidade de precipitação: {dado_day.probabilidadeDePrecipitacao} </p>
        </div>

      ))}

    </div>

  )
}

export default Home
