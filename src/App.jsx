import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import OralHealth from "./pages/OralHealth";
import Chat from "./pages/Chat";
import Results from "./pages/Results";

import "./index.css";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <Link
          to="/"
          className="logo"
          style={{ textDecoration: "none" }}
        >
          🦷 AI Oral & TMJ
        </Link>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/assessment">
              TMJ Assessment
            </Link>
          </li>

          <li>
            <Link to="/oral-health">
              Oral Health
            </Link>
          </li>

          <li>
            <Link to="/chat">
              AI Assistant
            </Link>
          </li>

        </ul>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/assessment"
          element={<Assessment />}
        />

        <Route
          path="/oral-health"
          element={<OralHealth />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

      </Routes>

      <footer className="footer">
        <p>
          AI Oral & TMJ Assistant •
          Educational tool, not a diagnosis
        </p>
      </footer>

    </BrowserRouter>
  );
}

export default App;