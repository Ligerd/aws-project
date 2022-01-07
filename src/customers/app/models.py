from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from .database import Base

class Customer(Base):
    __tablename__ = "Customer"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    surname = Column(String, index=True)
    location = Column(String, index=True)
    contact = Column(String, index=True)
    password = Column(String, index=True)
