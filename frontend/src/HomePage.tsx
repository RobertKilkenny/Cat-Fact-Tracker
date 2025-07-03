import { useEffect, useState } from "react";

const HomePage = () => {
  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/catfacts/random");
      if (!response.ok) throw new Error("Failed to fetch random fact");
      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError("Unable to load cat fact. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomFact();
  }, []);

  return (
    <div>
      <h3>Here is a Random Cat Fact:</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fact && (
        <div>
          <p style={{ fontSize: "1.2rem" }}>{fact}</p>
          <button onClick={fetchRandomFact} style={{ marginTop: "1rem" }}>
            🔁 Get Another Fact
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
