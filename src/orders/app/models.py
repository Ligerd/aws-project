from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, ARRAY
from sqlalchemy.orm import relationship

from .database import Base

class Order(Base):
    __tablename__ = "Orders"

    id = Column(Integer, primary_key=True, index=True)
    customerId = Column(Integer, index=True)
    orderedProducts = Column(ARRAY(Integer), index=True)
    totalPrice = Column(Float, index=True)

