require('dotenv').config();

const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const app = express();
const PORT = 9000;

const actionsRoute = require('./routes/Actions');
const usersRoute = require('./routes/Users');

app.use(express.json());

const staticFileMiddleware = express.static(__dirname + '/dist');

app.use(staticFileMiddleware);

const historyMiddleware = history({
  disableDotRule: true,
  verbose: true
});

app.use((req, res, next) => {
    historyMiddleware(req, res, next);
});

app.use(staticFileMiddleware);

app.use('/actions', actionsRoute);
app.use('/', usersRoute);

app.listen(PORT, () => {
  console.log('[APP] Aberto na porta ' + PORT);
});