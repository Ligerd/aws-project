import axios, { AxiosInstance } from 'axios';
import { getValueFromLocalStorage, LocalStorageKeys, saveValueToLocalStorage } from '../../utils/localStorage/localStorage';
import { LoginData, UserData, LoginResponse } from './userServiceInterfaces';

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

    getUserInfo = async (userId: number) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.get<UserData>(`customers/${userId}`, config);
        if (response?.data) {
          return response?.data;
        }
      } catch (err) {
        console.error(err);
      }
      return undefined;
    }

    register = async (userData: UserData) => {
      try {
        const response = await this.HTTP.post('register', userData);
        return response?.data;
      } catch (err) {
        console.error(err);
      }
      return undefined;
    }
}
