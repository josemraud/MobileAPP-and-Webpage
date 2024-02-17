import { callAPIConToken } from "../helper/callAPIRestful";

export class BienesService {

  
    async newBien(data) {
        return await callAPIConToken("property/", data, "POST");
    } 
    async newPic(data) {
        return await callAPIConToken("property/pics/", data, "POST");
    } 
  
    getVenta() {
        return callAPIConToken("property/sale", "", "GET");
    }
    getRenta() {
        return callAPIConToken("property/rental", "", "GET");
        
    }
    getSeo() {
        return callAPIConToken("property/seo", "", "GET");
        
    }


    async getOne(id_bien) {
        return await callAPIConToken(`property/${id_bien}`, "", "GET");
      }

       getbusqueda(id_ciudad,id_tipo_bien,menor,mayor) {
        return  callAPIConToken(`property/filters/sale/city/${id_ciudad}/type/${id_tipo_bien}/lowest/${menor}/highest/${mayor}`, "", "GET");
      }
      getbusquedaRenta(id_ciudad,id_tipo_bien,menor,mayor) {
        return  callAPIConToken(`property/filters/rental/city/${id_ciudad}/type/${id_tipo_bien}/lowest/${menor}/highest/${mayor}`, "", "GET");
      }


      
 
}