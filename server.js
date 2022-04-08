import express from "express";
import db from "./db.js"

//Middleware
import { checkAuth, ensureAuth } from "./middleware/auth.js";

//Router
import profileRouter from "./routes/profiles.js"
import userRouter from "./routes/user.js"

async function init() {
  db.authenticate()
    .then(() => {
      console.log('DB connected');
    })
    .catch(err => {
      console.log("DB err", err)
    })

  const PORT = 8080 || process.env.PORT;
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(checkAuth);

  //Routes
  app.use('/profiles', profileRouter);
  app.use('/user', userRouter);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ...`);
  })

}

await init();


