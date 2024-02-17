import { callAPIConToken } from "../helper/callAPIRestful";

export class RegionSerive {
  
     getAllRegion(id_pais) {
        return callAPIConToken(`region/${id_pais}`, "", "GET");
    }
   


}