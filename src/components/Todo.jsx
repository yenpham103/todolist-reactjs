import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";
import Logout from "./Logout";
import { addTodo, getTodos, deleteTodo, updateTodo } from "./libs/todoServer";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("apiKey");
  const apiKey = JSON.parse(token);
  useEffect(() => {
    if (!apiKey) {
      navigate("/login");
    }
  }, [apiKey, navigate]);
  //
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        if (apiKey) {
          const fetchedTodos = await getTodos(apiKey);
          setTodos(Array.isArray(fetchedTodos) ? fetchedTodos : []);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [apiKey]);

  const handleAddTodo = async (newTodo) => {
    setLoading(true);
    try {
      if (apiKey) {
        const { data } = await addTodo(newTodo, apiKey);
        setTodos((prevTodos) => [data, ...prevTodos]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (index) => {
    setLoading(true);
    try {
      if (apiKey) {
        const todoToDelete = todos[index];
        await deleteTodo(todoToDelete._id, apiKey);
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTodo = async (index, newTodo, isCompleted) => {
    setLoading(true);
    try {
      if (apiKey) {
        const todoToEdit = todos[index];
        const updatedTodo = { todo: newTodo, isCompleted: isCompleted };
        const { data } = await updateTodo(todoToEdit._id, updatedTodo, apiKey);
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === todoToEdit._id ? data : todo))
        );
      }
    } catch (error) {
      console.error("Error editing todo:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[700px] bg-white rounded-lg flex flex-col items-center shadow-inner p-6">
      <TodoAdd onAddTodo={handleAddTodo} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todos={todos}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
        />
      )}
      <Logout />
    </div>
  );
}

export default Todo;
