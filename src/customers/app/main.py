from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine
from .utils import AuthHandler

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


auth_handler = AuthHandler()
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Hello": "It's user service. Pls log in"}


@app.get("/customers/", response_model=List[schemas.CustomerFront])
def read_customers(
    skip: int = 0,
    limit: int = 100,
    name: str = "",
    db: Session = Depends(get_db),
    user=Depends(auth_handler.auth_wrapper),
):
    customers = crud.get_customers(db, skip=skip, limit=limit, name=name)
    result = []
    for customer in customers:
        result.append(schemas.CustomerFront(**customer.__dict__))
    return result


@app.get("/customers/{customer_id}", response_model=schemas.CustomerFront)
def read_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    user=Depends(auth_handler.auth_wrapper),
):
    customer = crud.get_customer(db, customer_id=customer_id)
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return schemas.CustomerFront(**customer.__dict__)


@app.delete("/customers/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    user=Depends(auth_handler.auth_wrapper),
):
    return crud.delete_customer(db, customer_id=customer_id)


@app.post("/register/", response_model=schemas.CustomerFront)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    customer.password = auth_handler.get_password_hash(customer.password)
    customer = crud.create_customer(db=db, customer=customer)
    return schemas.CustomerFront(**customer.__dict__)


@app.put("/customers/{customer_id}", response_model=schemas.CustomerCreate)
async def update_customer(
    customer_id: int,
    customer: schemas.CustomerCreate,
    db: Session = Depends(get_db),
    user=Depends(auth_handler.auth_wrapper),
):

    print(customer.__dict__)
    customer.password = auth_handler.get_password_hash(customer.password)
    crud.update_customer(db=db, customer_id=customer_id, customer=customer)
    return customer


@app.post("/login", response_model=schemas.AuthReturn)
def login(auth_details: schemas.AuthDetails, db: Session = Depends(get_db)):
    user = crud.get_customer_by_name(db, auth_details.name)
    if (user is None) or (
        not auth_handler.verify_password(auth_details.password, user.password)
    ):
        raise HTTPException(status_code=401, detail="Invalid username and/or password")
    token = auth_handler.encode_token(user.id, user.role)
    return {"user_id": user.id, "token": token}
