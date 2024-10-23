import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'; // Importamos el CSS que vamos a crear

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario logueado:", userCredential.user);
            // Aquí rediriges o haces algo después del login exitoso
        } catch (err: unknown) {
            if (err instanceof Error) {
                //setError(err.message); // Solo accede a err.message si es un Error
            }
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
                    ¿No tienes cuenta? <a href="#">Regístrate ahora</a>
                </p>
            </div>
        </div>
    );
};

export default Login;