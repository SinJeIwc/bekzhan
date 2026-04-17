import uuid
from collections.abc import Sequence

from fastapi import APIRouter, HTTPException, status
from sqlmodel import select

from app.dependencies.session import SessionDep
from app.models.drama import Drama, DramaCreate, DramaPublic

router = APIRouter(prefix="/dramas", tags=["dramas"])


@router.get("/", response_model=list[DramaPublic])
def list_dramas(session: SessionDep) -> Sequence[Drama]:
    return session.exec(select(Drama)).all()


@router.get("/{drama_id}", response_model=DramaPublic)
def get_drama(drama_id: uuid.UUID, session: SessionDep) -> Drama:
    drama = session.get(Drama, drama_id)
    if drama is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Drama not found",
        )
    return drama


@router.post("/", response_model=DramaPublic, status_code=status.HTTP_201_CREATED)
def create_drama(data: DramaCreate, session: SessionDep) -> Drama:
    drama = Drama.model_validate(data)
    session.add(drama)
    session.commit()
    session.refresh(drama)
    return drama


@router.put("/{drama_id}", response_model=DramaPublic)
def update_drama(
    drama_id: uuid.UUID,
    data: DramaCreate,
    session: SessionDep,
) -> Drama:
    drama = session.get(Drama, drama_id)
    if drama is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Drama not found",
        )
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(drama, key, value)
    session.add(drama)
    session.commit()
    session.refresh(drama)
    return drama


@router.delete("/{drama_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_drama(drama_id: uuid.UUID, session: SessionDep) -> None:
    drama = session.get(Drama, drama_id)
    if drama is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Drama nor found",
        )
    session.delete(drama)
    session.commit()
