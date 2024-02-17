import { callAPIConToken } from "../helper/callAPIRestful";

export class FotosService {

  
   
    async getFotoVehiculo(id_vehicle) {
        return await callAPIConToken(`vehicle/pics/${id_vehicle}`, "", "GET");
      }

      
    async getFotoBien(id_bien) {
      return await callAPIConToken(`property/pics/${id_bien}`, "", "GET");
    }

   
      async getThVehiculo(id_vehicle) {
        return await callAPIConToken(`vehicle/pics/${id_vehicle}/first`, "", "GET");
      }
      
      async getThBien(id_bien) {
        return await callAPIConToken(`property/pics/${id_bien}/first`, "", "GET");
      }



    
}