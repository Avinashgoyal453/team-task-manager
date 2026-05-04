import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully!");
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        <input
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        <select
          name="role"
          value={data.role}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          onClick={register}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}