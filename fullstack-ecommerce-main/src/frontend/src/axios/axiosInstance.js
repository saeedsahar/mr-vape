import axios from "axios";

let axiosInstance = axios.create({
  //baseURL: localStorage.getItem('baseURL'),//process.env.serverAddress,
  // baseURL: "https://eapi.solitontechnologies.com:8445",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    // Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (!error.status) {
      // network error
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
