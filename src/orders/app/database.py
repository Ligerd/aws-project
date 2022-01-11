from sqlalchemy import create_engine

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker
import os

SQLALCHEMY_DATABASE_URL = f"postgresql://webshopadmin@webshopsuper:{os.getenv('POSTGRES_PASSWORD')}@webshopsuper.postgres.database.azure.com:5432/online_shope"
engine = create_engine(
    # SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    SQLALCHEMY_DATABASE_URL, connect_args={'sslmode':'require'}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
