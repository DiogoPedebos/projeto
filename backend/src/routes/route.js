import express from 'express'

// definindo como rota
const routes = express.Router()

//configuração da rota
routes.get('/teste', (req,res) =>{
    res.send('Consulta bem sucedida');
})

// exportando rota
export default routes

