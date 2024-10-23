const { createSurvey, getSurveysByUser, getSurveyById } = require('../models/surveyModel');

// Guardar respuestas de la encuesta
exports.saveSurvey = async (req, res) => {
  const { userId, surveyData } = req.body;
  
  try {
    const result = await createSurvey(userId, surveyData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las encuestas de un usuario
exports.getUserSurveys = async (req, res) => {
  const { userId } = req.params;

  try {
    const surveys = await getSurveysByUser(userId);
    res.status(200).json(surveys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener una encuesta por ID
exports.getSurvey = async (req, res) => {
  const { surveyId } = req.params;

  try {
    const survey = await getSurveyById(surveyId);
    if (survey) {
      res.status(200).json(survey);
    } else {
      res.status(404).json({ message: 'Survey not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
