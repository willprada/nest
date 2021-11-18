from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .database import Base


Reference = Table(
    "references",
    Base.metadata,
    Column("referrer_id", Integer, ForeignKey("websites.id"), primary_key=True),
    Column("referral_id", Integer, ForeignKey("websites.id"), primary_key=True)
)


class Website(Base):
    __tablename__ = "websites"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    description = Column(String)
    icon_url = Column(String)
    scraped = Column(Boolean, index=True)
    referrals = relationship(
        "Website",
        secondary=Reference,
        primaryjoin=id==Reference.c.referrer_id,
        secondaryjoin=id==Reference.c.referral_id,
        backref="referrers"
    )
