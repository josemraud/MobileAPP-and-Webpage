import { callAPIConToken } from "../helper/callAPIRestful";

export class VehiculosService {

  
    async newVehiculo(data) {
        return await callAPIConToken("vehicle/", data, "POST");
    } 
    async newPic(data) {
        return await callAPIConToken("vehicle/pics/", data, "POST");
    } 

    getUsado() {
        return callAPIConToken("vehicle/used", "", "GET");
    }
    getNuevo() {
        return callAPIConToken("vehicle/new", "", "GET");
        
    }
    getSeo() {
        return callAPIConToken("vehicle/seo", "", "GET");
        
    }
    async getOne(id_vehicle) {
        return await callAPIConToken(`vehicle/${id_vehicle}`, "", "GET");
      }


      getbusqueda(id_ciudad,id_tipo_vehiculo,menor,mayor) {
        return  callAPIConToken(`vehicle/filters/used/city/${id_ciudad}/type/${id_tipo_vehiculo}/lowest/${menor}/highest/${mayor}`, "", "GET");
      }
      getbusquedaNuevo(id_ciudad,id_tipo_vehiculo,menor,mayor) {
        return  callAPIConToken(`vehicle/filters/new/city/${id_ciudad}/type/${id_tipo_vehiculo}/lowest/${menor}/highest/${mayor}`, "", "GET");
      }
}