const express = require("express");
const app = express();
const port = 3000;

let publicUrls = ["/url1", "/url2", "/login"];

function loggerMiddleware(req, res, next) {
  console.log("New request !!!");
  next();
}

function myMiddleware(req, res, next) {
  const requestedUrl = req.path;

  if (publicUrls.includes(requestedUrl)) {
    next();
  } else {
    const authToken = req.headers.authorization;
    if (authToken && authToken === "Bearer 42") {
      next();
    } else {
      //une route GET /restricted1 qui renvoie une erreur 403 si la requête ne contient pas le header “token” avec la valeur 42
      res.status(403).send("Forbidden");
    }
  }
}

app.use(loggerMiddleware, myMiddleware);

app.post("/login", (req, res) => {
  res.json({ token: "42" });
});

app.get("/url1", (req, res) => {
  res.send("URL 1 DIT Bonjour!");
});

app.get("/url2", (req, res) => {
  res.send("URL 2 DIT Bonjour!");
});

app.get("/private/url1", (req, res) => {
  res.send("Coucou, ceci est un secret.");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
