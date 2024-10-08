import express from 'express'
import  { insertMetadata ,ListMetadados, ListUnidades, ListDadosAtuais, ListDadosDiarios, ListDadoDiario } from '../controlers/controlTable.js' // importando controler
import  { CreateMeteoblueUrlConsultLocal } from '../controlers/montURL.js'

// definindo como rota
const routes = express.Router()

//configuração da rota
routes.get('/cadastra', async (req,res) =>{
    let resposta = await CreateMeteoblueUrlConsultLocal('santiago')
    console.log(resposta)
    res.status(200)
})

routes.get('/buscar', async (req,res) =>{

    var url = CreateMeteoBlueUrl("Santiago", "BR", "n1NVZemHJWC0sK7U");
    console.log(url)
    InsertDadosDiarios(url)
    const dado = await ListDadoDiario()
    res.send(dado);
    res.status(200)
})



// exportando rota
export default routes

