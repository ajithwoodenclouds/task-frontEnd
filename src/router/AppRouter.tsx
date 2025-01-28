import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

import { RootState, useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { tokenVerfiying } from "../features/auth/authSlice";
import PrivateRouter from "./PrivateRouter"; // Import PrivateRouter
import { useSelector } from "react-redux";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const isVerified = useSelector((state: RootState) => state.auth.is_verfiyed);  // Ensure this state is correct

  useEffect(() => {
    if (token) {
      dispatch(tokenVerfiying(true));  // Verify the token only when it's present
    } else {
      dispatch(tokenVerfiying(false));  // If no token, set the state to false
    }
  }, [token, dispatch]); 

  return (
    <Router>
      <Routes>
        {isVerified ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            
            {/* Protected Routes based on the user role */}
            <Route
              path="/*"
              element={
                <PrivateRouter isAuthenticated={isVerified}>
                    <Home />
                </PrivateRouter>
              }
            />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
