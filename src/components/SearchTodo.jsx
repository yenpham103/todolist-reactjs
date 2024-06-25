import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
function SearchTodo({ onSearchTodo, onDebounceSearch }) {
  const [form, setForm] = useState({ todoSearched: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceSearchTerm = useDebounce(searchTerm, 800);
  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        if (debounceSearchTerm) {
          await onDebounceSearch(debounceSearchTerm);
        } else {
          await onDebounceSearch("");
        }
      } catch (error) {
        console.error("Error searching for todo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [debounceSearchTerm]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const todoSearched = form.todoSearched;
      await onSearchTodo(todoSearched);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchValue = (value) => {
    setForm({ ...form, todoSearched: value });
    setSearchTerm(value);
  };
  return (
    <form action="" className="w-full flex py-4" onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Search Task..."
        spellCheck="false"
        value={searchTerm}
        className="w-2/3 h-12 border-2 border-red-200 outline-none p-3 font-sans font-medium text-base rounded-l-lg"
        onChange={(e) => {
          handleSearchValue(e.target.value);
        }}
      />
      <button className="w-1/3 bg-red-500 hover:bg-red-700 text-white text-base font-medium rounded-r-lg">
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
SearchTodo.propTypes = {
  onSearchTodo: PropTypes.func.isRequired,
  onDebounceSearch: PropTypes.func.isRequired,
};
export default SearchTodo;
