import './CompletionScreen.css';

const CompletionScreen = ({ onQuestionnaire }: { onQuestionnaire: () => void }) => {
    return (
        <div className="completion-container">
            <img src="/assets/Player-Image.png" alt="Completado" className="completion-image" />
            <h2>¡Muy bien! Haz terminado</h2>
            <button className="completion-button" onClick={onQuestionnaire}>Realizar cuestionario</button>
        </div>
    );
};

export default CompletionScreen;