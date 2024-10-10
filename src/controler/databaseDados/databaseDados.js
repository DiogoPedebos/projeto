import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// TB METADADOS ===================================
// Função para incluir dados na tb metadados
export async function insertMetadata(dados) {
  try {
    if (!dados) {
      throw new Error(`Erro no recebimento: dados vazia`)
    }

    // Utiliza o prisma para inserir dados da consulta
    await prisma.metadata.create({
      data: {
        modelrun_updatetime_utc: dados.metadata.modelrun_updatetime_utc ? new Date(dados.metadata.modelrun_updatetime_utc) : null,
        name: dados.metadata.name,
        height: dados.metadata.height,
        timezone_abbrevation: dados.metadata.timezone_abbrevation,
        latitude: dados.metadata.latitude,
        modelrun_utc: dados.metadata.modelrun_utc ? new Date(dados.metadata.modelrun_utc) : null,
        longitude: dados.metadata.longitude,
        utc_timeoffset: dados.metadata.utc_timeoffset,
        generation_time_ms: dados.metadata.generation_time_ms,
        unitsId: dados.metadata.unitsId, 
        dataDayId: dados.metadata.dataDayId
      }
    })

    console.log('Dados salvos com sucesso!')
  } catch (error) {
    console.error('Erro ao inserir os dados:', error)
  }
}