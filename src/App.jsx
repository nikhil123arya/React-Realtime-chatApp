import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import PrivateRoutes from "./components/PrivateRoutes";
import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>

          <Route path="/" element={<Room />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
