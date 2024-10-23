import React from 'react';
import './ShortMindfulnessStart.css';

interface ShortMindfulnessStartProps {
    onStart: () => void;
}

const ShortMindfulnessStart: React.FC<ShortMindfulnessStartProps> = ({ onStart }) => {
    return (
        <div className="short-mindfulness-container">
            <div className="short-mindfulness-card">
                <h2>¡Gracias por contarnos más sobre ti! 😊</h2>
                <p>
                    A continuación, realizarás una pequeña sesión de Mindfulness para reconectar contigo y tu atención.
                </p>
                <button className="start-button" onClick={onStart}>
                    Empezar Mindfulness 🧘‍♂️
                </button>
            </div>
        </div>
    );
};

export default ShortMindfulnessStart;