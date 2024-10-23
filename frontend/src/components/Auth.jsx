import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Inicio de sesión exitoso");
    } catch (error) {
      setError("Error en el inicio de sesión. Por favor, revisa tus credenciales.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Inicio de sesión con Google exitoso");
    } catch (error) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div>
      {/* Logo y bienvenida */}
      <div className="text-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto" /> {/* Ajusta el tamaño a lo que necesites */}
        <h2 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h2>
      </div>


      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Login</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-700">Recuérdame</label>
          </div>
          <a href="#" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Iniciar sesión
        </button>
      </form>

      <div className="flex items-center my-4">
        <hr className="w-full border-gray-300" />
        <span className="px-4 text-gray-500">O</span>
        <hr className="w-full border-gray-300" />
      </div>

      {/* Botón de inicio de sesión con Google */}
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-900 flex items-center justify-center transition duration-200"
      >
        <img
          src="/google.svg"
          alt="Google"
          className="w-6 h-6 mr-2" // Ajusta el tamaño
        />
        Inicia sesión con Google
      </button>
    </div>
  );
};

export default Auth;
