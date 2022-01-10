import axios, { AxiosInstance } from 'axios';
import { getValueFromLocalStorage, LocalStorageKeys } from '../../utils/localStorage/localStorage';
import { CartData } from './cartServiceInterfaces';

export default class CartService {
  HTTP: AxiosInstance;

  constructor() {
    this.HTTP = axios.create({
      baseURL: 'http://webshopcarts.northeurope.azurecontainer.io/',
    });
  }

    getCart = async () => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.get<Partial<CartData>>('carts', config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data, token);
          console.log(err.response.status);
        }
      }
    }

    addToCart = async (productId: number) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.get<CartData[]>(`carts/products/${productId}`, config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data, token);
          console.log(err.response.status);
        }
      }
    }

    clearCart = async () => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.delete('carts', config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data, token);
          console.log(err.response.status);
        }
      }
    }
}
