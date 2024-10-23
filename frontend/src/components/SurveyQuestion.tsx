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
    const { setAnswer, answers } = useSurvey(); // Obtén respuestas también
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [numericInput, setNumericInput] = useState<number | undefined>();

    useEffect(() => {
        // Guarda la respuesta cada vez que cambia
        if (questionType === 'options' && selectedOption) {
            setAnswer(currentStep - 1, selectedOption);
        } else if (questionType === 'numeric' && numericInput !== undefined) {
            setAnswer(currentStep - 1, numericInput.toString());
        }

        // Imprime las respuestas almacenadas cada vez que se actualiza la respuesta
        console.log(`Respuestas actuales: ${JSON.stringify(answers)}`);
    }, [selectedOption, numericInput, currentStep, questionType, setAnswer, answers]);

    const handleNext = () => {
        if (questionType === 'options' && selectedOption) {
            onNext();
        } else if (questionType === 'numeric' && numericInput !== undefined) {
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
