import './FinalScreen.css';

const FinalScreen = () => {
    return (
        <div className="final-screen-container">
            <h2>¡Gracias por usar ReconectaT! 😊</h2>
            <p>Sigue así y llegarás muy lejos. 🚀</p>
            <button className="final-button" onClick={() => window.close()}>Fin</button>
        </div>
    );
};

export default FinalScreen;