from sqlalchemy.orm import Session
from . import models, schemas

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100, name: str = ""):
    return db.query(models.Product).filter(models.Product.name.contains(name)).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    product = models.Product(**product.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    db.delete(product)
    db.commit()
    return True

def update_product(db: Session, product_id: int, product: schemas.ProductCreate):
    db.query(models.Product).filter(models.Product.id == product_id).update(product.__dict__)
    db.commit()
    return product
