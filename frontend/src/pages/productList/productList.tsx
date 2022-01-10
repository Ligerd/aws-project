import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ProductService from '../../services/productService/productService';
import { ProductData } from '../../services/productService/productServiceInterfaces';
import './productList.css';

const ProductList = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const productService = new ProductService();
  useEffect(() => {
    const login = async () => {
      const products = await productService.getProducts();
      if (products) {
        setProducts(products);
      }
      console.log(products);
    };

    login();
  }, []);

  const handleChange = (setFun: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFun(event.target.value);
  };

  return (
    <div style={{ width: '100%', alignItems: 'center' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >

        <h3>Lista dostępnych pojazdów:</h3>
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
                <TableCell align="right">Dodaj do koszyka</TableCell>
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
                    {' '}
                    <Button variant="contained" endIcon={<AddIcon />}>
                      Dodaj
                    </Button>
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
