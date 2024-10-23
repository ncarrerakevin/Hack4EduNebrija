import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Welcome from './components/Welcome';
import SurveyIntro from './components/SurveyIntro';
import SurveyQuestion from './components/SurveyQuestion';
import MindfulnessStart from './components/MindfulnessStart';
import Login from './components/Login'; // Agregar Login
import Register from './components/Register'; // Agregar Register

function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5; // Total de preguntas de la encuesta

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
        }
    };

    const handlePreviousQuestion = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={<Welcome onStart={() => window.location.href = '/survey-intro'} />} />
                <Route path="/survey-intro" element={<SurveyIntro onStart={() => window.location.href = '/survey'} />} />
                <Route
                    path="/survey"
                    element={
                        <SurveyQuestion
                            questionText={questions[currentStep - 1].text}
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            questionType={questions[currentStep - 1].type}
                            onNext={handleNextQuestion}
                            onPrevious={handlePreviousQuestion}
                        />
                    }
                />
                <Route path="/mindfulness" element={<MindfulnessStart onStart={() => alert("Iniciando mindfulness...")} />} />
            </Routes>
        </Router>
    );
}

export default App;
