import { callAPIConToken } from "../helper/callAPIRestful";
import { callAPISinToken } from "../helper/callAPIRestful";

export class UserService {
  
  // INI | Get Usuario  *********************
  getUser(correo) {
    return callAPIConToken(`user/auth/${correo}`, "", "GET");
}
// FIN | Get Usuario ******************
   
async newUser(data) {
  return await callAPISinToken("user/auth/", data, "POST");
} 

}