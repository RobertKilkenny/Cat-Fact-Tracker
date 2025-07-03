import requests
from db import init_db, insert_fact

def fetch_cat_fact():
    """Goes to `https://catfact.ninja/fact` to get a cat fact from the website.

    Returns:
        str | None : Returns a string with the cat fact if successful or None if it fails 
    """
    response = requests.get("https://catfact.ninja/fact")
    if response.status_code == 200:
        return response.json().get("fact")
    return None

def fetch_and_store_facts(n=5):
    """Fetches and stores n number of facts from the website.

    Args:
        n (int, optional): The number of unique facts to fetch and store to the database. Defaults to 5.
    """
    init_db()
    seen = set()

    while len(seen) < n:
        fact = fetch_cat_fact()
        if fact and fact not in seen:
            seen.add(fact)
            insert_fact(fact)

if __name__ == "__main__":
    fetch_and_store_facts(5)
