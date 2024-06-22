export const initialState = {
  todos: [],
  loading: false,
  error: null,
};
//actions
const SET_LOADING = "SET_LOADING";
const SET_TODOS = "SET_TODOS";
const ADD_TODO = "ADD_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SET_ERROR = "SET_ERROR";
export const rootReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_TODOS:
      return { ...state, todos: action.payload, loading: false };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        loading: false,
      };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
