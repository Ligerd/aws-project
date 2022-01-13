from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel


class OrderDetailsBase(BaseModel):
    orderId: int
    orderDate: datetime
    shipmentDate: datetime
    shipmentStatus: str


class OrderDetailsCreate(OrderDetailsBase):
    pass


class OrderDetails(OrderDetailsCreate):
    id: int

    class Config:
        orm_mode = True
