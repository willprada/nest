from sqlalchemy.orm import Session

from . import models, schemas


def get_website_by_url(db: Session, url: str):
    return db.query(models.Website).filter(models.Website.url == url).first()


def  get_website(db: Session, id: int):
    return db.query(models.Website).filter(models.Website.id == id).first()


def get_websites(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Website).offset(skip).limit(limit).all()


def create_website(db: Session, website: schemas.WebsiteCreate):
    db_website = models.Website(
        url=website.url,
        description=website.description,
        icon_url=website.icon_url,
        scraped=website.scraped
    )
    db.add(db_website)
    db.commit()
    db.refresh(db_website)

    return db_website
