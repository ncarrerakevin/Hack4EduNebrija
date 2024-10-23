import { useEffect, useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import OpenAI from 'openai';
import './Conclusions.css'; // Importa el archivo de estilos

const openai = new OpenAI({
    apiKey: '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', // Reemplaza con tu clave de OpenAI
});

const Conclusions = () => {
    const { questions, answers } = useSurvey();
    const [conclusions, setConclusions] = useState<string>(''); 

    useEffect(() => {
        const fetchConclusions = async () => {
            const prompt = `Aquí están las preguntas y respuestas del usuario:\n\n${questions.map((q, i) => `Pregunta: ${q}\nRespuesta: ${answers[i]}\n`).join('\n')}¿Puedes generar unas conclusiones basadas en esto?`;

            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [{ role: "user", content: prompt }]
                });

                const result = completion.choices[0]?.message?.content || '';
                setConclusions(result);
            } catch (error) {
                console.error('Error al generar las conclusiones:', error);
            }
        };

        fetchConclusions();
    }, [questions, answers]);

    return (
        <div className="conclusions-container">
            <div className="conclusions-header">
                <img src="/assets/openai-logo.png" alt="OpenAI Logo" className="openai-logo" />
                <h2>Conclusiones Generadas</h2>
            </div>
            <p className="conclusions-text">{conclusions}</p>
        </div>
    );
};

export default Conclusions;
