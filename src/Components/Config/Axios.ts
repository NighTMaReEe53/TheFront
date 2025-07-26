import axios from "axios";

export const AxiosInterface = axios.create({
  baseURL: "http://localhost:1337/api/",
  // baseURL: "https://jolly-captain-a3a7295f58.strapiapp.com/api/",
});

// Storage

const JWT_Storage = localStorage.getItem("JWT");
export const JWT_Parsing = JWT_Storage ? JSON.parse(JWT_Storage) : null;
const ID_Storage = localStorage.getItem("ID");
export const ID_Parsing = ID_Storage ? JSON.parse(ID_Storage) : null;
