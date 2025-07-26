import axios from "axios";

export const AxiosInterface = axios.create({
  // baseURL: "http://localhost:1337/api/",
  baseURL: "https://accessible-friends-7ed331f152.strapiapp.com/api/",
});

// Storage

const JWT_Storage = localStorage.getItem("JWT");
export const JWT_Parsing = JWT_Storage ? JSON.parse(JWT_Storage) : null;
const ID_Storage = localStorage.getItem("ID");
export const ID_Parsing = ID_Storage ? JSON.parse(ID_Storage) : null;

// export const MY_URL_IMAGE = "http://localhost:1337";
export const MY_URL_IMAGE = "https://accessible-friends-7ed331f152.media.strapiapp.com/";
