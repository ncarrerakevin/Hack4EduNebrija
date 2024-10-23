const db = require('../config/firebase');

// Actualiza el progreso del usuario
exports.updateUserProgress = async (req, res) => {
  const { userId, progressData } = req.body;

  try {
    const userRef = db.ref('users/' + userId);
    await userRef.set(progressData, { merge: true });
    res.status(200).json({ message: 'User progress updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtiene el progreso del usuario
exports.getUserProgress = async (req, res) => {
  const userId = req.params.id;

  try {
    const userRef = db.ref('users/' + userId);
    userRef.once('value', (snapshot) => {
      const data = snapshot.val();
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
