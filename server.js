import express from "express";
import bodyParser from "body-parser"
import path, { dirname } from "path"
import { fileURLToPath } from 'url';

import { checkAuth } from "./middleware/auth.js";
import routes from "./routes/index.js"

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(checkAuth);

app.use('/', routes);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/public', express.static(path.join(__dirname, '/public')));

export const server = app;


