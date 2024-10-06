import { PrismaClient } from '@prisma/client'

// definindo como rota e instanciando Prisma
const prisma = new PrismaClient()

//formata os dados tipo data 
function formatarDataISO8601UTC(dataString) {
    const data = new Date(dataString)
    return data.toISOString()
}


// TB METADADOS ===================================
// Função para incluir dados na tb metadados
export async function InsertMetadados(vUrl) {
    try {
        const response = await fetch(vUrl) // realiza consulta com url especifica
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
        }
        // caso consulta seja bem sucedida
        const dados = await response.json() // armazena json dos valores gerados pela api

        // utiliza o prisma para implementar dados da consulta
        await prisma.metadados.create({
            data: {
                modelrunUpdatetimeUtc: formatarDataISO8601UTC(dados.metadata.modelrun_updatetime_utc),
                nome: dados.metadata.name,
                altura: dados.metadata.height,
                abreviacaoFusoHorario: dados.metadata.timezone_abbrevation,
                latitude: dados.metadata.latitude,
                modelrunUtc: formatarDataISO8601UTC(dados.metadata.modelrun_utc),
                longitude: dados.metadata.longitude,
                offsetHorarioUtc: dados.metadata.utc_timeoffset,
                tempoGeracaoMs: dados.metadata.generation_time_ms
            }
        })
        // verificação do processo
        console.log('Dados salvos com sucesso!')
    } catch (error) {
        console.error('Erro ao buscar ou salvar os dados:', error)
    }
}

// Função para listar todos dados da tb metadados
export async function ListMetadados(){
    const metadados = await prisma.metadados.findMany()
    return metadados
}

// TB UNIDADES ===================================
// Função para incluir dados na tb Unidades
export async function InsertUnidades(vUrl) {
    try {
        const response = await fetch(vUrl); // realiza consulta com url especifica
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        // caso consulta seja bem sucedida
        const dados = await response.json(); // armazena json dos valores gerados pela api

        // utiliza o prisma para implementar dados da consulta
        await prisma.unidades.create({
            data: {
                previsibilidade: dados.units.predictability,
                precipitacao: dados.units.precipitation,
                velocidadeDoVento: dados.units.windspeed,
                probabilidadeDePrecipitacao: dados.units.precipitation_probability,
                umidadeRelativa: dados.units.relativehumidity,
                tempo: dados.units.time,
                temperatura: dados.units.temperature,
                pressao: dados.units.pressure,
                direcaoDoVento: dados.units.winddirection,
            }
        });
        // verificação do processo
        console.log('Dados salvos com sucesso!');
    } catch (error) {
        console.error('Erro ao buscar ou salvar os dados:', error);
    }
}

// Função para listar todos dados da tb Unidades
export async function ListUnidades(){
    const unidades = await prisma.unidades.findMany()
    return unidades
}

// TB DADOSATUAIS ===================================
// Função para incluir dados na tb DadosAtuais
export async function InsertDadosAtuais(vUrl) {
    try {
        const response = await fetch(vUrl); // realiza consulta com url especifica
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        // caso consulta seja bem sucedida
        const dados = await response.json(); // armazena json dos valores gerados pela api

        // utiliza o prisma para implementar dados da consulta
        await prisma.dadosAtuais.create({
            data: {
                tempo: formatarDataISO8601UTC(dados.data_current.time),
                dadosObservados: Boolean(dados.data_current.isobserveddata),
                metarid: dados.data_current.metarid,
                ehDia: Boolean(dados.data_current.isdaylight),
                velocidadeDoVento: dados.data_current.windspeed,
                anguloDeZenite: dados.data_current.zenithangle,
                pictocodeDetalhado: dados.data_current.pictocode_detailed,
                pictocode: dados.data_current.pictocode,
                temperatura: dados.data_current.temperature,
            }
        });
        // verificação do processo
        console.log('Dados salvos com sucesso!');
    } catch (error) {
        console.error('Erro ao buscar ou salvar os dados:', error);
    }
}

// Função para listar todos dados da tb DadosAtuais
export async function ListDadosAtuais(){
    const dadosAtuais = await prisma.dadosAtuais.findMany()
    return dadosAtuais
}


// TB DADOSDIARIOS ===================================
export async function InsertDadosDiarios(vUrl) {
    try {
      const response = await fetch(vUrl); // realiza consulta com url especifica
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      // caso consulta seja bem sucedida
      const dados = await response.json(); // armazena json dos valores gerados pela api
  
      // utiliza o prisma para implementar dados da consulta
      await prisma.dadosDiarios.create({
        data: {
          tempo: new Date(dados.data_day.time[0]),
          temperaturaInstantanea: dados.data_day.temperature_instant[0],
          precipitacao: dados.data_day.precipitation[0],
          previsibilidade: dados.data_day.predictability[0],
          temperaturaMaxima: dados.data_day.temperature_max[0],
          pressaoMediaNivelDoMar: dados.data_day.sealevelpressure_mean[0],
          velocidadeDoVentoMedia: dados.data_day.windspeed_mean[0],
          horasDePrecipitacao: dados.data_day.precipitation_hours[0],
          pressaoMinimaNivelDoMar: dados.data_day.sealevelpressure_min[0],
          pictocode: dados.data_day.pictocode[0],
          fracaoDeNeve: dados.data_day.snowfraction[0],
          horasComUmidadeMaior90: dados.data_day.humiditygreater90_hours[0],
          precipitacaoConvectiva: dados.data_day.convective_precipitation[0],
          umidadeRelativaMaxima: dados.data_day.relativehumidity_max[0],
          temperaturaMinima: dados.data_day.temperature_min[0],
          direcaoDoVento: dados.data_day.winddirection[0],
          temperaturaSensacaoMaxima: dados.data_day.felttemperature_max[0],
          umidadeRelativaMinima: dados.data_day.relativehumidity_min[0],
          temperaturaSensacaoMedia: dados.data_day.felttemperature_mean[0],
          velocidadeDoVentoMinima: dados.data_day.windspeed_min[0],
          temperaturaSensacaoMinima: dados.data_day.felttemperature_min[0],
          probabilidadeDePrecipitacao: dados.data_day.precipitation_probability[0],
          indiceUv: dados.data_day.uvindex[0],
          manchasDeChuva: dados.data_day.rainspot[0],
          temperaturaMedia: dados.data_day.temperature_mean[0],
          pressaoMaximaNivelDoMar: dados.data_day.sealevelpressure_max[0],
          umidadeRelativaMedia: dados.data_day.relativehumidity_mean[0],
          classeDePrevisibilidade: dados.data_day.predictability_class[0],
          velocidadeDoVentoMaxima: dados.data_day.windspeed_max[0],
        }
      });
      // verificação do processo
      console.log('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao buscar ou salvar os dados:', error);
    }
  }

// Função para listar todos dados da tb DadosAtuais
export async function ListDadosDiarios(){
    const dadosDiarios = await prisma.dadosDiarios.findMany()
    return dadosDiarios
}
