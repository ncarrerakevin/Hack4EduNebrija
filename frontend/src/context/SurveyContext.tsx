import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface SurveyContextType {
    questions: string[];
    answers: string[];
    setAnswer: (index: number, answer: string) => void;
}

export const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

interface SurveyProviderProps {
    children: ReactNode;
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
    const [questions] = useState([
        "¿Tienes conectados los dispositivos digitales mientras estudias? (Sí/No)",
        "¿Con qué frecuencia revisas tus dispositivos digitales en momentos académicos? (1-7)",
        "¿Cómo te sientes al dejar de usar dispositivos electrónicos por mucho tiempo? (1-7)",
        "¿Cuánto tiempo puedes concentrarte antes de distraerte con dispositivos digitales? (minutos de 0 a 120)",
        "¿Qué objetivo de concentración plena te gustaría alcanzar? (minutos de 30 a 120)",
    ]);

    // Recupera respuestas del localStorage si existen
    const [answers, setAnswers] = useState<string[]>(() => {
        const storedAnswers = localStorage.getItem('surveyAnswers');
        return storedAnswers ? JSON.parse(storedAnswers) : Array(questions.length).fill("");
    });

    // Función para actualizar respuestas
    const setAnswer = (index: number, answer: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = answer;

            // Guarda respuestas en localStorage
            localStorage.setItem('surveyAnswers', JSON.stringify(newAnswers));
            return newAnswers;
        });
    };

    useEffect(() => {
        console.log('Respuestas almacenadas:', answers);
    }, [answers]);

    return (
        <SurveyContext.Provider value={{ questions, answers, setAnswer }}>
            {children}
        </SurveyContext.Provider>
    );
};