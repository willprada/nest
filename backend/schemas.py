from typing import List, Optional, ForwardRef

from pydantic import BaseModel


class WebsiteBase(BaseModel):
    url: str
    description: Optional[str] = None
    icon_url: Optional[str] = None
    scraped: bool = False


class WebsiteCreate(WebsiteBase):
    pass


Website = ForwardRef('Website')


class Website(WebsiteBase):
    id: int    
    referrals: List[Website] = []

    class Config:
        orm_mode = True


Website.update_forward_refs()
