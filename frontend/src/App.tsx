import { useState } from 'react';
import Welcome from './components/Welcome';
import SurveyIntro from './components/SurveyIntro';
import SurveyQuestion from './components/SurveyQuestion';
import MindfulnessStart from './components/MindfulnessStart'; // Importa la nueva pantalla

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [showSurveyIntro, setShowSurveyIntro] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);
    const [showMindfulnessStart, setShowMindfulnessStart] = useState(false); // Para mindfulness
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5; // Total de preguntas

    const questions = [
        { text: "En los momentos que debes dedicarte a la tarea académica (estudiar, deberes), ¿tienes conectados los dispositivos digitales?", type: 'options' },
        { text: "¿Con qué frecuencia revisas tus dispositivos digitales para ver notificaciones en los momentos de tarea académica?", type: 'numeric' },
        { text: "¿Cómo dirías que te sientes cuando debes dejar de usar tus dispositivos electrónicos por un largo periodo de tiempo (por ejemplo, para estudiar)?", type: 'numeric' },
        { text: "¿Cuánto tiempo sueles ser capaz de estar concentrado en la tarea antes de distraerte con dispositivos digitales?", type: 'numeric' },
        { text: "¿Qué objetivo de concentración plena dedicado a la tarea te gustaría conseguir?", type: 'numeric' },
    ];

    const handleStart = () => {
        setShowWelcome(false);
        setShowSurveyIntro(true);
    };

    const handleSurveyIntroStart = () => {
        setShowSurveyIntro(false);
        setShowSurvey(true);
    };

    const handleNextQuestion = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowSurvey(false); // Oculta la encuesta
            setShowMindfulnessStart(true); // Muestra la pantalla de Mindfulness
        }
    };

    const handlePreviousQuestion = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div>
            {showWelcome && <Welcome onStart={handleStart} />}
            {showSurveyIntro && <SurveyIntro onStart={handleSurveyIntroStart} />}
            {showSurvey && (
                <SurveyQuestion
                    questionText={questions[currentStep - 1].text}
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    questionType={questions[currentStep - 1].type}
                    onNext={handleNextQuestion}
                    onPrevious={handlePreviousQuestion}
                />
            )}
            {showMindfulnessStart && <MindfulnessStart onStart={() => { /* Maneja el siguiente paso aquí */ }} />}
        </div>
    );
}

export default App;