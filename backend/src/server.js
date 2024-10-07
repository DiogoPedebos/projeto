// importando express e rotas
import express from 'express'
import routes from './routes/index.js'
import cors from 'cors'

// instanciando express em app
const app = express()

// definições do sistema

//habilitando recebimento de json da api meteoblue e definindo rotas
app.use(express.json( ))
app.use(routes)

app.use(cors())

 
const vURL = 'https://my.meteoblue.com/packages/basic-day_current?apikey=n1NVZemHJWC0sK7U&lat=-26.7608&lon=-53.1725&asl=595&format=json&forecast_days=1'











//confirmando execução do servidor
app.listen(3000, () =>{
    console.log('Listen on port 3000')
})