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

@app.get("/products/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, name: str = "", db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    products = crud.get_products(db, skip=skip, limit=limit, name=name)
    return products

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    product = crud.get_product(db, product_id=product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    if user.get("role") == "admin":
        return crud.delete_product(db, product_id=product_id)
    else:
        raise HTTPException(status_code=401, detail="Not Authorized")

@app.post("/products/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    if user.get("role") == "admin":
        return crud.create_product(db=db, product=product)
    else:
        raise HTTPException(status_code=401, detail="Not Authorized")
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
async def update_product(product_id: int, product: schemas.ProductCreate, db: Session = Depends(get_db), user=Depends(auth_handler.auth_wrapper)):
    print(user.get("role"))
    if user.get("role") == "admin":
        crud.update_product(db=db, product_id=product_id, product=product)
        return product
    else:
        raise HTTPException(status_code=401, detail="Not Authorized")
