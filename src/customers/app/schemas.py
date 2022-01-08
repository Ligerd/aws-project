from typing import List, Optional

from pydantic import BaseModel

class CustomerBase(BaseModel):
    name: str
    surname: str
    location: str
    contact: str
    password: str
    role: str


class CustomerSearch(CustomerBase):
    pass


class CustomerCreate(CustomerBase):
    pass


class Customer(CustomerBase):
    id: int

    class Config:
        orm_mode = True


class AuthDetails(BaseModel):
    name: str
    password: str


class AuthReturn(BaseModel):
    token: str


class CustomerFront(BaseModel):
    name: str
    surname: str
    location: str
    contact: str
    role: str
