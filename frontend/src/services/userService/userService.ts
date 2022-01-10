import axios, { AxiosInstance } from 'axios';
import { LocalStorageKeys, saveValueToLocalStorage } from '../../utils/localStorage/localStorage';
import { LoginData, RegisterData, LoginResponse } from './userServiceInterfaces';

export default class UserService {
  HTTP: AxiosInstance;

  constructor() {
    this.HTTP = axios.create({
      baseURL: 'http://webshopcustomers.northeurope.azurecontainer.io/',
    });
  }

    login = async (loginData: LoginData) => {
      try {
        const response = await this.HTTP.post<LoginResponse>('login', loginData);
        if (response?.data) {
          saveValueToLocalStorage(LocalStorageKeys.TOKEN, response.data.token);
          return response?.data;
        }
      } catch (err) {
        console.error(err);
      }
      return undefined;
    }

    register = async (registerData: RegisterData) => {
      try {
        const response = await this.HTTP.post('register', registerData);
        return response?.data;
      } catch (err) {
        console.error(err);
      }
      return undefined;
    }
}
