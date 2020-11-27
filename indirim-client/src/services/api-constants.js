export const API_URL = "http://194.87.101.39:8080/";

export const createHeader = () => {
  const headers = new Headers();
  const token = localStorage.getItem("indirim_token");
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  return headers;
};
