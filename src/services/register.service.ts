import http from "../axios-connect";
import IRegisterData from "../types/register.type"

class RegisterDataService {
  

  create(data: IRegisterData) {
    return http.post<IRegisterData>("/register", data);
  }

  
}

export default new RegisterDataService();