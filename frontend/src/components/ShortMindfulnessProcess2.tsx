import './ShortMindfulnessProcess2.css';

const ShortMindfulnessProcess2 = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="short-mindfulness-process-container">
            <img src="/assets/Player-Image.png" alt="Mindfulness" className="mindfulness-image" />
            <h2>Reconectando</h2>
            <p>
                Reflexiona cómo se siente tu cuerpo en este momento.
                ¿Te sientes más tranquilo ahora? ¿Estás listo para estudiar?
            </p>
            <button className="mindfulness-button" onClick={onNext}>Siguiente</button>
        </div>
    );
};

export default ShortMindfulnessProcess2;