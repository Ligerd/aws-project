from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, ARRAY
from sqlalchemy.orm import relationship

from .database import Base


class Delivery(Base):
    __tablename__ = "Delivery"

    id = Column(Integer, primary_key=True, index=True)
    orderId = Column(Integer, index=True)
    city = Column(String, index=True)
    postCode = Column(String, index=True)
    street = Column(String, index=True)
    houseNumber = Column(String, index=True)
