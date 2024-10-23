import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Usuario registrado exitosamente");
      setError("");
    } catch (error) {
      setError("Error al registrar el usuario.");
      setSuccess("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg py-10 px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Regístrate</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
