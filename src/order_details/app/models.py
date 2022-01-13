from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import DateTime

from .database import Base

class OrderDetails(Base):
    __tablename__ = "OrderDetails"

    id = Column(Integer, primary_key=True, index=True)
    orderId = Column(Integer, index=True)
    orderDate = Column(DateTime, index=True)
    shipmentDate = Column(DateTime, index=True)
    shipmentStatus = Column(String, index=True)

