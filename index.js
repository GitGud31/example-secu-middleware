const express = require("express");
const app = express();
const port = 3000;

let publicUrls = ["/url1", "/url2", "/login"];

const { getRegisteredUsers } = require("./inMemoryUserRepository");

const checkCredentials = (email, password) => {
  const users = getRegisteredUsers();
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

const generateRandomToken = () => {
  const tokenLength = 10;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

function loggerMiddleware(req, res, next) {
    console.log("New request !!!");
    next();
  }

let globalToken = null;

const logHeadersMiddleware = (req, res, next) => {
  console.log("Contenu des en-têtes de la requête :");
  console.log(req.headers);
  next();
};

const authorizationMiddleware = (req, res, next) => {
  const clientToken = req.headers.authorization;

  if (clientToken === globalToken) {
    next();
  } else {
    res.status(403).json({ message: "Accès non autorisé" });
  }
};

app.use(loggerMiddleware, logHeadersMiddleware, myMiddleware);

app.post("/authenticate", (req, res) => {
  const { email, password } = req.body;
  const user = checkCredentials(email, password);

  if (user) {
    const token = Math.random().toString(36).substr(2); // Génère une chaîne aléatoire
    res.json({
      success: true,
      message: "Authentification réussie",
      token: token,
    });
  } else {
    res.status(401).json({ success: false, message: "Identifiants invalides" });
  }
});

app.get("/url1", (req, res) => {
  res.send("URL 1 DIT Bonjour!");
});

app.get("/url2", (req, res) => {
  res.send("URL 2 DIT Bonjour!");
});

app.get("/private/url1", authorizationMiddleware, (req, res) => {
  res.send("PRIVATE/URL1 Coucou, secret");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
