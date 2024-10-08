import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { ConfirmaConexao } from '../../controlers/controlHome.js';
import { CreateMeteoblueUrlConsultLocal } from '../../controlers/montURL.js';

function Home() {
  const inputRefPesquisa = useRef();
  const [infoConsulta, setInfoConsulta] = useState(null);

  useEffect(() => {
    async function obterInformacoes() {
      let result = await CreateMeteoblueUrlConsultLocal('maravilha');
      setInfoConsulta(result);
    }
    obterInformacoes();
  }, []);

  async function searchCity() {
    const city = inputRefPesquisa.current.value;
    let result = await CreateMeteoblueUrlConsultLocal(city);
    setInfoConsulta(result);
  }

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

      {infoConsulta && ( // Renderiza o div se infoConsulta não for null
        <div className="containerCentral">
          <h1>Cidade: {infoConsulta.name},</h1><p>{infoConsulta.estadoAdmin1},</p><p>{infoConsulta.country},</p>
          <p>Temperatura Mínima: </p>
          <p>Temperatura Máxima: </p>
          <p>Atual Clima: </p>
          <p>Velocidade do Vento: </p>
          <p>Direção do Vento: </p>
          <p>Probabilidade de precipitação: </p>
        </div>
      )}

    </div>

  )
}

export default Home




