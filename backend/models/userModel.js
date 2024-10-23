const { v4: uuidv4 } = require('uuid');
const db = require('../config/firebase');

// Modelo de usuario con nuevas entidades
exports.createUserModel = async (userId, userData) => {
  try {
    const userRef = db.ref('users/' + userId);
    
    // Generar un código de identificación único
    const userCode = uuidv4();
    
    await userRef.set({
      ...userData,
      userCode, // Asignar código autogenerado
      avatar: "", // Campo para almacenar avatar
      surveyResponses: [], // Array para respuestas de la encuesta
    });
    
    return { message: 'User created successfully with ID', userCode };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar avatar del usuario
exports.updateUserAvatar = async (userId, avatarUrl) => {
  try {
    const userRef = db.ref('users/' + userId);
    await userRef.update({
      avatar: avatarUrl,
    });
    return { message: 'Avatar updated successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};
