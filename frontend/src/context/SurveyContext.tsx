import { createContext, useState, useContext, ReactNode } from 'react';

// Define la estructura de las preguntas y respuestas
interface SurveyContextType {
    questions: string[];
    answers: (string | number)[];
    setAnswer: (questionIndex: number, answer: string | number) => void;
}

// Crea el contexto
const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

// Proveedor de contexto que manejará preguntas y respuestas
export const SurveyProvider = ({ children }: { children: ReactNode }) => {
    // Almacena preguntas
    const questions = [
        "¿Tienes conectados los dispositivos digitales mientras estudias?",
        "¿Con qué frecuencia revisas tus dispositivos digitales en momentos académicos?",
        "¿Cómo te sientes al dejar de usar dispositivos electrónicos por mucho tiempo?",
        "¿Cuánto tiempo puedes concentrarte antes de distraerte con dispositivos digitales?",
        "¿Qué objetivo de concentración plena te gustaría alcanzar?"
    ];

    // Estado para almacenar las respuestas
    const [answers, setAnswers] = useState<(string | number)[]>(new Array(questions.length).fill(""));

    // Función para actualizar las respuestas
    const setAnswer = (questionIndex: number, answer: string | number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
    };

    return (
        <SurveyContext.Provider value={{ questions, answers, setAnswer }}>
            {children}
        </SurveyContext.Provider>
    );
};

// Hook para usar el contexto en otros componentes
export const useSurvey = () => {
    const context = useContext(SurveyContext);
    if (!context) {
        throw new Error('useSurvey debe ser utilizado dentro de un SurveyProvider');
    }
    return context;
};
