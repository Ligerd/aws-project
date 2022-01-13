import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ProductService from '../../services/productService/productService';
import './productPage.css';

export interface ProductPageProps {
  productId?: number,
}

const ProductPage = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [subtype, setSubtype] = useState('');
  const [price, setPrice] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [totalQuantitySold, setTotalQuantitySold] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location?.state?.id;
  const productService = new ProductService();

  const handleChange = (setFun: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFun(event.target.value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const product = await productService.getProduct(productId);
        if (product) {
          setName(product.name);
          setType(product.type);
          setSubtype(product.subtype);
          setPrice(product.price.toString());
          setQuantityInStock(product.quantityInStock.toString());
          setTotalQuantitySold(product.totalQuantitySold.toString());
          setManufacturer(product.manufacturer);
        }
      }
    };
    fetchProduct();
  }, []);

  const productButtonOnClick = async () => {
    const response = productId ? await productService.editProduct(productId, {
      name,
      type,
      subtype,
      price: parseInt(price, 10),
      quantityInStock: parseInt(quantityInStock, 10),
      totalQuantitySold: parseInt(totalQuantitySold, 10),
      manufacturer,
    }) : await productService.addProduct({
      name,
      type,
      subtype,
      price: parseInt(price, 10),
      quantityInStock: parseInt(quantityInStock, 10),
      totalQuantitySold: parseInt(totalQuantitySold, 10),
      manufacturer,
    });
    if (response) {
      navigate('/');
    }
  };

  return (
    <div style={{ width: '100%', alignItems: 'center' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >

        <h3>Parametry pojazdu:</h3>
        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="product">Marka</InputLabel>
          <Input id="product" value={name} onChange={handleChange(setName)} className="inp" />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Model</InputLabel>
          <Input id="password" type="text" value={type} onChange={handleChange(setType)} className="inp" />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Rodzaj pojazdu</InputLabel>
          <Input id="password" type="text" value={subtype} onChange={handleChange(setSubtype)} className="inp" />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Cena</InputLabel>
          <Input id="password" type="number" value={price} onChange={handleChange(setPrice)} className="inp" />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Ilość dostępnych pojazdów</InputLabel>
          <Input id="password" type="number" value={quantityInStock} onChange={handleChange(setQuantityInStock)} className="inp" />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Całkowita liczba sprzedanych pojazdów</InputLabel>
          <Input id="password" type="number" value={totalQuantitySold} onChange={handleChange(setTotalQuantitySold)} className="inp" />
        </FormControl>

        <FormControl variant="standard" margin="dense">
          <InputLabel htmlFor="password">Kraj pochodzenia</InputLabel>
          <Input id="password" type="text" value={manufacturer} onChange={handleChange(setManufacturer)} className="inp" />
        </FormControl>

        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={productButtonOnClick}>{productId ? 'Edytuj pojazd' : 'Dodaj pojazd'}</Button>
          </Stack>
        </Box>

      </div>
    </div>
  );
};

export default ProductPage;
