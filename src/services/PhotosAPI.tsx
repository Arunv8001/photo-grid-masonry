import { API_KEY, BASE_URL_OF_PEXEL } from "./APIUtils";

const sendRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  return await response.json();
} 

export const fetchImages = async (query: string = 'random', page: number) => {
  return await sendRequest(BASE_URL_OF_PEXEL+`/search?query=${query === "" ? "random" : query}&page=${page}&per_page=15`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': API_KEY
    },
  })
}

export const fetchPhoto = async (id: number) => {
  return await sendRequest(BASE_URL_OF_PEXEL+`/photos/${id}`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': API_KEY
    },
  })
}

