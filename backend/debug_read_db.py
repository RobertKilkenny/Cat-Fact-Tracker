import sqlite3
from db import init_db, DB_PATH

def get_all_facts():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT fact, created_at FROM cat_facts ORDER BY created_at DESC, id DESC")
    rows = cursor.fetchall()
    conn.close()
    return rows  # List of tuples: (fact, created_at)

if __name__ == "__main__":
    init_db()
    facts = get_all_facts()
    if facts:
        count = 1
        print("Stored cat facts:")
        for fact, created_at in facts:
            print(f"{count}. [{created_at}] {fact}")
            count += 1
    else:
        print("No facts found in the database.")
