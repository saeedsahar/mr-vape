import axios from "axios";

let axiosInstanceAuth = axios.create({
  //baseURL: localStorage.getItem('baseURL'),//process.env.serverAddress,
  // baseURL: "https://eapi.solitontechnologies.com:8445",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    // Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

axiosInstanceAuth.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanceAuth.defaults.headers.post["Content-Type"] = "application/json";
axiosInstanceAuth.interceptors.response.use(
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
export default axiosInstanceAuth;
