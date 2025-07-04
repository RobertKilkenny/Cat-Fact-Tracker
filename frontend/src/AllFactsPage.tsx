import { useEffect, useState } from "react";

// Data shape expected for API call
interface CatFactObj{
    id: number
    fact: string
    created_at: string
}

const AllFactsPage = () => {
    const [data, setData] = useState<CatFactObj[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchFacts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Connect to FastAPI using localhost:8000 for demo (see `backend/main.py` for all API calls)
        const response = await fetch("http://localhost:8000/catfacts/");
        if (!response.ok) throw new Error("Failed to fetch all cat facts");
        const data = await response.json() as CatFactObj[];
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Unable to load cat fact. Try again.\nError: ${err.message}`);
        } else {
          setError("Unable to load cat fact. Try again.\nUnknown error.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    
    useEffect(() => {
      fetchFacts().catch(() => {});
    }, []);
  
    return (
      <div className="page-content">
        {loading && <h2>Loading...</h2>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        { // When the data loads, display it as a simple list with all of the fact (Not showing date saved to database currently)
        data && (
            <div>
              <h3>Here Are All Cat Facts We Have Stored:</h3>
                <ul>
                  {data.map((obj) => (
                          <li key={obj.id}>{obj.fact}</li>
                      ))
                  }
              </ul>
            </div>

        )}
      </div>
    );
}

export default AllFactsPage;