from typing import List

from .utils import AuthHandler
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)
auth_handler = AuthHandler()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root(user=Depends(auth_handler.auth_wrapper)):
    return {"Hello": "World!"}


@app.get("/carts/", response_model=schemas.Cart)
def get_cart(db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    customer_id = user.get("user_id")
    cart = crud.get_cart_by_customer_id(db, customer_id=customer_id)
    if cart is None:
        cart = {"customerId": customer_id, "orderedProducts": [], "totalPrice": 0.0}
        cart = schemas.CartCreate(**cart)
        return crud.create_cart(db=db, cart=cart)
    return cart


@app.put("/carts/products/{product_id}", response_model=schemas.CartCreate)
async def add_product_to_cart(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(auth_handler.auth_wrapper),
):
    customer_id = user.get("user_id")
    cart = crud.get_cart_by_customer_id(db, customer_id=customer_id)
    if cart is None:
        cart = {"customerId": customer_id, "orderedProducts": [], "totalPrice": 0.0}
        cart = schemas.CartCreate(**cart)
        return crud.create_cart(db=db, cart=cart)
    else:
        return crud.add_product_to_cart_by_customer_id(
            db=db, customer_id=customer_id, product_id=product_id, cart=cart
        )


@app.delete("/carts/")
def clear_cart(db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    customer_id = user.get("user_id")
    return crud.clear_cart_by_customer_id(db, customer_id=customer_id)
