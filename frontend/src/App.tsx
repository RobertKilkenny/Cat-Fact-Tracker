import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import AllFactsPage from "./AllFactsPage";
import NewFactPage from "./NewFactPage";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
            <h1>Cat Facts</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/facts">All Facts</Link></li>
            <li><Link to="/new">Add Fact</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/facts" element={<AllFactsPage />} />
            <Route path="/new" element={<NewFactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
