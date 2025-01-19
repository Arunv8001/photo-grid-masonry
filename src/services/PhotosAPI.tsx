import { AUTH_KEY, BASE_URL_OF_PEXEL } from "./APIUtils";

const sendRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  return await response.json();
} 

const fetchPhotos = async () => {
  return await sendRequest(BASE_URL_OF_PEXEL+"query=nature&per_page=20", {
    headers: {
      'Content-type': 'application/json',
      'Authorization': AUTH_KEY
    },
  })
}

export default fetchPhotos;