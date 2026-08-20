from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

class FantaAnything(BaseModel):
    title: str
    deadline: datetime

@app.post("/fanta")
def create_fanta(fanta: FantaAnything):
    # per ora stampiamo solo sul terminale
    print(f"Creando FantaAnything: {fanta}")
    return {"id": 1, "title": fanta.title, "deadline": fanta.deadline}