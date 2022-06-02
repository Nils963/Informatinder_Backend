import express from "express";
import bodyParser from "body-parser"

import { checkAuth } from "./middleware/auth.js";
import routes from "./routes/index.js"

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(checkAuth);

app.use('/', routes);

export const server = app;


