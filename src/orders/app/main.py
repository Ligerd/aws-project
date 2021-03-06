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
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World!"}

@app.get("/orders/", response_model=List[schemas.Order])
def read_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    orders = crud.get_orders(db, skip=skip, limit=limit)
    return orders

@app.get("/orders/{order_id}", response_model=schemas.Order)
def read_order(order_id: int, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    order = crud.get_order(db, order_id=order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@app.delete("/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    return crud.delete_order(db, order_id=order_id)

@app.post("/orders/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    return crud.create_order(db=db, order=order)

@app.put("/orders/{order_id}", response_model=schemas.OrderCreate)
async def update_order(order_id: int, order: schemas.OrderCreate, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    crud.update_order(db=db, order_id=order_id, order=order)
    return order
