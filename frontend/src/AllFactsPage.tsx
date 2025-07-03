import { useEffect, useState } from "react";

interface CatFactObj{
    id: number
    fact: string
    created_at: string
}

const AllFactsPage = () => {
    const [data, setData] = useState<CatFactObj[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchRandomFact = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8000/catfacts/");
        if (!response.ok) throw new Error("Failed to fetch all cat facts");
        const data: CatFactObj[] = await response.json();
        setData(data);
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
        {loading && <h2>Loading...</h2>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && (
            <div>
              <h3>Here Are All Cat Facts We Have Stored:</h3>
                <ul>
                  {data.map((obj) => (
                          <li>{obj.fact}</li>
                      ))
                  }
              </ul>
            </div>

        )}
      </div>
    );
}

export default AllFactsPage;