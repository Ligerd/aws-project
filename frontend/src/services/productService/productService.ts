import axios, { AxiosInstance } from 'axios';

export interface LoginData {
  name: string;
  password: string;
}

export default class ProductService {
  HTTP: AxiosInstance;

  constructor() {
    this.HTTP = axios.create({
      baseURL: 'http://localhost:8001/',
    });
  }

    login = async (username: string, password: string) => {
      try {
        const loginData: LoginData = {
          name: username,
          password,
        };
        const response = await axios.post('login', loginData);
        return response?.data;
      } catch (err) {
        console.error(err);
      }
    }
}
