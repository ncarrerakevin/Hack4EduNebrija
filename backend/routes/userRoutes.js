const express = require('express');
const { updateUserAvatar } = require('../controllers/userController');

const router = express.Router();

// Ruta para actualizar el avatar del usuario
router.put('/avatar', async (req, res) => {
  const { userId, avatarUrl } = req.body;
  
  try {
    const result = await updateUserAvatar(userId, avatarUrl);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
