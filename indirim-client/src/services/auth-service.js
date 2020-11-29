import axios from "axios";

class AuthService {
  
  _apiBase = "http://194.87.101.39:8080/";
  
  signIn = async (login, password) => {
    return axios
      .post(this._apiBase + "signin", {login, password})
      .then((res) => {
        console.info("AuthService.signIn res => ", res);
        if (res) localStorage.setItem("indirim_token", res);
        return res;
      });
  };
  
  signUp = async (newUser) => {
    console.log("AuthService.signUp newUser", newUser)
	return axios
	  .post(this._API_URL + "signup", newUser)
	  .then((res) => {
		console.info("AuthService.signUp res => ", res);
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
