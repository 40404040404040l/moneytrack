from datetime import date, datetime
from typing import Literal, Optional

from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class CategoryCreate(BaseModel):
    name: str


class CategoryResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class TransactionBase(BaseModel):
    amount: float
    type: Literal["income", "expense"]
    category_id: Optional[int] = None
    description: Optional[str] = None
    tx_date: date


class TransactionCreate(TransactionBase):
    pass


class TransactionResponse(TransactionBase):
    id: int
    created_at: datetime
    category_name: Optional[str] = None

    class Config:
        orm_mode = True


class AnalyticsSummary(BaseModel):
    income: float
    expense: float
    balance: float


class CategoryStat(BaseModel):
    name: str
    total: float


class TimelinePoint(BaseModel):
    date: date
    income: float
    expense: float
    net: float
