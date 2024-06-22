import PropTypes from "prop-types";
import { useReducer } from "react";
import { createContext } from "react";
export const ProviderContext = createContext();
function Provider({ children, store }) {
  const { rootReducer, initialState } = store;
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
export default Provider;
