import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import AllFactsPage from "./AllFactsPage";
import NewFactPage from "./NewFactPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="page-container">
        <nav>
            <h1>Cat Facts</h1>
            <Link to="/">Home</Link>
            <Link to="/facts">All Facts</Link>
            <Link to="/new">Add Fact</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/facts" element={<AllFactsPage />} />
            <Route path="/new" element={<NewFactPage />} />
          </Routes>
        </main>
        <footer><p>All facts are pulled from the website <a href="https://catfact.ninja/fact">catfact.ninja</a></p></footer>
      </div>
    </Router>
  );
};

export default App;
