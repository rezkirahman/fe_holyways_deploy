import axios from "axios";

export const API = axios.create({
  baseURL: "https://beholywaysdeploy-production-0674.up.railway.app/api/v1/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};