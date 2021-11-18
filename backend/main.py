from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/websites/", response_model=List[schemas.Website])
def read_websites(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_websites(db, skip, limit)


@app.get("/websites/{website_id}/", response_model=schemas.Website)
def read_website(website_id: int, db: Session = Depends(get_db)):
    db_website = crud.get_website(db, id=website_id)
    if db_website is None:
        raise HTTPException(status_code=404, detail="Website not registered")
    return db_website


@app.post("/websites/", response_model=schemas.Website)
def create_website(website: schemas.WebsiteCreate, db: Session = Depends(get_db)):
    db_website = crud.get_website_by_url(db, url=website.url)
    if db_website:
        raise HTTPException(status_code=400, detail="Website url already on database")
    return crud.create_website(db=db, website=website)
