import { AppDispatch } from "../../store/store";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";
import axiosClient from "../../api/axiosClient";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());
  try {
    const response = await axiosClient.post("/login", { email, password });
    console.log(response);
    
    dispatch(loginSuccess({ user: response.data, token: response.data.token }));
    localStorage.setItem("token", response.data.token); // Save token for persistence
  } catch (error: any) {
    dispatch(loginFailure(error));
  }
};

export const register = ( name:string , email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());
  try {
    await axiosClient.post("/register", {name, email, password });
    // Optionally redirect to login or auto-login
  } catch (error: any) {
    dispatch(loginFailure(error));
  }
};



export const getUsers = async () => {
  try {
    const response = await axiosClient.get('/users'); // Use axiosClient with the endpoint
    return response.data; // Axios stores the response data in the `data` property
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // Rethrow the error to handle it at the call site
  }
};
