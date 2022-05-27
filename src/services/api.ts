import axios from "axios";
import { parseCookies } from "nookies";

const api = getAPIClient();

export function getAPIClient(ctx?: any) {
  const { "edify-books.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APT_URL || "http://localhost:3000/",
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
}

export const setBearerToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getAllBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const getGoogleBooks = async (filtro: any) => {
  const { queryKey } = filtro;
  const filterKey = queryKey[1].filtro;
  const response = await axios.get("/api/search?q=" + filterKey);
  return response.data;
};

export const createBook = async (book: any) => {
  const response = await api.post("/books", book);
  return response.data;
};

export const removeBook = async (id: string) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

type SignInData = {
  email: string;
  password: string;
};

export const signInRequest = async ({ email, password }: SignInData) => {
  const response = await api
    .post("/login", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return response;
};

export const recoverUserInformation = async () => {
  const response = await api
    .get("/me")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });

  return response;
};
