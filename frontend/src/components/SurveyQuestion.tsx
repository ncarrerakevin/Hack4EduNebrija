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
    const { setAnswer, answers } = useSurvey(); // Traer respuestas también para depurar
    const [answer, setLocalAnswer] = useState<string>(''); // Almacenar la respuesta localmente

    useEffect(() => {
        // Cuando se monta el componente, prellena con la respuesta existente (si la hay)
        setLocalAnswer(answers[currentStep - 1] || '');
    }, [answers, currentStep]);

    const handleNext = () => {
        // Guardar la respuesta en el contexto cuando se pasa a la siguiente pregunta
        setAnswer(currentStep - 1, answer);
        onNext();

        if(currentStep === totalSteps) {
            console.log('Respuestas:', answers);
            window.location.href = '/mindfulness-start'; // Redirige a la pantalla de conclusiones
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalAnswer(e.target.value);
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
                                checked={answer === 'Sí'}
                                onChange={handleChange}
                            />
                            Sí
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="No"
                                checked={answer === 'No'}
                                onChange={handleChange}
                            />
                            No
                        </label>
                    </div>
                )}

                {questionType === 'numeric' && (
                    <div className="numeric-input">
                        <input
                            type="number"
                            value={answer}
                            onChange={handleChange}
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
