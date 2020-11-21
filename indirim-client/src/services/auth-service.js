import axios from "axios";

class AuthService {
  
  _API_URL = "http://194.87.101.39:8080/";
  
  _createHeader = () => {
    const token = localStorage.getItem("indirim_token");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
  
    return headers;
  };
  
  signIn = async (login, password) => {
    return axios
      .post(this._API_URL + "signin", {login, password})
      .then((res) => {
        console.info("AuthService.signIn res => ", res);
        if (res) localStorage.setItem("indirim_token", res);
        return res;
      });
  };
  
  signUp = async (newUser) => {
	return axios
	  .post(this._API_URL + "signup", newUser)
	  .then((res) => {
		console.info("AuthService.signUp res => ", res);
		if (res) localStorage.setItem("indirim_token", res);
		return res;
	  });
  };
  
  signOut = () => {
	console.info("AuthService.signOut");
    localStorage.removeItem("indirim_token");
  };

}

export default new AuthService();
export { AuthService };
