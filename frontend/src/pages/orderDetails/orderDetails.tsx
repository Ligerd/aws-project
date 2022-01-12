import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box, FormControl, Input, InputLabel,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ProductService from '../../services/productService/productService';
import { ProductData } from '../../services/productService/productServiceInterfaces';
import './orderDetails.css';
import CartService from '../../services/cartService/cartService';
import OrderService from '../../services/orderService/orderService';
import { FullOrderData } from '../../services/orderService/orderServiceInterfaces';

export interface ProductListProps {
  userRole?: string;
  userId?: number;
}

const handleChange = (setFun: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setFun(event.target.value);
};

const OrderDetails = ({ userRole, userId }: ProductListProps) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [currentCart, setCurrentCart] = useState<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [shipmentStatus, setShipmentStatus] = useState('');
  const navigate = useNavigate();
  const isAdmin = userRole === 'admin';
  const productService = new ProductService();
  const cartService = new CartService();
  const orderService = new OrderService();
  const location = useLocation();
  const fullOrder: FullOrderData = location?.state?.fullOrderData;

  const getProducts = async (productIds: number[]) => {
    const products = await productService.getProducts();
    if (products) {
      setProducts(products.filter((elem) => productIds.includes(elem.id)));
    }
    console.log(products, 'sdaas23543345665');
  };
  const showOrder = async () => {
    await getProducts(fullOrder.orderedProducts);
    setCity(fullOrder.city);
    setCurrentPrice(fullOrder.totalPrice);
    setPostCode(fullOrder.postCode);
    setStreet(fullOrder.street);
    setHouseNumber(fullOrder.houseNumber);
    setShipmentStatus(fullOrder.shipmentStatus);
  };

  useEffect(() => {
    showOrder();
  }, []);

  const updateStatus = async () => {
    if (fullOrder) {
      const order = await orderService.updateStatus(shipmentStatus, fullOrder);
      navigate('/orders');
    }
  };

  return (
    <div style={{ width: '100%', alignItems: 'center' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >

        <Box sx={{
          width: 1,
          display: { xs: 'flex', md: 'flex' },
          mb: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <div style={{ flex: 1, textAlign: 'start' }}>
            Koszt całkowity:
            {' '}
            <b>
              {currentPrice}
              zł

            </b>
          </div>
          <h3 style={{ flex: 1 }}>Zakupione pojazdy:</h3>
          <div style={{
            flex: 1, justifyContent: 'flex-end', flexDirection: 'row', display: 'flex',

          }}
          />

        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Marka</TableCell>
                <TableCell align="right">Model</TableCell>
                <TableCell align="right">Rodzaj nadwozia</TableCell>
                <TableCell align="right">Cena</TableCell>
                <TableCell align="right">Kraj produkcji</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row, idx) => (
                <TableRow
                  key={row.name + row.type + idx.toString()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.subtype}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.manufacturer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>Adres dostawy:</h3>
        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="city">Miasto</InputLabel>
          <Input id="city" value={city} onChange={handleChange(setCity)} className="inp" disabled />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="postCode">Kod pocztowy</InputLabel>
          <Input id="postCode" type="text" value={postCode} onChange={handleChange(setPostCode)} className="inp" disabled />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="street">Ulica</InputLabel>
          <Input id="street" type="text" value={street} onChange={handleChange(setStreet)} className="inp" disabled />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="houseNumber">Number domu</InputLabel>
          <Input id="houseNumber" type="text" value={houseNumber} onChange={handleChange(setHouseNumber)} className="inp" disabled />
        </FormControl>

        {isAdmin && (
          <>
            <FormControl variant="standard" margin="dense">
              <InputLabel htmlFor="shipmentStatus">Status zamówienia</InputLabel>
              <Input id="shipmentStatus" type="text" value={shipmentStatus} onChange={handleChange(setShipmentStatus)} className="inp" />
            </FormControl>
            <Button variant="contained" sx={{ mt: 2 }} onClick={updateStatus}>
              Zmień status
            </Button>
          </>
        ) }

      </div>
    </div>
  );
};

export default OrderDetails;
