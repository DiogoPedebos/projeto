import React, { useState, useEffect, useRef, } from 'react'
import './style.css'
import { ConfirmaConexao } from '../../controlers/controlHome.js'
import { CreateMeteoBlueUrlConsultLocal } from '../../controlers/montURL.js'




function Home() {

  const inputRefPesquisa = useRef()
  const inputRefDados = useRef()


  async function searchCity() {
    console.log(inputRefPesquisa.current.value)
    const city = inputRefPesquisa.current.value
    let infoConsulta = CreateMeteoBlueUrlConsultLocal(city)

    console.log(infoConsulta)
    // return infoConsulta
  }
  // let dados_day = []

  useEffect(() => {
    ConfirmaConexao()
  }, [])


  return (

    <div className="container">
      <div>
        <div>
          <h1>Seu guia para o tempo</h1>
          {/* <button type='button'><img src={Trash}/></button> */}
          <button onClick={searchCity} >Pesquisar1</button>
          <input ref={inputRefPesquisa} type="text" placeholder="Nome da Cidade" />
        </div>
        <div>
          <button type='button'>Pesquisar2</button>
          <input name='lat' type="number" placeholder="Latitude" />
          <input name='lon' type="number" placeholder="Longitude" />
        </div>
      </div>


      <div className="containerCentral" >
        <h1>vDiaSemana </h1>
        <p>Temperatura Mínima: </p>
        <p>Temperatura Máxima: </p>
        <p>Atual Clima: </p>
        <p>Velocidade do Vento: </p>
        <p>Direção do Vento: </p>
        <p>Probabilidade de precipitação: </p>
      </div>


    </div>

  )
}

export default Home