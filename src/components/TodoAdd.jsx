import { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TodoAdd({ onAddTodo }) {
  const [form, setForm] = useState({ todo: "" });
  const [loading, setLoading] = useState(false);
  const handleAddTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!form.todo) {
        toast.error("Todo không được để trống !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      await onAddTodo({ todo: form.todo });
      setForm({ todo: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChangeValue = (value) => {
    setForm({ ...form, todo: value });
  };
  return (
    <form action="" className="w-full flex py-4" onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Add Task..."
        spellCheck="false"
        value={form.todo}
        className="w-2/3 h-12 border-2 border-red-200 outline-none p-3 font-sans font-medium text-base rounded-l-lg"
        onChange={(e) => {
          handleChangeValue(e.target.value);
        }}
      />
      <button className="w-1/3 bg-red-500 hover:bg-red-700 text-white text-base font-medium rounded-r-lg">
        {loading ? "Adding..." : "Add"}
      </button>
      <ToastContainer />
    </form>
  );
}
TodoAdd.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};
export default TodoAdd;
