import './CompletionScreen.css';

const CompletionScreen = ({ onQuestionnaire }: { onQuestionnaire: () => void }) => {
    return (
        <div className="completion-container">
            <img src="/assets/Player-Image.png" alt="Completado" className="completion-image" />
            <h2>¡Muy bien! Has terminado el proceso</h2>
            <p>Gracias por completar todas las etapas. A continuación, puedes realizar el cuestionario.</p>
            <button className="completion-button" onClick={onQuestionnaire}>Realizar cuestionario</button>
        </div>
    );
};

export default CompletionScreen;