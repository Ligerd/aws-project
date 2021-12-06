from typing import List
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder

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

@app.get("/products/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, name: str = "", db: Session = Depends(get_db)):
# def read_products(db: Session = Depends(get_db), name: Optional[str] = None):
    products = crud.get_products(db, skip=skip, limit=limit, name=name)
    return products

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product(db, product_id=product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    return crud.delete_product(db, product_id=product_id)

@app.post("/products/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db=db, product=product)
# {
#     "name": "testName", 
#     "type": "testType",
#     "subtype": "testSubtype", 
#     "price": 999.99, 
#     "quantityInStock": 100, 
#     "totalQuantitySold": 11, 
#     "manufacturer": "Mercedes"
# }

@app.put("/products/{product_id}", response_model=schemas.ProductCreate)
async def update_product(product_id: int, product: schemas.ProductCreate, db: Session = Depends(get_db)):
    crud.update_product(db=db, product_id=product_id, product=product)
    return product
