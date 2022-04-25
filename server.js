import express from "express";
import db from "./db.js"

import { checkAuth } from "./middleware/auth.js";
import routes from "./routes/index.js"

async function init() {
  db.authenticate()
    .then(() => {
      console.log('DB connected');
    })
    .catch(err => {
      console.log("DB err", err)
    })

  const PORT = process.env.PORT || 8080;
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ extended: true }));
  app.use(checkAuth);

  app.use('/', routes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ...`);
  })
}

init();


