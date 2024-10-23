import React, { useState } from "react";
import Auth from "./components/Auth";
import Register from "./components/Register";

const App: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      {/* Imagen de portada */}
      <div className="hidden lg:block lg:w-1/2 h-full">
        <img
          src="/portada.png"
          alt="Portada"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Columna del formulario */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-white">
        <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg py-10 px-16">
          {isRegistering ? (
            <Register />
          ) : (
            <Auth />
          )}
          <div className="text-center mt-4">
            <button
              className="text-blue-500 underline"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? "¿Ya tienes cuenta? Iniciar sesión"
                : "¿No tienes cuenta? Regístrate ahora"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
