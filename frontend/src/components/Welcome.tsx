import './Welcome.css'; // Aquí puedes agregar estilos luego si lo necesitas

const Welcome = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="welcome-container">
            <h1>Mindfulness, Estudio, IA</h1>
            <p>
                Descubre la calma en cada respiración con nuestra aplicación de mindfulness. Con una variedad de meditaciones
                guiadas, ejercicios de atención plena y técnicas de relajación.
            </p>
            <button className="start-button" onClick={onStart}>
                Comienza ahora
            </button>
        </div>
    );
};

export default Welcome;