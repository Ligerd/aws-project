from typing import List
from .utils import AuthHandler
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
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
    return {"Hello": "It's delivery service!"}


@app.get("/deliveries/", response_model=List[schemas.Delivery])
def read_deliveres(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    deliveries = crud.get_deliveries(db, skip=skip, limit=limit)
    return deliveries


@app.get("/deliveries/{deliveres_id}", response_model=schemas.Delivery)
def read_delivery(delivery_id: int, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    delivery = crud.get_delivery(db, delivery_id=delivery_id)
    if delivery is None:
        raise HTTPException(status_code=404, detail="Delivery not found")
    return delivery


@app.delete("/deliveries/{delivery_id}")
def delete_delivery(delivery_id: int, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    return crud.delete_delivery(db, delivery_id=delivery_id)


@app.post("/deliveries/", response_model=schemas.Delivery)
def create_delivery(delivery: schemas.DeliveryCreate, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    return crud.create_delivery(db=db, delivery=delivery)


@app.put("/deliveries/{delivery_id}", response_model=schemas.DeliveryCreate)
async def update_delivery(
    delivery_id: int, delivery: schemas.DeliveryCreate, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)
):
    crud.update_delivery(db=db, delivery_id=delivery_id, delivery=delivery)
    return delivery
