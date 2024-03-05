import axios, { AxiosInstance } from 'axios';

export default function getInstance(): AxiosInstance {
  return axios.create({
    baseURL: 'http://localhost:3000'
  });
}
