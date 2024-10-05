import express from 'express'

const routes = express.Router()


async function buscaDadosApi(){
    const response = await fetch('https://my.meteoblue.com/packages/basic-day_current?apikey=n1NVZemHJWC0sK7U&lat=-26.7608&lon=-53.1725&asl=595&format=json&forecast_days=1')
    const dados = await response.json()
    return(dados) 
}

buscaDadosApi()

// routes.get('dados/', (req,res) =>{
//     res.send(buscaDadosApi());
// })

// routes.get('/', (req, res) => {
//     res.send('Route sucesss');
// });



