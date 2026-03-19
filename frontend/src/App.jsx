// React Router v6: BrowserRouter wraps the app so any component can use
// hooks like useNavigate and useParams. Routes maps URL paths to pages.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*
          :id is a dynamic segment — GamePage reads it with useParams()
          to know which game to display.
        */}
        <Route path="/fanta/:id" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
