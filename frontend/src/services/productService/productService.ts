import axios, { AxiosInstance } from 'axios';
import { getValueFromLocalStorage, LocalStorageKeys } from '../../utils/localStorage/localStorage';
import { ProductData } from './productServiceInterfaces';

export default class ProductService {
  HTTP: AxiosInstance;

  constructor() {
    this.HTTP = axios.create({
      baseURL: 'http://webshopproducts.northeurope.azurecontainer.io/',
    });
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
    }

    addProduct = async () => {
      try {
        const s = 2;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        }
      }
    }
}
