from typing import List, Optional

from pydantic import BaseModel


class DeliveryBase(BaseModel):
    orderId: int
    city: str
    postCode: str
    street: str
    houseNumber: str


class DeliveryCreate(DeliveryBase):
    pass


class Delivery(DeliveryCreate):
    id: int

    class Config:
        orm_mode = True
