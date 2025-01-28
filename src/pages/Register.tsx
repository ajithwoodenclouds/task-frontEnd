import { useState } from "react";
import { RootState, useAppDispatch } from "../store/store";
import { register } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  console.log(auth,"auth");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register( name, email, password ));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {/* Input fields */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-b w-full mb-4 p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b w-full mb-4 p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b w-full mb-4 p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <h1 className="text-blue-700" onClick={()=>navigate('/login')}>Login Here</h1>
      </form>
    </div>
  );
};

export default Register;