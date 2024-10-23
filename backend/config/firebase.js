const admin = require("firebase-admin");

// Verifica que el archivo de credenciales esté en la ruta correcta
const serviceAccount = require("./hack4edu-6c83c-firebase-adminsdk-c9mcn-4e5c64107b.json");

// Inicializa la aplicación Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hack4edu-6c83c-default-rtdb.firebaseio.com",  // Remover la barra final
});

// Verifica que la inicialización sea correcta
try {
  const auth = admin.auth();  // Asegúrate de que esta función esté disponible
  const db = admin.database();  // Base de datos Realtime
  console.log('Firebase Admin SDK inicializado correctamente');
  module.exports = { db, auth };
} catch (error) {
  console.error('Error al inicializar Firebase Admin SDK:', error);
  throw error;  // Lanza el error para identificar qué está mal
}

