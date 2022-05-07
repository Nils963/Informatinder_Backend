import express from "express";

import { checkAuth } from "./middleware/auth.js";
import routes from "./routes/index.js"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(checkAuth);

app.use('/', routes);

export const server = app;


