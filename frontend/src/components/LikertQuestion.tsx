import React, { useState } from 'react';
import './LikertQuestion.css';

interface LikertQuestionProps {
    onNext: () => void;
    onPrevious: () => void;
    questionText: string;
    currentStep: number;
    totalSteps: number;
}

const LikertQuestion: React.FC<LikertQuestionProps> = ({ onNext, onPrevious, questionText, currentStep, totalSteps }) => {
    const [selectedOption, setSelectedOption] = useState<number | undefined>();

    const handleOptionChange = (value: number) => {
        setSelectedOption(value);
    };

    const handleNext = () => {
        if (selectedOption !== undefined) {
            console.log('Respuesta seleccionada:', selectedOption);
            onNext();
        } else {
            alert('Por favor, selecciona una opción antes de continuar.');
        }
    };

    return (
        <div className="likert-question-container">
            <div className="question-box">
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                </div>
                <h2>{questionText}</h2>

                <div className="likert-scale">
                    {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                        <label key={value} className={`likert-label ${selectedOption === value ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                value={value}
                                checked={selectedOption === value}
                                onChange={() => handleOptionChange(value)}
                            />
                            {value}
                        </label>
                    ))}
                </div>

                <div className="likert-legend">
                    <span>1 = Nada focalizado</span>
                    <span>7 = Muy focalizado</span>
                </div>

                <div className="navigation-buttons">
                    <button onClick={onPrevious}>Anterior</button>
                    <button onClick={handleNext}>Siguiente</button>
                </div>
            </div>
        </div>
    );
};

export default LikertQuestion;