import './SurveyIntro.css';

const SurveyIntro = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="survey-intro-container">
            <div className="survey-intro-card">
                <h2>Queremos conocerte mejor 😊</h2>
                <p>
                    Vamos a hacerte algunas preguntas 📝 para entender cómo te sientes y cómo aprendes mejor 📚. Esto nos ayudará a personalizar tu experiencia y a que puedas concentrarte más fácil en tus estudios. ¡Será rápido y sencillo! 👍
                </p>
                <button className="start-button" onClick={onStart}>Comenzar</button>
            </div>
        </div>
    );
};

export default SurveyIntro;