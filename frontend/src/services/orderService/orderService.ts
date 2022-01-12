import axios, { AxiosInstance } from 'axios';
import { getValueFromLocalStorage, LocalStorageKeys, removeValueFromLocalStorage } from '../../utils/localStorage/localStorage';
import {
  OrderData, OrderDetails, AddressData, FullOrderData,
} from './orderServiceInterfaces';

export default class OrderService {
  HTTP: AxiosInstance;

  HTTPOrderDetails: AxiosInstance;

  HTTPDeliveriesDetails: AxiosInstance;

  constructor() {
    this.HTTP = axios.create({
      baseURL: 'http://webshoporders.northeurope.azurecontainer.io/',
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
    this.HTTPOrderDetails = axios.create({
      baseURL: 'http://webshoporderdetails.northeurope.azurecontainer.io/',
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
    this.HTTPDeliveriesDetails = axios.create({
      baseURL: 'http://webshopdeliveries.northeurope.azurecontainer.io/',
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

    getOrders = async () => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const ordersResponse = await this.HTTP.get<OrderData[]>('orders', config);
        const orderDetailsResponse = await this.HTTPOrderDetails.get<OrderDetails[]>('order_details', config);
        const deliveriesResponse = await this.HTTPDeliveriesDetails.get<AddressData[]>('deliveries', config);
        const fullOrders: FullOrderData[] = [];
        ordersResponse?.data.forEach((order) => {
          const orderDetails = orderDetailsResponse.data;
          const deliveries = deliveriesResponse.data;
          const orderDetail = orderDetails.find((elem) => elem.orderId === order.id);
          const delivery = deliveries.find((elem) => elem.orderId === order.id);
          if (delivery && orderDetail && order) {
            const fullOrder: FullOrderData = {
              ...orderDetail,
              ...delivery,
              ...order,
              orderDetailId: orderDetail?.id,
              deliveryId: delivery?.id,
            };
            fullOrders.push(fullOrder);
          }
        });
        return fullOrders;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data, token);
          console.log(err.response.status);
        }
      }
      return undefined;
    }

    getOrder = async (id: number) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await this.HTTP.get<OrderData>(`orders/${id}`, config);
        return response?.data;
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data, token);
          console.log(err.response.status);
        }
      }
      return undefined;
    }

    makeOrder = async (orderData: Partial<OrderData>, addressData: Partial<AddressData>) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const order = await this.HTTP.post<OrderData>('orders', orderData, config);
        if (order?.data) {
          const today = new Date();

          const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

          const orderDetails = await this.HTTPOrderDetails.post<OrderDetails>('order_details', {
            orderId: order.data.id,
            orderDate: today,
            shipmentDate: nextWeek,
            shipmentStatus: 'new',
          }, config);
          if (orderDetails?.data) {
            const deliveriesDetails = await this.HTTPDeliveriesDetails.post<AddressData>('deliveries', {
              orderId: order.data.id,
              ...addressData,
            }, config);
            if (deliveriesDetails?.data) {
              return deliveriesDetails.data;
            }
          }
        }
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        }
      }
      return undefined;
    }

    updateStatus = async (status: string, fullOrder: FullOrderData) => {
      const token = getValueFromLocalStorage(LocalStorageKeys.TOKEN);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const deliveriesDetails = await this.HTTPOrderDetails.put<AddressData>(`order_details/${fullOrder.orderDetailId}`, {
          shipmentStatus: status,
          orderId: fullOrder.id,
          orderDate: fullOrder.orderDate,
          shipmentDate: fullOrder.shipmentDate,
        }, config);
        if (deliveriesDetails?.data) {
          return deliveriesDetails.data;
        }
      } catch (err: any) {
        if (err?.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        }
      }
      return undefined;
    }
}
