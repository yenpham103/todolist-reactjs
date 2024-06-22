import {
  getTodos as fetchTodosAPI,
  addTodo as addTodoAPI,
  updateTodo as updateTodoAPI,
  deleteTodo as deleteTodoAPI,
} from "../libs/todoServer";
import {
  SET_LOADING,
  SET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  SET_ERROR,
} from "./rootReducer";

export const fetchTodos = async (dispatch, apiKey) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const todos = await fetchTodosAPI(apiKey);
    dispatch({ type: SET_TODOS, payload: todos });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const addTodo = async (dispatch, apiKey, todo) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const newTodo = await addTodoAPI(apiKey, todo);
    dispatch({ type: ADD_TODO, payload: newTodo });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const updateTodo = async (dispatch, apiKey, todoId, updatedTodo) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const updated = await updateTodoAPI(apiKey, todoId, updatedTodo);
    dispatch({ type: UPDATE_TODO, payload: updated });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const deleteTodo = async (dispatch, apiKey, todoId) => {
  dispatch({ type: SET_LOADING, payload: true });

  try {
    await deleteTodoAPI(apiKey, todoId);
    dispatch({ type: DELETE_TODO, payload: todoId });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};
