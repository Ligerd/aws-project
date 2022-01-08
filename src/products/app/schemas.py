from typing import List, Optional

from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str


class ProductSearch(ProductBase):
    pass


class ProductCreate(ProductBase):
    type: str
    subtype: str
    price: float
    quantityInStock: int
    totalQuantitySold: int
    manufacturer: str


class Product(ProductCreate):
    id: int

    class Config:
        orm_mode = True
