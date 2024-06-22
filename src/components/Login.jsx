import { useState } from "react";
// import { SERVER_API } from "./api";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { getApiKey } from "./libs/todoServer";
function Login() {
  const [form, setForm] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage("apiKey", null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey) {
      setLoading(true);
      try {
        const token = await getApiKey(form.email);
        if (token) {
          setApiKey(token);
          console.log(token);
          navigate("/todo", { state: { apiKey: token } });
        }
      } catch (error) {
        alert("Vui lòng nhập đúng email !");
        console.error("Error in handleSubmit:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  //   const inputRef = useRef();
  // const getApiKey = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${SERVER_API}/api-key?email=${form.email}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch API key");
  //     }
  //     const data = await response.json();
  //     const { apiKey } = data.data;
  //     setApiKey(apiKey);
  //     navigate("/todo", { state: { apiKey } });
  //   } catch (error) {
  //     alert("Vui lòng nhập đúng email !");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex items-center flex-col gap-6">
      <h1 className="text-4xl font-bold text-red-700">Login</h1>
      <form action="" className="flex items-center " onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="example@gmale.com"
          className="w-[400px] h-12 border-2 border-red-200 outline-none p-3 rounded-lg"
          value={form.email}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button className="w-[100px] h-12 py-2 px-4 bg-red-500 hover:bg-red-700 text-white border-2 rounded-lg">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
