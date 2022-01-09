import axios, { AxiosInstance } from 'axios';

export interface LoginData {
  name: string;
  password: string;
}

export default class UserService {
  HTTP: AxiosInstance;

  constructor() {
    this.HTTP = axios.create({
      baseURL: 'http://localhost:8001/',
    });
  }

    login = async (loginData: LoginData) => {
      try {
        const response = await this.HTTP.post('login', loginData);
        return response?.data;
      } catch (err) {
        console.error(err);
      }
    }

    register = async (username: string, password: string) => {
      try {
        const loginData: LoginData = {
          name: username,
          password,
        };
        const response = await this.HTTP.post('login', loginData);
        return response?.data;
      } catch (err) {
        console.error(err);
      }
    }
}
