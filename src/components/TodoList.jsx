import PropTypes from "prop-types";
import { useState } from "react";
function TodoList({ todos, onDeleteTodo, onEditTodo }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [completed, setCompleted] = useState(false);
  const handelDeleteTodo = (index) => {
    onDeleteTodo(index);
  };
  const handleEditSubmit = (index) => {
    if (editValue.trim() !== "") {
      onEditTodo(index, editValue, completed);
    } else {
      onEditTodo(index, todos[index].todo, completed);
    }
    setEditIndex(null);
    setEditValue("");
    setCompleted(false);
  };

  return (
    <div className="w-full ">
      <ul className="w-full">
        {todos?.map(({ todo, isCompleted }, index) => {
          return (
            <li
              className="w-full flex item justify-between py-4 h-20"
              key={index}
            >
              <div className="w-2/3 flex items-center gap-2 px-2  bg-red-400 rounded-l-lg">
                <input
                  type="checkbox"
                  checked={editIndex === index ? completed : isCompleted}
                  onChange={(e) => {
                    if (editIndex === index) {
                      setCompleted(e.target.checked);
                    } else {
                      onEditTodo(index, todo, e.target.checked);
                    }
                  }}
                  className="appearance-none cursor-pointer bg-white w-3.5 h-3.5 mr-2 border rounded-full ease-linear group-hover:shadow-checkbox group-hover:border-blue-500 checked:border-secondary checked:bg-blue-500"
                  style={{
                    display: `${editIndex === index ? "block" : "none"}`,
                  }}
                />
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editValue !== "" ? editValue : todo}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-4/5 text-base font-medium text-white bg-transparent outline-none border-b-2 border-white"
                  />
                ) : (
                  <>
                    {isCompleted ? (
                      <span className="line-through w-4/5 text-base font-medium text-white">
                        {todo?.length >= 30 ? todo.slice(0, 30) + "..." : todo}
                      </span>
                    ) : (
                      <span className=" w-4/5 text-base font-medium text-white ">
                        {todo?.length >= 30 ? todo.slice(0, 30) + "..." : todo}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="w-1/3 rounded-r-lg border-2 border-red-400 flex item-center justify-between">
                {editIndex === index ? (
                  <>
                    <button
                      className="border-r-2 border-red-400 w-1/2 text-red-500 text-base font-medium cursor-pointer hover:opacity-80"
                      onClick={() => handleEditSubmit(index)}
                    >
                      Save
                    </button>
                    <button
                      className="w-1/2 text-base font-medium text-red-500 cursor-pointer hover:opacity-80"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="border-r-2 border-red-400 w-1/2 text-red-500 text-base font-medium cursor-pointer hover:opacity-80"
                      onClick={() => {
                        setEditIndex(index);
                        setEditValue(todo);
                        setCompleted(isCompleted);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="w-1/2 text-base font-medium text-red-500 cursor-pointer hover:opacity-80"
                      onClick={() => handelDeleteTodo(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
TodoList.propTypes = {
  todos: PropTypes.array,
  onDeleteTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
};
export default TodoList;
