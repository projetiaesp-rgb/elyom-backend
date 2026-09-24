require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

app.use(express.json());

// Page d'accueil du backend
app.get("/", (_req, res) => {
  res.status(200).json({
    service: "ELYOM Backend",
    status: "online"
  });
});

// Vérification du webhook par Meta
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && VERIFY_TOKEN && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Réception des événements Instagram / Messenger / WhatsApp
app.post("/webhook", (req, res) => {
  console.log("Meta webhook event:", JSON.stringify(req.body));
  return res.sendStatus(200);
});

// Callback de connexion professionnelle Instagram
app.get("/auth/instagram/callback", (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("ELYOM - Code Instagram manquant.");
  }

  console.log("Instagram authorization callback received.");

  return res.status(200).send(
    "ELYOM - Autorisation Instagram reçue. Vous pouvez fermer cette fenêtre."
  );
});

// Politique de confidentialité ELYOM
app.get("/privacy", (_req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Politique de confidentialité - ELYOM</title>
    </head>

    <body style="
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    ">

      <h1>Politique de confidentialité – ELYOM</h1>

      <p>
        <strong>Dernière mise à jour :</strong>
        24 septembre 2026
      </p>

      <h2>1. Présentation</h2>

      <p>
        ELYOM propose des services permettant aux entreprises de gérer
        leurs interactions et communications avec leurs clients,
        notamment via Instagram, Messenger et WhatsApp.
      </p>

      <h2>2. Données traitées</h2>

      <p>
        Selon les services utilisés, ELYOM peut traiter les informations
        nécessaires au fonctionnement des communications, telles que
        les identifiants de compte, les messages, les commentaires et
        les informations volontairement transmises lors des échanges.
      </p>

      <h2>3. Utilisation des données</h2>

      <p>
        Les données sont utilisées uniquement afin de fournir les
        fonctionnalités demandées, traiter les demandes des utilisateurs,
        gérer les communications et assurer le fonctionnement et la
        sécurité du service.
      </p>

      <h2>4. Partage des données</h2>

      <p>
        ELYOM ne vend pas les données personnelles.
        Certaines données peuvent être traitées par les plateformes
        et prestataires techniques nécessaires au fonctionnement du service.
      </p>

      <h2>5. Conservation des données</h2>

      <p>
        Les données sont conservées uniquement pendant la durée nécessaire
        aux finalités pour lesquelles elles sont traitées, sous réserve
        des obligations légales applicables.
      </p>

      <h2>6. Suppression des données</h2>

      <p>
        Les utilisateurs peuvent demander la suppression de leurs données
        personnelles en contactant ELYOM à l'adresse indiquée ci-dessous.
      </p>

      <h2>7. Droits des utilisateurs</h2>

      <p>
        Les utilisateurs peuvent demander l'accès, la rectification ou
        la suppression de leurs données personnelles et exercer les autres
        droits prévus par la réglementation applicable.
      </p>

      <h2>8. Services tiers</h2>

      <p>
        ELYOM peut interagir avec des services tiers tels que Meta,
        Instagram, Messenger et WhatsApp. L'utilisation de ces services
        est également soumise aux politiques de confidentialité et
        conditions applicables de leurs fournisseurs respectifs.
      </p>

      <h2>9. Contact</h2>

      <p>
        Pour toute question concernant la confidentialité ou les données
        personnelles :
      </p>

      <p>
        <strong>E-mail :</strong>
        projet.ia.esp@gmail.com
      </p>

    </body>
    </html>
  `);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`ELYOM backend listening on port ${PORT}`);
});
