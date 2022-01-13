from sqlalchemy.orm import Session
from . import models, schemas

def get_cart_by_customer_id(db: Session, customer_id: int):
    return db.query(models.Cart).filter(models.Cart.customerId == customer_id).first()

def create_cart(db: Session, cart: schemas.CartCreate):
    cart = models.Cart(**cart.dict())
    db.add(cart)
    db.commit()
    db.refresh(cart)
    return cart

def update_cart_by_customer_id(db: Session, customer_id: int, cart: schemas.CartCreate):
    db.query(models.Cart).filter(models.Cart.customerId == customer_id).update(cart.__dict__)
    db.commit()
    return cart

def add_product_to_cart_by_customer_id(db: Session, customer_id: int, product_id: int, cart: schemas.CartCreate):
    product_price = get_product(db, product_id).price
    cart = schemas.CartCreate(**cart.__dict__)
    cart.orderedProducts.append(product_id)
    cart.totalPrice += product_price
    db.query(models.Cart).filter(models.Cart.customerId == customer_id).update(cart.__dict__)
    db.commit()
    return cart

def clear_cart_by_customer_id(db: Session, customer_id: int):
    cart = get_cart_by_customer_id(db, customer_id=customer_id)
    cart = schemas.CartCreate(**cart.__dict__)
    cart.orderedProducts = []
    cart.totalPrice = 0.0
    db.query(models.Cart).filter(models.Cart.customerId == customer_id).update(cart.__dict__)
    db.commit()
    return cart

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()