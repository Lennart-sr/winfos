require('dotenv').config();
const router = require('express').Router();
const editJsonFile = require('edit-json-file');

const users = editJsonFile(`${__dirname}/../api/authUsers.json`, {
  autosave: true,
});

router.post('/users', async (req, res) => {
  if (req.body.key === process.env.APIKEY) {
    users.data.forEach((u) => {
      u.password = 'Nothing to see around here';
      u.user = 'Nothing to see around here';
    });

    return res.send(users.data);
  }

  res.status(403).send('Não autorizado.');
});

router.post('/user', async (req, res) => {
  const logAuth = users.data.filter(
    (r) => r.link.toLowerCase() === req.body.user.toLowerCase(),
  )[0];

  if (!logAuth) res.status(404).send('Usuário não encontrado.');

  logAuth.password = 'Nothing to see around here';
  logAuth.user = 'Nothing to see around here';

  res.status(302).send(logAuth);
});

router.post('/user/auth', async (req, res) => {
  const resAuth = users.data.find(
    (r) =>
      r.user.toLowerCase() == req.body.user.toLowerCase() &&
      r.password === req.body.password,
  );

  if (!resAuth)
    return res
      .status(404)
      .send('Senha ou usuário não encontrados, verifique o usuario e senha.');
  if (!resAuth.authorized)
    return res.status(403).send('Usuário não autorizado.');

  resAuth.password = 'Nothing to see around here';
  resAuth.user = 'Nothing to see around here';

  res.status(202).send(resAuth);
});

router.post('/user/register', async (req, res) => {
  const { user } = req.body;

  if (
    users.data.findIndex((r) => r.user.toLowerCase() == user.toLowerCase()) >= 0
  )
    return res.status(303).send('Usuário já cadastrado, tente outro.');

  users.data.push(req.body);
  users.save();

  res.sendStatus(201);
});

module.exports = router;
