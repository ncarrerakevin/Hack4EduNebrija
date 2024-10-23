const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors'); // Importa el paquete cors
const port = 5000; // Puerto para el servidor backend

// Habilita CORS para todas las rutas
app.use(cors());
// Middleware para analizar JSON
app.use(express.json());

// Ruta para manejar solicitudes a OpenAI
app.post('/api/openai', async (req, res) => {
    const { prompt } = req.body; // Obtén el prompt del cuerpo de la solicitud

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o",
            messages: [
                { "role": "user", "content": prompt }
            ]
        }, {
            headers: {
                'Authorization': `Bearer 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`, // Usa tu API Key
                'Content-Type': 'application/json'
            }
        });

        // Devuelve la respuesta de OpenAI al frontend
        res.json({ response: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error comunicándose con OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
