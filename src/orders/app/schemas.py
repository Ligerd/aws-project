from typing import List, Optional

from pydantic import BaseModel


class OrderBase(BaseModel):
    customerId: int
    orderedProducts: list[int]
    totalPrice: float


class OrderCreate(OrderBase):
    pass


class Order(OrderCreate):
    id: int

    class Config:
        orm_mode = True
