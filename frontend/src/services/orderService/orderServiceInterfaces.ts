export interface OrderData {
  customerId: number;
  orderedProducts: number[];
  totalPrice: number;
  id: number;
}

export interface OrderDetails{
  orderId: number;
  orderDate: Date;
  shipmentDate: Date;
  shipmentStatus: string;
}

export interface AddressData{
  orderId: number;
  city: string;
  postCode: string;
  street: string;
  houseNumber: string;
}
