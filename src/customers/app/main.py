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
    return {"Hello": "World!"}

@app.get("/customers/", response_model=List[schemas.Customer])
def read_customers(skip: int = 0, limit: int = 100, name: str = "", db: Session = Depends(get_db)):
    customers = crud.get_customers(db, skip=skip, limit=limit, name=name)
    return customers

@app.get("/customers/{customer_id}", response_model=schemas.Customer)
def read_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = crud.get_customer(db, customer_id=customer_id)
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    return crud.delete_customer(db, customer_id=customer_id)

@app.post("/customers/", response_model=schemas.Customer)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.create_customer(db=db, customer=customer)
# {
#     "name": "testName", 
#     "type": "testType",
#     "subtype": "testSubtype", 
#     "price": 999.99, 
#     "quantityInStock": 100, 
#     "totalQuantitySold": 11, 
#     "manufacturer": "Mercedes"
# }

@app.put("/customers/{customer_id}", response_model=schemas.CustomerCreate)
async def update_customer(customer_id: int, customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    crud.update_customer(db=db, customer_id=customer_id, customer=customer)
    return customer
