import axios from "axios";
import axiosInstance from "./axiosInstance";
import axiosInstanceAuth from "./axiosInstanceAuth"

export let base_url = "http://localhost:8081";

// export const getCategories = () =>
//   getRequestsWithoutToken(base_url + "/categories/get");

// export const getDiscountedItems = () =>
//   getRequestsWithoutToken(base_url + "/categories/getDiscountedItems");

export const getRequests = (url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getAuthRequests = (url) => {
  return new Promise((resolve, reject) => {
    axiosInstanceAuth
      .get(url)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const postRequests = (url , body) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url , body)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};