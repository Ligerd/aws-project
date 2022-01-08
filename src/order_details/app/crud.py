from sqlalchemy.orm import Session
from . import models, schemas

def get_order_details(db: Session, order_detail_id: int):
    return db.query(models.OrderDetails).filter(models.OrderDetails.id == order_detail_id).first()

def get_orders_details(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.OrderDetails).offset(skip).limit(limit).all()

def create_order_details(db: Session, order_details: schemas.OrderDetailsCreate):
    order_details_result = models.OrderDetails(**order_details.dict())
    db.add(order_details_result)
    db.commit()
    db.refresh(order_details_result)
    return order_details_result

def delete_order_details(db: Session, order_details_id: int):
    order_details = db.query(models.OrderDetails).filter(models.OrderDetails.id == order_details_id).first()
    db.delete(order_details)
    db.commit()
    return True

def update_order_details(db: Session, order_details_id: int, order_details: schemas.OrderDetailsCreate):
    db.query(models.OrderDetails).filter(models.OrderDetails.id == order_details_id).update(order_details.__dict__)
    db.commit()
    return order_details
