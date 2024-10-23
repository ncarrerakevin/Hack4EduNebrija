import { useState } from 'react';
import Welcome from './components/Welcome';
import SurveyIntro from './components/SurveyIntro';
import SurveyQuestion from './components/SurveyQuestion';
import MindfulnessStart from './components/MindfulnessStart';
import MindfulnessAudio from './components/MindfulnessAudio'; // Importa el reproductor de audio

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [showSurveyIntro, setShowSurveyIntro] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);
    const [showMindfulnessStart, setShowMindfulnessStart] = useState(false);
    const [showMindfulnessAudio, setShowMindfulnessAudio] = useState(false); // Añade el estado para el reproductor de audio
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

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

    // Maneja el inicio del audio después de la pantalla de Mindfulness Start
    const handleStartMindfulnessAudio = () => {
        setShowMindfulnessStart(false); // Oculta la pantalla de inicio de mindfulness
        setShowMindfulnessAudio(true); // Muestra el reproductor de audio
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
            {showMindfulnessStart && <MindfulnessStart onStart={handleStartMindfulnessAudio} />}
            {showMindfulnessAudio && <MindfulnessAudio />} {/* Muestra el reproductor de audio */}
        </div>
    );
}

export default App;