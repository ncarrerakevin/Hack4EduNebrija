import React, { useState } from 'react';
import './SurveyQuestion.css';

const SurveyQuestion = ({ onNext, onPrevious, questionText, currentStep, totalSteps, questionType }: any) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [numericInput, setNumericInput] = useState<number | undefined>();

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setNumericInput(value);
    };

    const handleNext = () => {
        if (questionType === 'options' && selectedOption) {
            console.log('Respuesta seleccionada:', selectedOption);
            onNext();
        } else if (questionType === 'numeric' && numericInput !== undefined) {
            console.log('Respuesta numérica:', numericInput);
            onNext();
        } else {
            alert('Por favor, completa la respuesta antes de continuar.');
        }
    };

    return (
        <div className="survey-question-container">
            <div className="question-box">
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                </div>
                <h2>{questionText}</h2>

                {questionType === 'options' && (
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                value="Sí"
                                checked={selectedOption === 'Sí'}
                                onChange={handleOptionChange}
                            />
                            Sí
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="No"
                                checked={selectedOption === 'No'}
                                onChange={handleOptionChange}
                            />
                            No
                        </label>
                    </div>
                )}

                {questionType === 'numeric' && (
                    <div className="numeric-input">
                        <input
                            type="number"
                            value={numericInput || ''}
                            onChange={handleNumericChange}
                            min={currentStep === 4 ? 1 : currentStep === 5 ? 30 : 1}
                            max={currentStep === 4 ? 120 : currentStep === 5 ? 120 : 7}
                            placeholder="Introduce un número"
                        />
                    </div>
                )}

                <div className="navigation-buttons">
                    <button onClick={onPrevious}>Anterior</button>
                    <button onClick={handleNext}>Siguiente</button>
                </div>
            </div>
        </div>
    );
};

export default SurveyQuestion;