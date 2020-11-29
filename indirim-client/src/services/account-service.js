import axios from "axios";

class AccountService {
  
  _apiBase = "http://194.87.101.39:8080/";
  
  getInfo = async () => await this._get("userinfo");
  
  getOrders = async () => await this._get("orders");
  
  getOffers = async () => await this._get("offers");
  
  _createHeader = () => {
    const headers = new Headers();
    const token = localStorage.getItem("indirim_token");
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    return headers;
  };
  
  _get = async (resource) => {
    const url = `${this._apiBase}${resource}`;
    const res = await fetch(url, { headers: this._createHeader() });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return await res.json();
  }
  
  _post = async (resource, data) => {
    const url = `${this._apiBase}${resource}`;
    const config = {
      method: "POST",
      headers: this._createHeader(),
      body: JSON.stringify(data)
    }
    const response = await fetch(url, config);
    
    return await response.json();
  }
  
}

export default new AccountService();
export { AccountService };
