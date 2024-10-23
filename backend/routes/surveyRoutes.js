const express = require('express');
const { saveSurvey, getUserSurveys, getSurvey } = require('../controllers/surveyController');

const router = express.Router();

// Ruta para guardar una nueva encuesta
router.post('/', saveSurvey);

// Ruta para obtener todas las encuestas de un usuario
router.get('/user/:userId', getUserSurveys);

// Ruta para obtener una encuesta por su ID
router.get('/:surveyId', getSurvey);

module.exports = router;
