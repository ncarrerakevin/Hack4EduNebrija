import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import SurveyIntro from './components/SurveyIntro';
import SurveyQuestion from './components/SurveyQuestion';
import MindfulnessStart from './components/MindfulnessStart';
import MindfulnessAudio from './components/MindfulnessAudio';
import StudyingScreen from './components/StudyingScreen';
import CompletionScreen from './components/CompletionScreen';
import Login from './components/Login';
import Register from './components/Register';
import LikertQuestion from './components/LikertQuestion'; // Importa LikertQuestion
import { useState } from 'react';
import { SurveyProvider } from './context/SurveyContext';
import Conclusions from './components/Conclusions';

// Define el tipo para 'options' y 'numeric'
type QuestionType = 'options' | 'numeric';

function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5; // Total de preguntas de la encuesta

    // Lista de preguntas con el tipo correcto
    const questions = [
        { text: "En los momentos que debes dedicarte a la tarea académica (estudiar, deberes), ¿tienes conectados los dispositivos digitales? ", type: 'options' as QuestionType },
        { text: "¿Con qué frecuencia revisas tus dispositivos digitales en momentos académicos? (1-7)", type: 'numeric' as QuestionType },
        { text: "¿Cómo dirías que te sientes cuando debes dejar de usar tus dispositivos electrónicos por un largo periodo de tiempo (por ejemplo, para estudiar)? (1-7)", type: 'numeric' as QuestionType },
        { text: "¿Cuánto tiempo sueles ser capaz de estar concentrado en la tarea antes de distraerte con dispositivos digitales? (minutos de 0 a 120)", type: 'numeric' as QuestionType },
        { text: "¿Qué objetivo de concentración plena dedicado a la tarea te gustaría conseguir? (minutos de 30 a 120)", type: 'numeric' as QuestionType },
    ];

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
      <SurveyProvider>
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
                  <Route path="/mindfulness-start" element={<MindfulnessStart onStart={() => window.location.href = '/mindfulness-audio'} />} />
                  <Route path="/mindfulness-audio" element={<MindfulnessAudio onFinish={() => window.location.href = '/studying'} />} />
                  <Route path="/studying" element={<StudyingScreen onFinish={() => window.location.href = '/completion'} />} />
                  <Route path="/completion" element={<CompletionScreen onQuestionnaire={() => window.location.href = '/likert-question'} />} />
                  <Route
                      path="/likert-question"
                      element={
                          <LikertQuestion
                              questionText="Del 1 al 7, ¿cuánto de focalizada está tu atención en la tarea que vas a realizar?"
                              currentStep={1}
                              totalSteps={1}
                              onNext={() => window.location.href = '/conclusions'} // Redirigir a conclusiones
                              onPrevious={() => {}}
                          />
                      }
                  />
                  <Route path="/conclusions" element={<Conclusions />} />
              </Routes>
          </Router>
      </SurveyProvider>
  );
}

export default App;