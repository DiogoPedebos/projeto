import { PrismaClient } from '@prisma/client'
import express from 'express'

// definindo como rota e instanciando Prisma
const routes = express.Router()
const prisma = new PrismaClient()

//configuração da rota
routes.post('/newR', async (req,res) =>{

    await prisma.metadados.create({
        data: {
            modelrunUpdatetimeUtc: req.body.metadata.modelrun_updatetime_utc,
            nome: req.body.metadata.name,
            altura: req.body.metadata.height,
            abreviacaoFusoHorario: req.body.metadata.timezone_abbrevation
        }

    })

    res.status(201).json(req.body);
})

// exportando rota
export default routes

