import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Welcome from './components/Welcome';
import SurveyIntro from './components/SurveyIntro';
import SurveyQuestion from './components/SurveyQuestion';
import MindfulnessStart from './components/MindfulnessStart';
import MindfulnessAudio from './components/MindfulnessAudio';
import StudyingScreen from './components/StudyingScreen';
import CompletionScreen from './components/CompletionScreen';
import Login from './components/Login'; // Agregar Login
import Register from './components/Register'; // Agregar Register

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [showSurveyIntro, setShowSurveyIntro] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);
    const [showMindfulnessStart, setShowMindfulnessStart] = useState(false);
    const [showMindfulnessAudio, setShowMindfulnessAudio] = useState(false);
    const [showStudyingScreen, setShowStudyingScreen] = useState(false);
    const [showCompletionScreen, setShowCompletionScreen] = useState(false); // Añade el estado para la pantalla de finalización

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    // Preguntas del cuestionario
    const questions = [
        { text: "En los momentos que debes dedicarte a la tarea académica (estudiar, deberes), ¿tienes conectados los dispositivos digitales?", type: 'options' },
        { text: "¿Con qué frecuencia revisas tus dispositivos digitales para ver notificaciones en los momentos de tarea académica?", type: 'numeric' },
        { text: "¿Cómo dirías que te sientes cuando debes dejar de usar tus dispositivos electrónicos por un largo periodo de tiempo (por ejemplo, para estudiar)?", type: 'numeric' },
        { text: "¿Cuánto tiempo sueles ser capaz de estar concentrado en la tarea antes de distraerte con dispositivos digitales?", type: 'numeric' },
        { text: "¿Qué objetivo de concentración plena dedicado a la tarea te gustaría conseguir?", type: 'numeric' },
    ];

    // Avanzar y retroceder en las preguntas del cuestionario
    const handleNextQuestion = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowSurvey(false);
            setShowMindfulnessStart(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStartMindfulnessAudio = () => {
        setShowMindfulnessStart(false);
        setShowMindfulnessAudio(true);
    };

    const handleAudioEnd = () => {
        setShowMindfulnessAudio(false);
        setShowStudyingScreen(true);
    };

    const handleFinishStudy = () => {
        setShowStudyingScreen(false); // Oculta la pantalla de "Estudiando"
        setShowCompletionScreen(true); // Muestra la pantalla de finalización
    };

    const handleQuestionnaire = () => {
        alert("Inicia el cuestionario!"); // Acción para iniciar el cuestionario
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
            {showMindfulnessAudio && <MindfulnessAudio onFinish={handleAudioEnd} />}
            {showStudyingScreen && <StudyingScreen onFinish={handleFinishStudy} />}
            {showCompletionScreen && <CompletionScreen onQuestionnaire={handleQuestionnaire} />}
        </div>
    );
}

export default App;
