import express from "express";

//Middleware
import { checkAuth, ensureAuth } from "./middleware/auth.js";

//Router
import profileRouter from "./routes/profiles.js"

const PORT = 8080 || process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkAuth);

//Routes
app.use('/profiles', profileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ...`);
})