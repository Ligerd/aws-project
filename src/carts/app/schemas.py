from typing import List, Optional

from pydantic import BaseModel


class CartBase(BaseModel):
    customerId: int
    orderedProducts: list
    totalPrice: float


class CartCreate(CartBase):
    pass


class Cart(CartCreate):
    id: int

    class Config:
        orm_mode = True
