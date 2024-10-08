import { InsertDadosAtuais } from './controlTable.js'

//-33.4569, -70.6483
export async function CreateMeteoblueUrlConsultLocal(query, lat, lon) {
  // Inicializa a string de consulta.
  let queryString = "";

  // Adiciona os parâmetros.
  if (query) {
    if (query !== 0) {
      queryString += `&query=${query}`;
    }
  }

  if (lat) {
    if (lon) {
      queryString += `&query=${lat}%20${lon}`;
    }
  }

  // Constrói a URL.
  let url = `https://www.meteoblue.com/en/server/search/query3?${queryString}&apikey=n1NVZemHJWC0sK7U&itemsPerPage=1`;
  console.log(url)
  // Retorna a URL formatada.
  try {
    const response = await fetch(url)

    // realiza consulta com url especifica
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
    }
    // caso consulta seja bem sucedida
    const dados = await response.json() // armazena json dos valores gerados pela api

    let data = {
      name: dados.results[0].name,
      latitude: dados.results[0].lat,
      longitude: dados.results[0].lon,
      country: dados.results[0].country,
      estadoAdmin1: dados.results[0].admin1
    }
    return data

  } catch (error) {
    console.error('Erro ao buscar ou salvar os dados:', error)

  }
}



export function CreateMeteoBlueUrlConsultDados(lat, lon) {

  let url = ` https://my.meteoblue.com/packages/basic-day?apikey=n1NVZemHJWC0sK7U&lat=${lat}&lon=${lon}&asl=595&format=json&forecast_days=1`
  return url;

}



// const resultado = CreateMeteoBlueUrlConsultDados(-33.4569, -70.6483) // buscando santiago

// console.log(resultado) 

