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
import { OrderData } from '../../services/orderService/orderServiceInterfaces';
import './orderList.css';
import CartService from '../../services/cartService/cartService';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';

export interface OrderListProps {
  username?: string;
  userRole?: string;
}

const OrderList = ({ username, userRole }: OrderListProps) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [currentCart, setCurrentCart] = useState<number[]>([]);
  const navigate = useNavigate();
  const isAdmin = userRole === 'admin';
  const orderService = new OrderService();
  const cartService = new CartService();

  const getOrders = async () => {
    const orders = await orderService.getOrders();
    if (orders) {
      setOrders(orders);
    }
    console.log(orders);
  };

  const editOrder = (id: number) => async () => {
    navigate('order', { state: { id } });
  };

  const renderButton = (row: OrderData) => {
    if (isAdmin) {
      return (
        <Button sx={{ mr: 2 }} variant="contained" onClick={editOrder(row.id)}>
          <Edit />
        </Button>
      );
    }
    const isInCart = currentCart.includes(row.id);
    return isInCart ? (
      <Button variant="contained" endIcon={<AddIcon />} disabled>
        W koszyku
      </Button>

    ) : (
      <Button variant="contained" endIcon={<AddIcon />}>
        Dodaj
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
          >
            {isAdmin && (
            <Button variant="contained" endIcon={<AddIcon />} sx={{ ml: 'auto' }} onClick={() => { navigate('order'); }}>
              Dodaj nowy pojazd
            </Button>
            )}
          </div>

        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Numer zamówienia</TableCell>
                <TableCell align="right">Number zamówienia</TableCell>
                <TableCell align="right">Cena</TableCell>
                <TableCell align="right">Cena</TableCell>
                <TableCell align="right">Kraj produkcji</TableCell>
                <TableCell align="right">Ilość dostępnych pojazdów</TableCell>
                <TableCell align="right">{isAdmin ? 'Opcje' : 'Dodaj do koszyka'}</TableCell>
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
                  <TableCell align="right">{row.totalPrice}</TableCell>
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
