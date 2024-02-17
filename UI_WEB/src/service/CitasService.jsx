import { callAPIConToken } from "../helper/callAPIRestful";

export class CitasService {

  
   
    async CitaBien(data) {
        return await callAPIConToken("property/appointment/", data, "POST");
      }

      async CitaVehiculo(data) {
        return await callAPIConToken("vehicle/appointment/", data, "POST");
      }



    
}