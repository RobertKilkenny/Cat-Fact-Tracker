import random
import sqlite3
from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.db import DB_PATH

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CatFact(BaseModel):
    """Data model representing a cat fact entry, inherits from BaseModel so it is sent as a JSON response.

    Attributes:
        id (int): Unique identifier for the cat fact.
        fact (str): The cat fact text.
        created_at (str): Date when the fact was added (YYYY-MM-DD).
    """
    id: int
    fact: str
    created_at: str

def get_db_connection():
    """Connects the program to the cat facts database.

    Returns:
        Connection: Returns live connection to the database.
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/catfacts", response_model=list[CatFact])
def read_all_catfacts():
    """Returns all saved cat facts pulled from the website.

    Returns:
        list[CatFact]: A list of all cat facts represented as CatFact objects.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, fact, created_at FROM cat_facts ORDER BY created_at DESC, id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [CatFact(**row) for row in map(dict, rows)]

@app.get("/catfacts/random")
def read_random_catfact():
    """Returns a random cat fact from the database.

    Raises:
        HTTPException: If no cat facts are available (404 error).

    Returns:
        dict: A dictionary with a single key 'fact' containing the random cat fact.
              Example: {"fact": "Cats can rotate their ears 180 degrees."}
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT fact FROM cat_facts")
    facts = [row["fact"] for row in cursor.fetchall()]
    conn.close()
    if not facts:
        raise HTTPException(status_code=404, detail="No cat facts available")
    fact = random.choice(facts)
    return {"fact": fact}

@app.post("/catfacts")
def create_catfact(fact: str = Form(...)):
    """Adds a cat fact to the database
    
    Args:
        fact (str): The fact text submitted via form field.

    Raises:
        HTTPException: If the fact is empty (400 error).

    Returns:
        dict: A dictionary with a single key 'message' containing the result of the function.
              Example: {"message": "Fact inserted successfully."}
    """
    fact = fact.strip()
    if not fact:
        raise HTTPException(status_code=400, detail="Fact cannot be empty")

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO cat_facts (fact) VALUES (?)", (fact,))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return {"message": "Duplicate fact, not inserted."}

    conn.close()
    return {"message": "Fact inserted successfully."}
