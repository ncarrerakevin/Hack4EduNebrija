import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SurveyContextType {
    questions: string[];
    answers: string[]; // Todas las respuestas serán de tipo string
    setAnswer: (index: number, answer: string) => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

interface SurveyProviderProps {
    children: ReactNode; // Aquí definimos que el componente recibirá children de tipo ReactNode
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
    const [questions] = useState([
        "¿Tienes conectados los dispositivos digitales mientras estudias? (Sí/No)",
        "¿Con qué frecuencia revisas tus dispositivos digitales en momentos académicos? (1-7)",
        "¿Cómo te sientes al dejar de usar dispositivos electrónicos por mucho tiempo? (1-7)",
        "¿Cuánto tiempo puedes concentrarte antes de distraerte con dispositivos digitales? (minutos de 0 a 120)",
        "¿Qué objetivo de concentración plena te gustaría alcanzar? (minutos de 30 a 120)",
    ]);

    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

    const setAnswer = (index: number, answer: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = answer;
            return newAnswers;
        });
    };

    return (
        <SurveyContext.Provider value={{ questions, answers, setAnswer }}>
            {children} {/* Asegúrate de renderizar los children */}
        </SurveyContext.Provider>
    );
};

export const useSurvey = (): SurveyContextType => {
    const context = useContext(SurveyContext);
    if (!context) {
        throw new Error('useSurvey must be used within a SurveyProvider');
    }
    return context;
};
