import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const location = useLocation(); // 👈 current page

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }} // 👈 yahan page store
        replace
      />
    );
  }

  return children;
};

export default Protected;
