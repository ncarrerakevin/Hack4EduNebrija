import React, { useState, useEffect } from 'react';
import './SurveyQuestion.css';
import { useSurvey } from '../context/useSurvey';  // Ahora importas desde useSurvey.ts

interface SurveyQuestionProps {
    onNext: () => void;
    onPrevious: () => void;
    questionText: string;
    currentStep: number;
    totalSteps: number;
    questionType: 'options' | 'numeric';
}

const SurveyQuestion = ({ onNext, onPrevious, questionText, currentStep, totalSteps, questionType }: SurveyQuestionProps) => {
    const { setAnswer, answers } = useSurvey();  // Accedemos al contexto aquí
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [numericInput, setNumericInput] = useState<number | undefined>();

    useEffect(() => {
        // Guarda la respuesta cada vez que cambia
        if (questionType === 'options' && selectedOption) {
            setAnswer(currentStep - 1, selectedOption);
        } else if (questionType === 'numeric' && numericInput !== undefined) {
            setAnswer(currentStep - 1, numericInput.toString());
        }
        console.log("Respuestas actuales:", answers);  // Imprime las respuestas para verificar
    }, [selectedOption, numericInput, currentStep, questionType, setAnswer, answers]);

    const handleNext = () => {
        if (questionType === 'options' && selectedOption) {
            onNext();
        } else if (questionType === 'numeric' && numericInput !== undefined) {
            onNext();
        } else {
            alert('Por favor, completa la respuesta antes de continuar.');
        }

        if (currentStep === totalSteps) {
            setTimeout(() => {
                window.location.href = '/mindfulness-start'; // Redirige después de asegurarse de que las respuestas se guardan
            }, 200); // Un pequeño retraso para asegurar que la respuesta se guarda antes de cambiar de ruta
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
                    <div className="survey-options">
                        <label>
                            <input
                                type="radio"
                                value="Sí"
                                checked={selectedOption === 'Sí'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            Sí
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="No"
                                checked={selectedOption === 'No'}
                                onChange={(e) => setSelectedOption(e.target.value)}
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
                            onChange={(e) => setNumericInput(parseInt(e.target.value, 10))}
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

