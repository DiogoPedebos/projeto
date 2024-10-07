import {useState, useRef, useEffect } from 'react'
import './style.css'
import api from '../../services/api.js'
// import Trash from '../../assets/img.ex' importação de imagem de exemplo

function Home() {

  let dados_day = []
  const [count, setCount] = useState(0)
  const inputCidade = useRef()
  const inputLatitude = useRef()
  const inputLongitude = useRef()

  async function getDados_day(){
    const resposta = await api.get('/listar')
    dados_day = await resposta.json()
  }

  function ProcuraCidade(){
    console.log(inputCidade.current.value)
  }

  function ProcuraCoordenada(){

    console.log(inputLatitude.current.value)
    console.log(inputLatitude.current.value)
  }
  
  useEffect(() => {
    getDados_day()
  }, []);

  return (

    <div className="container">
      <div>
        <div>
            <h1>Seu guia para o tempo</h1>
            {/* <button type='button'><img src={Trash}/></button> */}
            <button onClick={ProcuraCidade}>Pesquisar1</button>
            <input ref={inputCidade} type="text" placeholder="Nome da Cidade"/>
        </div>
        <div>
            <button onClick={ProcuraCoordenada} type='button'>Pesquisar2</button>
            <input ref={inputLatitude} name='lat' type="number"  placeholder="Latitude"/>
            <input ref={inputLongitude} name='lon' type="number"  placeholder="Longitude"/>
        </div>
      </div>

      {dados_day.map(dado_day => (

        <div className="containerCentral" key={dado_day.id}>
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
