import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const apiKey = localStorage.getItem("apiKey");
  return apiKey ? <Component {...rest} /> : <Navigate to="/login" />;
};
ProtectedRoute.propTypes = {
  element: PropTypes.func.isRequired,
};
export default ProtectedRoute;
