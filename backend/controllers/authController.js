const { auth } = require('../config/firebase');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Crea el usuario usando Firebase Admin SDK
    const userRecord = await auth.createUser({
      email,
      password,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: userRecord,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};


exports.loginUser = async (req, res) => {
    const { token } = req.body; // El frontend debería enviar el token de ID de Firebase
  
    try {
      // Verifica el token enviado por el frontend
      const decodedToken = await auth.verifyIdToken(token);
      res.status(200).json({
        message: 'User authenticated successfully',
        uid: decodedToken.uid, // Puedes devolver el uid del usuario
      });
    } catch (error) {
      res.status(401).json({
        error: 'Invalid token',
      });
    }
  };