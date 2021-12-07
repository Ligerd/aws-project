from sqlalchemy.orm import Session
from . import models, schemas


def get_customer(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).first()


def get_customers(db: Session, skip: int = 0, limit: int = 100, name: str = ""):
    return db.query(models.Customer).filter(models.Customer.name.contains(name)).offset(skip).limit(limit).all()


def create_customer(db: Session, customer: schemas.CustomerCreate):
    customer = models.Customer(**customer.dict())
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer


def delete_customer(db: Session, customer_id: int):
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    db.delete(customer)
    db.commit()
    return True


def update_customer(db: Session, customer_id: int, customer: schemas.CustomerCreate):
    db.query(models.Customer).filter(models.Customer.id == customer_id).update(customer.__dict__)
    db.commit()
    return customer
