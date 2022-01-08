from sqlalchemy.orm import Session
from . import models, schemas


def get_delivery(db: Session, delivery_id: int):
    return db.query(models.Delivery).filter(models.Delivery.id == delivery_id).first()


def get_deliveries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Delivery).offset(skip).limit(limit).all()


def create_delivery(db: Session, delivery: schemas.DeliveryCreate):
    delivery = models.Delivery(**delivery.dict())
    db.add(delivery)
    db.commit()
    db.refresh(delivery)
    return delivery


def delete_delivery(db: Session, delivery_id: int):
    delivery = (
        db.query(models.Delivery).filter(models.Delivery.id == delivery_id).first()
    )
    db.delete(delivery)
    db.commit()
    return True


def update_delivery(db: Session, delivery_id: int, delivery: schemas.DeliveryCreate):
    db.query(models.Delivery).filter(models.Delivery.id == delivery_id).update(
        delivery.__dict__
    )
    db.commit()
    return delivery
