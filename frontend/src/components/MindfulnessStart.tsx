import './MindfulnessStart.css';

const MindfulnessStart = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="mindfulness-start-container">
            <div className="mindfulness-start-card">
                <h2>¡Gracias por contarnos más sobre ti! 😊</h2>
                <p>
                    Ahora que sabemos un poquito más de ti, estamos listos para ayudarte a concentrarte mejor.
                    Vamos a empezar con un ejercicio de mindfulness que te ayudará a sentirte más tranquilo y enfocado
                    para tus estudios. Ahora solo tendrás que seguir las instrucciones.
                </p>
                <button className="start-button" onClick={onStart}>Empezar Mindfulness 🧘‍♂️</button>
            </div>
        </div>
    );
};

export default MindfulnessStart;