import { useState } from "react";

const NewFactsPage = () => {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (!fact.trim()) {
      setError("Fact cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/catfacts", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ fact }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to submit fact");
      }

      setSuccessMsg(data.message || "Fact submitted successfully!");
      setFact("");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Submit a New Cat Fact</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={fact}
          onChange={(e) => setFact(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Enter your cat fact here..."
          disabled={loading}
          style={{ resize: "vertical" }}
        />
        <br />
        <button type="submit" disabled={loading} style={{ marginTop: "1rem" }}>
          {loading ? "Submitting..." : "Submit Fact"}
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {successMsg && <p style={{ color: "green", marginTop: "1rem" }}>{successMsg}</p>}
    </div>
  );
};

export default NewFactsPage;
