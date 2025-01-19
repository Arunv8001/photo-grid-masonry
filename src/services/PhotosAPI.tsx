import { AUTH_KEY, BASE_URL_OF_PEXEL } from "./APIUtils";

const sendRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  return await response.json();
} 

const fetchPhotos = async (page: number) => {
  return await sendRequest(BASE_URL_OF_PEXEL+`?page=${page}&per_page=30`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': AUTH_KEY
    },
  })
}

export default fetchPhotos;