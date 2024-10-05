// importando express e rotas
import express from 'express'
import routes from './routes/route.js' 

// instanciando express em app
const app = express()

// definições do sistema

//habilitando recebimento de json da api meteoblue
app.use(express.json( ))

//definindo rotas
app.use(routes)











//confirmando execução do servidor
app.listen(3000, () =>{
    console.log('Listen on port 3000')
})