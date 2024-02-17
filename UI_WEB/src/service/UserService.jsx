import { callAPIConToken } from "../helper/callAPIRestful";
import { callAPISinToken } from "../helper/callAPIRestful";

export class UserService {
  
  // INI | Get Usuario  *********************
  getUser(correo) {
    return callAPIConToken(`user/auth/${correo}`, "", "GET");
}
confirmUser(id) {
  return callAPIConToken(`user/auth/${id}/confirmed`, "", "PUT");
}
async recUser(correo) {
  return await callAPISinToken(`user/auth/${correo}/restore`, "", "PUT");
}
async newPassword(data,id) {
  return await callAPIConToken(`user/auth/${id}/newpassword`, data, "PUT");
}

// FIN | Get Usuario ******************
   
async newUser(data) {
  return await callAPISinToken("user/auth/", data, "POST");
} 

}