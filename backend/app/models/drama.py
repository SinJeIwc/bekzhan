import uuid
from datetime import UTC, datetime
from enum import Enum

from sqlalchemy import DateTime
from sqlmodel import JSON, Column, Field, SQLModel


class DramaStatus(str, Enum):
    watching = "watching"
    completed = "completed"
    dropped = "dropped"
    planned = "planned"


class DramaGenre(str, Enum):
    romance = "Romance"
    comedy = "Comedy"
    drama = "Drama"
    action = "Action"
    thriller = "Thriller"
    mystery = "Mystery"
    fantasy = "Fantasy"
    historical = "Historical"
    xianxia = "Xianxia"
    melodrama = "Melodrama"
    school = "School"
    office = "Office"
    sports = "Sports"
    medical = "Medical"
    legal = "Legal"
    crime = "Crime"
    reality_show = "Reality show"
    supernatural = "Supernatural"
    military = "Military"
    time_travel = "Time travel"
    reincarnation = "Reincarnation"


class DramaCountry(str, Enum):
    korea = "Korea"
    china = "China"
    japan = "Japan"
    taiwan = "Taiwan"


class DramaBase(SQLModel):
    title: str
    original_title: str | None = None
    poster_path: str | None = None
    description: str
    review: str | None = None
    rating: float = Field(ge=0, le=10)
    status: DramaStatus
    genres: list[DramaGenre] = Field(default_factory=list, sa_column=Column(JSON))
    year: int
    episodes_aired: int | None = None
    episodes_total: int | None = None
    country: DramaCountry


class Drama(DramaBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        sa_column=Column(
            DateTime(timezone=True),
            nullable=False,
            onupdate=lambda: datetime.now(UTC),
        ),
    )


class DramaCreate(DramaBase):
    pass


class DramaPublic(DramaBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
