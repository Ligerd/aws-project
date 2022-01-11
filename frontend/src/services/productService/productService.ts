import axios, { AxiosInstance } from 'axios';
import { getValueFromLocalStorage, LocalStorageKeys, removeValueFromLocalStorage } from '../../utils/localStorage/localStorage';
import { ProductData } from './productServiceInterfaces';

export default class ProductService {
  HTTP: AxiosInstance;

  constructor() {
    this.HTTP = axios.create({
      baseURL: 'http://webshopproducts.northeurope.azurecontainer.io/',
    });
    this.HTTP.interceptors.response.use(
      (response) => response,
      (err) => {
        const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);
        if ((err?.response.status === 401 || err?.response.status === 403) && token) {
          removeValueFromLocalStorage(LocalStorageKeys.TOKEN);
          window.location.reload();
        }
      },
    );
  }

    getProducts = async () => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.get<ProductData[]>('products', config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data, token);
          console.log(err.response.status);
        }
      }
      return undefined;
    }

    getProduct = async (id: number) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.get<ProductData>(`products/${id}`, config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data, token);
          console.log(err.response.status);
        }
      }
      return undefined;
    }

    addProduct = async (product: Partial<ProductData>) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.post<ProductData>('products', product, config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        }
      }
      return undefined;
    }

    editProduct = async (id: number, product: Partial<ProductData>) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.put<ProductData>(`products/${id}`, product, config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        }
      }
      return undefined;
    }

    removeProduct = async (id: number) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.delete(`products/${id}`, config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        }
      }
      return undefined;
    }
}
