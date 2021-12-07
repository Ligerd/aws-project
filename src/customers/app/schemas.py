from typing import List, Optional

from pydantic import BaseModel


class CustomerBase(BaseModel):
    name: str


class CustomerSearch(CustomerBase):
    pass


class CustomerCreate(CustomerBase):
    name: str
    surname: str
    location: str
    contact: str


class Customer(CustomerCreate):
    id: int

    class Config:
        orm_mode = True
