import axios from "axios";

// Axios configuration
const axiosConfig = {
  // baseURL: "https://pokeapi.co/api/v2/",
  responseType: "json",
  // timeout: 6000,
};

// Create an Axios instance with the specified configuration
export const fetcher = axios.create(axiosConfig);

// Function to perform a GET request using the 'fetcher' instance
export const axiosGet = async (url, headers) => {
  const response = await fetcher.get(url, headers);
  return response;
};
