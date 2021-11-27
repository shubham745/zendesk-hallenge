// server/index.js

const express = require("express");
const ticketsController = require("./ticketsController").default;
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/v1/tickets",ticketsController.get);





