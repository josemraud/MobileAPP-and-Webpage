import { callAPIConToken } from "../helper/callAPIRestful";

export class PaisService {
    // INI | Get All Paises *********************
     getAllPaises() {
        return callAPIConToken("countries/", "", "GET");
    }
    // FIN | Get All Paises  ******************

    // INI | Post Pais  *********************
    async newPais(data) {
        return await callAPIConToken("countries/", data, "POST");
    } // FIN | Post Pais  ******************


    async editPais(data, id_pais) {
        return await callAPIConToken(`countries/${id_pais}`, data, "PUT");
      }



// INI | PUT estado de Pais  *********************
async editStatePais(data, id_pais) {
    return await callAPIConToken(`countries/${id_pais}/state`, data, "PUT");
  } // FIN | PUT estado de Pais  ******************
}
