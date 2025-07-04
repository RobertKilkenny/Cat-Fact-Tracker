import { useState } from "react";

type SuccessResponse = { message: string, detail: null};
type ErrorResponse = { detail: string, message: null };

const NewFactsPage = () => {
  const [fact, setFact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Added to avoid @typescript-eslint/no-misused-promises issue
  const onSubmit = (e: React.FormEvent) => {
    void handleSubmit(e);
  };

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

      const data = await response.json() as SuccessResponse | ErrorResponse;

      if (!response.ok) {
        throw new Error(data.detail || "Failed to submit fact");
      }

      setSuccessMsg(data.message || "Fact submitted successfully!");
      setFact("");
    } catch (err) {
        if (err instanceof Error) {
          setError(`Unable to save cat fact. Try again.\nError: ${err.message}`);
        } else {
          setError("Unable to save cat fact. Try again.\nUnknown error.");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <h3>Submit a New Cat Fact</h3>
      <form onSubmit={onSubmit}>
        <textarea
          value={fact}
          onChange={(e) => { setFact(e.target.value); }}
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
