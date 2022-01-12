import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete, Edit } from '@mui/icons-material';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import OrderService from '../../services/orderService/orderService';
import { FullOrderData } from '../../services/orderService/orderServiceInterfaces';
import './orderList.css';
import CartService from '../../services/cartService/cartService';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';

export interface OrderListProps {
  userId?: number;
  userRole?: string;
}

const OrderList = ({ userId, userRole }: OrderListProps) => {
  const [orders, setOrders] = useState<FullOrderData[]>([]);
  const [currentCart, setCurrentCart] = useState<number[]>([]);
  const navigate = useNavigate();
  const isAdmin = userRole === 'admin';
  const orderService = new OrderService();
  const cartService = new CartService();
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const orders = await orderService.getOrders();
    if (orders) {
      if (isAdmin) setOrders(orders);
      else setOrders(orders.filter((elem) => elem.customerId === userId));
    }
    console.log(orders, userId, userRole);
  };

  const editOrder = (id: number) => async () => {
    navigate('/orderDetails', { state: { fullOrderData: orders.find((elem) => elem.id === id) } });
  };

  const renderButton = (row: FullOrderData) => {
    if (isAdmin) {
      return (
        <Button sx={{ mr: 2 }} variant="contained" onClick={editOrder(row.id)} endIcon={<Edit />}>
          Zmień status
        </Button>
      );
    }
    return (
      <Button variant="contained" onClick={editOrder(row.id)}>
        Szczegóły
      </Button>
    );
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
          <div style={{ flex: 1 }} />
          <h3 style={{ flex: 1 }}>Lista zamówień:</h3>
          <div style={{
            flex: 1, justifyContent: 'flex-end', flexDirection: 'row', display: 'flex',

          }}
          />

        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Numer zamówienia</TableCell>
                <TableCell align="right">Cena</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Adres</TableCell>
                {isAdmin && <TableCell align="right">Id klienta</TableCell>}
                <TableCell align="right">Opcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row, idx) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">
                    {row.totalPrice}
                    {' '}
                    zł
                  </TableCell>
                  <TableCell align="right">{row.shipmentStatus}</TableCell>
                  <TableCell align="right">{`${row.street} ${row.houseNumber}, ${row.postCode} ${row.city} `}</TableCell>
                  {isAdmin && <TableCell align="right">{row.customerId}</TableCell>}

                  <TableCell align="right">
                    {renderButton(row)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OrderList;
