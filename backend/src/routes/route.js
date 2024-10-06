import express from 'express'
import  { ListMetadados, ListUnidades, ListDadosAtuais, ListDadosDiarios } from '../controlers/controlTable.js' // importando controler

// definindo como rota
const routes = express.Router()

//configuração da rota
routes.get('/listar', async (req,res) =>{
    const dado = await ListDadosDiarios()
    res.status(200).json(dado)
})



// exportando rota
export default routes

