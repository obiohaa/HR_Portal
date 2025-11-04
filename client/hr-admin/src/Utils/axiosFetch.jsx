import axios from "axios";
const origin = import.meta.env.VITE_ORIGIN;

const axiosFetch = axios.create({
  // baseURL: "https://hr-server.theplace.com.ng/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: origin,
  withCredentials: "true",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosFetchFormData = axios.create({
  // baseURL: "https://hr-server.theplace.com.ng/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: origin,
  withCredentials: "true",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// export default axiosFetch;
export { axiosFetch, axiosFetchFormData };
