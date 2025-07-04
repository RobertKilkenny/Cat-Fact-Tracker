import { useEffect, useState } from "react";

const HomePage = () => {
  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomFact = async () => {
    setLoading(true);
    setError(null);
    try {
        // Connect to FastAPI using localhost:8000 for demo (see `backend/main.py` for all API calls)
      const response = await fetch("http://localhost:8000/catfacts/random");
      if (!response.ok) throw new Error("Failed to fetch random fact");

      // response, if not an error, will be in this shape
      const data = await response.json() as {"fact": string};
      setFact(data.fact);
    }catch (err) {
      if (err instanceof Error) {
        setError(`Unable to load cat a fact. Try again.\nError: ${err.message}`);
      } else {
        setError("Unable to load cat a fact. Try again.\nUnknown error.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Start with the page having a fact already
  useEffect(() => {
    void fetchRandomFact();
  }, []);


  // Added to avoid @typescript-eslint/no-misused-promises issue
  const handleClick = () => {
    void fetchRandomFact();
  };

  
  return (
    <div className="page-content">
      <h3>Here is a Random Cat Fact:</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fact && (
        <div>
          <p>{fact}</p>
          <button onClick={handleClick}>
            🔁 Get Another Fact
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
