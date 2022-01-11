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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductService from '../../services/productService/productService';
import { ProductData } from '../../services/productService/productServiceInterfaces';
import './productList.css';
import CartService from '../../services/cartService/cartService';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';

export interface ProductListProps {
  username?: string;
  userRole?: string;
}

const ProductList = ({ username, userRole }: ProductListProps) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [currentCart, setCurrentCart] = useState<number[]>([]);
  const navigate = useNavigate();
  const isAdmin = userRole === 'admin';
  const productService = new ProductService();
  const cartService = new CartService();

  const getProducts = async () => {
    const products = await productService.getProducts();
    if (products) {
      setProducts(products);
    }
    console.log(products);
  };

  const getCart = async () => {
    const cart = await cartService.getCart();
    if (cart?.orderedProducts) {
      setCurrentCart(cart.orderedProducts);
    }
    console.log(cart);
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  const addToCart = (id: number) => async () => {
    const response = await cartService.addToCart(id);
    if (response) {
      console.log(response);
      setCurrentCart(response.orderedProducts);
    }
  };

  const editProduct = (id: number) => async () => {
    navigate('product', { state: { id } });
  };

  const removeProduct = (id: number) => async () => {
    const response = await productService.removeProduct(id);
    if (response) {
      getProducts();
      // setCurrentCart(response.orderedProducts);
    }
  };

  const renderButton = (row: ProductData) => {
    if (isAdmin) {
      return (
        <>
          <Button sx={{ mr: 2 }} variant="contained" onClick={editProduct(row.id)}>
            <Edit />
          </Button>
          <Button variant="contained" onClick={removeProduct(row.id)}>
            <Delete />
          </Button>

        </>
      );
    }
    const isInCart = currentCart.find((elem) => elem === row.id);
    return isInCart ? (
      <Button variant="contained" disabled>
        W koszyku
      </Button>

    ) : (
      <Button variant="contained" onClick={addToCart(row.id)} endIcon={<AddIcon />}>
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
          <h3 style={{ flex: 1 }}>Lista dostępnych pojazdów:</h3>
          <div style={{
            flex: 1, justifyContent: 'flex-end', flexDirection: 'row', display: 'flex',

          }}
          >
            {isAdmin ? (
              <Button variant="contained" endIcon={<AddIcon />} sx={{ ml: 'auto' }} onClick={() => { navigate('product'); }}>
                Dodaj nowy pojazd
              </Button>
            ) : (
              <Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{ ml: 'auto' }} onClick={() => { navigate('cart'); }}>
                Przejdź do koszyka
              </Button>
            )}
          </div>

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
                <TableCell align="right">Ilość dostępnych pojazdów</TableCell>
                <TableCell align="right">{isAdmin ? 'Opcje' : 'Dodaj do koszyka'}</TableCell>
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
                  <TableCell align="right">{row.quantityInStock}</TableCell>
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

export default ProductList;
