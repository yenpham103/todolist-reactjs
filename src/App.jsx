import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import ProtectedRoute from "./components/routers/ProtectedRoute";
import Todo from "./components/Todo";
import Login from "./components/Login";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <div className=" mx-auto w-full bg-gradient-to-r from-red-500 flex items-center justify-center p-12">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<ProtectedRoute element={Todo} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
