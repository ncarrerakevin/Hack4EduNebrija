import { useEffect, useState } from 'react';
import OpenAI from 'openai';
import './MindfulnessSupport.css';

const openai = new OpenAI({
    apiKey: 'YOUR_OPENAI_API_KEY', // Reemplaza con tu clave de OpenAI
});

const MindfulnessSupport = () => {
    const [haiku, setHaiku] = useState<string>('');  // Define el estado como string y vacío al inicio
    const [loading, setLoading] = useState(true);

    const generateMindfulnessHaiku = async () => {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    { "role": "user", "content": "write a haiku about mindfulness and focus" }
                ]
            });

            // Asegúrate de que completion.choices[0].message.content sea un string, incluso si es null
            setHaiku(completion.choices[0].message.content || "No haiku was generated, please try again.");
        } catch (error) {
            console.error("Error generating haiku:", error);
            setHaiku("Oops! Something went wrong. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateMindfulnessHaiku();
    }, []);

    return (
        <div className="mindfulness-support-container">
            <div className="mindfulness-support-card">
                <h2>Mindfulness Haiku</h2>
                {loading ? <p>Loading haiku...</p> : <p className="mindfulness-haiku">{haiku}</p>}
            </div>
        </div>
    );
};

export default MindfulnessSupport;

