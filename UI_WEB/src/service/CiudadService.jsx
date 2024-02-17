import { callAPIConToken } from "../helper/callAPIRestful";

export class CiudadService {
  
  // INI | Get All Ciudades  *********************
  getAllCiudades(id_region) {
    return callAPIConToken(`city/${id_region}`, "", "GET");
}
// FIN | Get All Ciudades ******************
   


}