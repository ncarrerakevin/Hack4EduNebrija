import './ShortMindfulnessProcess1.css';

const ShortMindfulnessProcess1 = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="short-mindfulness-process-container">
            <img src="/assets/Player-Image.png" alt="Mindfulness" className="mindfulness-image" />
            <h2>Reconectando</h2>
            <p>
                Coge aire por la nariz 4 segundos, mantén la respiración durante 7 segundos
                y luego expulsa el aire por la nariz 8 segundos. Ahora repítelo 3 veces.
            </p>
            <button className="mindfulness-button" onClick={onNext}>Siguiente</button>
        </div>
    );
};

export default ShortMindfulnessProcess1;