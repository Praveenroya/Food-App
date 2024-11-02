import axios from "axios";

const API = axios.create({
  baseURL: "https://fooddelivery-mern.onrender.com/api/",
});

const tokenKpi = localStorage.getItem("foodeli-app-token");

//auth
export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);

//products
export const getAllProducts = async (filter) =>
  await API.get(`/food`, filter);

export const getProductDetails = async (id) => await API.get(`/food/${id}`);

//Cart
export const getCart = async () =>
  await API.get(`/user/cart`, {
    headers: { Authorization: `Bearer ${tokenKpi}` },
  });

export const addToCart = async (data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${tokenKpi}` },
  });

export const deleteFromCart = async (data) =>
  await API.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${tokenKpi}` },
  });

//favorites

export const getFavourite = async () =>
  await API.get(`/user/favorite`, {
    headers: { Authorization: `Bearer ${tokenKpi}` },
  });

export const addToFavourite = async (data) =>
  await API.post(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${tokenKpi}` },
  });

export const deleteFromFavourite = async ( data) =>
  await API.patch(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${tokenKpi}` },
  });

//Orders
export const placeOrder = async (token ,data) =>
  await API.post(`/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = async (token) =>
  await API.get(`/user/order/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
