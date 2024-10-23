const db = require('../config/firebase');

// Crear nueva encuesta para un usuario
exports.createSurvey = async (userId, surveyData) => {
  try {
    const surveyRef = db.ref('surveys').push();  // Crear una referencia única para la encuesta
    await surveyRef.set({
      userId,
      questions: surveyData.questions,  // Preguntas y respuestas
      completedAt: Date.now(),  // Fecha en la que se completó la encuesta
    });
    return { message: 'Survey created successfully', surveyId: surveyRef.key };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener todas las encuestas de un usuario
exports.getSurveysByUser = async (userId) => {
  try {
    const surveysRef = db.ref('surveys').orderByChild('userId').equalTo(userId);
    const snapshot = await surveysRef.once('value');
    const surveys = snapshot.val();
    return surveys ? surveys : [];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener una encuesta por su ID
exports.getSurveyById = async (surveyId) => {
  try {
    const surveyRef = db.ref('surveys/' + surveyId);
    const snapshot = await surveyRef.once('value');
    const survey = snapshot.val();
    return survey ? survey : null;
  } catch (error) {
    throw new Error(error.message);
  }
};
