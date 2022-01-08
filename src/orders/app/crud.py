from sqlalchemy.orm import Session
from . import models, schemas

def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()

def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Order).offset(skip).limit(limit).all()

def create_order(db: Session, order: schemas.OrderCreate):
    order = models.Order(**order.dict())
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

def delete_order(db: Session, order_id: int):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    db.delete(order)
    db.commit()
    return True

def update_order(db: Session, order_id: int, order: schemas.OrderCreate):
    db.query(models.Order).filter(models.Order.id == order_id).update(order.__dict__)
    db.commit()
    return order
