import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'; // Estilos del Login

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Usa el hook useNavigate para la redirección

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario logueado:", userCredential.user);
            navigate("/welcome"); // Redirige al usuario a la pantalla de bienvenida
        } catch (err: unknown) {
            console.error("Error al iniciar sesión:", err); // Imprime el error completo
        }
        
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Bienvenido de nuevo</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email o número telefónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <div className="options">
                        <label>
                            <input type="checkbox" />
                            Recuérdame
                        </label>
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button type="submit" className="login-button">Iniciar sesión</button>
                </form>
                <div className="login-divider">o</div>
                <button className="login-google-button">Inicia sesión con Google</button>
                <p className="login-signup">
                    ¿No tienes cuenta? <a href="/register">Regístrate ahora</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
