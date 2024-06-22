import { SERVER_API } from "../api";
export const getApiKey = async (email) => {
  try {
    const response = await fetch(`${SERVER_API}/api-key?email=${email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch API key");
    }
    const data = await response.json();
    const { apiKey } = data.data;
    return apiKey;
  } catch (error) {
    alert("Vui lòng nhập đúng email !");
  }
};
export const getTodos = async (apiKey) => {
  try {
    const response = await fetch(`${SERVER_API}/todos`, {
      headers: {
        "X-Api-Key": apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch todo list");
    }
    const { data } = await response.json();
    const todos = data.listTodo;
    return todos;
  } catch (error) {
    console.log(error);
  }
};
export const addTodo = async (newTodo, apiKey) => {
  const response = await fetch(`${SERVER_API}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  } else {
    return response.json();
  }
};

export const deleteTodo = async (id, apiKey) => {
  const response = await fetch(`${SERVER_API}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  } else {
    return response.json();
  }
};

export const updateTodo = async (id, newTodo, apiKey) => {
  const response = await fetch(`${SERVER_API}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  } else {
    return response.json();
  }
};
