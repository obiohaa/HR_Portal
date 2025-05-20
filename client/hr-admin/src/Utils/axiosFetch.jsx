import axios from "axios";

const axiosFetch = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: "true",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosFetch;
