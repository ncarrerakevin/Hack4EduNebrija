import { useEffect, useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import ReactMarkdown from 'react-markdown';
import './Conclusions.css'; // Importa el archivo de estilos

const Conclusions = () => {
    const { questions, answers } = useSurvey();
    const [conclusions, setConclusions] = useState<string>(''); 

    useEffect(() => {
        const fetchConclusions = async () => {
            // Mejora del prompt para generar el perfil del estudiante con emojis, recomendaciones y motivación
            const prompt = `
                Basado en las siguientes preguntas y respuestas del estudiante:

                ${questions.map((q, i) => `Pregunta: ${q}\nRespuesta: ${answers[i]}\n`).join('\n')}

                Evalúa las respuestas y asigna uno de los siguientes perfiles al estudiante con emojis, incluyendo 1 o 2 recomendaciones específicas para mejorar su concentración, y una frase motivacional al final:

                1. Estudiante Enfocado 🎯: Este perfil describe a los estudiantes que tienden a mantener altos niveles de atención y concentración sin interrupciones significativas. Son capaces de trabajar durante periodos largos sin distracciones.
                2. Estudiante Intermitente 🌗: Estudiantes que fluctúan entre momentos de alta concentración y distracción moderada. Su nivel de atención varía dependiendo del tipo de tarea y el entorno.
                3. Estudiante Distraído 📱: Estudiantes que tienden a perder la concentración fácilmente debido a distracciones digitales. Revisan sus dispositivos con frecuencia y les cuesta enfocarse por mucho tiempo.
                4. Estudiante Desconectado 🔌: Aquellos que se frustran mucho al estar desconectados de sus dispositivos digitales, lo que afecta su capacidad para concentrarse en sus estudios.
                5. Estudiante Resiliente 💪: Estudiantes que, aunque comienzan con distracciones, logran mejorar su concentración a medida que avanzan en su tarea, pudiendo prolongar su tiempo de enfoque sin la necesidad de pausas frecuentes.
                6. Estudiante Ansioso 😟: Estudiantes que sienten altos niveles de frustración cuando deben dejar de usar sus dispositivos electrónicos. Esta ansiedad puede reducir su capacidad de atención.
                7. Estudiante Concentrado por Periodos Cortos ⏳: Estudiantes que pueden mantenerse concentrados por un corto periodo de tiempo (30-45 minutos), pero requieren pausas frecuentes.
                8. Estudiante Digitalmente Activo 📲: Estudiantes que suelen revisar sus dispositivos digitales con mucha frecuencia durante los momentos de estudio, aunque son conscientes de que deben mejorar en este aspecto.
                9. Estudiante Mindful 🧘: Estudiantes que aplican con éxito prácticas de mindfulness para mejorar su concentración y logran prolongar su tiempo de enfoque en la tarea.
                10. Estudiante Motivado 🚀: Aquel que muestra interés en mejorar su tiempo de concentración y alcanzar sus objetivos de forma constante. Aunque presente algunos obstáculos, está comprometido con su progreso.

                Proporciona también una o dos recomendaciones específicas para ayudar al estudiante a mejorar su enfoque y una frase motivacional al final.
                No vuelvas a repetir las preguntas y respuestas, solo genera el perfil y las recomendaciones.
                Si es que no recibes informacion, genera una conclusion aleatoria.
            `;
            console.log('Prompt:', prompt);

            try {
                const response = await fetch('http://localhost:5000/api/openai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt })
                });
    
                const data = await response.json();
                setConclusions(data.response.choices[0].message.content);
            } catch (error) {
                console.error('Error fetching conclusion:', error);
            }
        };

        fetchConclusions();
    }, [questions, answers]);

    return (
        <div className="conclusions-container">
            <div className="conclusions-header">
                <img src="/openai-logo.png" alt="OpenAI Logo" className="openai-logo" />
                <h2>Perfil y Recomendaciones</h2>
            </div>
            <ReactMarkdown className="conclusions-text">{conclusions}</ReactMarkdown>
        </div>
    );
};

export default Conclusions;
