// importando express e rotas
import express from 'express'
import routes from './routes/index.js'
 

// instanciando express em app e prismaClient
const app = express()
const prisma = new PrismaClient()

// definições do sistema

//habilitando recebimento de json da api meteoblue e definindo rotas
app.use(express.json( ))
app.use(routes)











//confirmando execução do servidor
app.listen(3000, () =>{
    console.log('Listen on port 3000')
})