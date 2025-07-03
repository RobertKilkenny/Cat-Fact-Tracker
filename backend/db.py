import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "cat_facts.db")

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cat_facts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fact TEXT UNIQUE,
            created_at DATE DEFAULT (DATE('now'))
        );
    """)
    conn.commit()
    conn.close()

def insert_fact(fact: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO cat_facts (fact) VALUES (?)", (fact,))
        conn.commit()
        print(f"✅ Inserted: {fact}")
    except sqlite3.IntegrityError:
        print(f"⚠️ Skipped duplicate: {fact}")
    finally:
        conn.close()
