import { callAPIConToken } from "../helper/callAPIRestful";

export class TipodebienService {

  
    getAllTipodebien() {
        return callAPIConToken("property/type/", "", "GET");
    }


}