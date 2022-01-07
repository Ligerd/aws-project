from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Hello": "It's order details service"}


@app.get("/order_details/", response_model=List[schemas.OrderDetails])
def read_orders_details(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    orders_details = crud.get_orders_details(db, skip=skip, limit=limit)
    return orders_details


@app.get("/order_details/{order_detail_id}", response_model=schemas.OrderDetails)
def read_order(order_detail_id: int, db: Session = Depends(get_db)):
    order_detail = crud.get_order_details(db, order_detail_id=order_detail_id)
    if order_detail is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order_detail


@app.delete("/order_details/{order_details_id}")
def delete_order(order_details_id: int, db: Session = Depends(get_db)):
    return crud.delete_order_details(db, order_details_id=order_details_id)


@app.post("/order_details/", response_model=schemas.OrderDetails)
def create_order(order_details: schemas.OrderDetailsCreate, db: Session = Depends(get_db)):
    return crud.create_order_details(db=db, order_details=order_details)


@app.put("/order_details/{order_details_id}", response_model=schemas.OrderDetailsCreate)
async def update_order(
    order_details_id: int, order_details: schemas.OrderDetailsCreate, db: Session = Depends(get_db)
):
    crud.update_order_details(db=db, order_details_id=order_details_id, order_details=order_details)
    return order_details
