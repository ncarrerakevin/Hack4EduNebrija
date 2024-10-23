import { useEffect } from 'react';
import './StudyingScreen.css';

const StudyingScreen = ({ onFinish }: { onFinish: () => void }) => {
    useEffect(() => {
        // Espera 10 segundos antes de llamar a onFinish
        const timer = setTimeout(() => {
            onFinish();
        }, 10000);

        // Limpia el temporizador si el componente se desmonta antes de los 10 segundos
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="studying-container">
            <img src="/assets/Player-Image.png" alt="Estudiando" className="studying-image" />
            <h2>Estudiando</h2>
            <p>Paz interior</p>
            <button className="studying-button" onClick={onFinish}>Finalizar</button>
        </div>
    );
};

export default StudyingScreen;