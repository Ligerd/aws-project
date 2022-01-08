from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, ARRAY
from sqlalchemy.orm import relationship

from .database import Base

class Cart(Base):
    __tablename__ = "Carts"

    id = Column(Integer, primary_key=True, index=True)
    customerId = Column(Integer, index=True)
    orderedProducts = Column(ARRAY(Integer), index=True)
    totalPrice = Column(Float, index=True)

class Product(Base):
    __tablename__ = "Products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String, index=True)
    subtype = Column(String, index=True)
    price = Column(Float, index=True)
    quantityInStock = Column(Integer, index=True)
    totalQuantitySold = Column(Integer, index=True)
    manufacturer = Column(String, index=True)

