import axios from "axios"


const BASE_URL = "http://localhost:7865/"
const axiosInstance = axios.create();

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.baseURL = BASE_URL;

export default axiosInstance;