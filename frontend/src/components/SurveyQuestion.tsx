import React, { useState, useEffect } from 'react';
import './SurveyQuestion.css';
import { useSurvey } from '../context/SurveyContext';

interface SurveyQuestionProps {
    onNext: () => void;
    onPrevious: () => void;
    questionText: string;
    currentStep: number;
    totalSteps: number;
    questionType: 'options' | 'numeric';
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ onNext, onPrevious, questionText, currentStep, totalSteps, questionType }) => {
    const { setAnswer } = useSurvey();
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [numericInput, setNumericInput] = useState<number | undefined>();

    const handleNext = () => {
        if (questionType === 'options' && selectedOption) {
            // Guardar la respuesta antes de avanzar a la siguiente pregunta
            setAnswer(currentStep - 1, selectedOption);
            console.log(`Respuesta para la pregunta ${currentStep}: ${selectedOption}`);
            onNext();
        } else if (questionType === 'numeric' && numericInput !== undefined) {
            // Guardar la respuesta antes de avanzar a la siguiente pregunta
            setAnswer(currentStep - 1, numericInput);
            console.log(`Respuesta para la pregunta ${currentStep}: ${numericInput}`);
            onNext();
        } else {
            alert('Por favor, completa la respuesta antes de continuar.');
        }

        // Si es la última pregunta, redirige a mindfulness-start
        if (currentStep === totalSteps) {
            window.location.href = '/mindfulness-start'; 
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
