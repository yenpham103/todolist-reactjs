import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("apiKey");
    navigate("/login");
  };
  return (
    <div
      className="mt-8 p-2 w-40 flex items-center justify-center text-xl font-bold border-2 border-red-500 rounded-lg text-red-500 cursor-pointer hover:opacity-80"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
}

export default Logout;
