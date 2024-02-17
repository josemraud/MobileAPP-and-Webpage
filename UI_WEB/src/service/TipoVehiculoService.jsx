import { callAPIConToken } from "../helper/callAPIRestful";

export class TipoVehiculoService {

     getAllTipovehiculo() {
        return callAPIConToken("vehicle/type/", "", "GET");
    }
   






}
   

