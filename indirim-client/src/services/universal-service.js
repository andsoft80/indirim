class UniversalService {
  _apiBase = "http://194.87.101.39:8080/";
  
  getCompany = async (id) => await this._post("table/companies/action/get", { id });
  
  
  _createHeader = () => {
	const headers = new Headers();
	const token = localStorage.getItem("indirim_token");
	headers.append("Content-Type", "application/json");
	headers.append("Accept", "application/json");
	headers.append("Authorization", `Bearer ${token}`);
	return headers;
  };
  
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

export {UniversalService};
