const express = require("express");
const app = express();

// Middleware pour logger les requêtes
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Appel de next() pour passer au middleware suivant
  next();
};

// Utilisation du middleware pour toutes les requêtes entrantes
app.use(loggerMiddleware);

// Route de test
app.get("/", (req, res) => {
  res.send("Bonjour, ceci est la page d'accueil !");
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
