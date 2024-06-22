import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/routers/ProtectedRoute";
// import { useContext } from "react";
// import { ProviderContext } from "./store/Provider";
import Todo from "./components/Todo";
import Login from "./components/Login";

function App() {
  // const { state, dispatch } = useContext(ProviderContext);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-red-500 flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<ProtectedRoute element={Todo} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
