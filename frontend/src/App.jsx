import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RoomsPage from "./pages/RoomsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
