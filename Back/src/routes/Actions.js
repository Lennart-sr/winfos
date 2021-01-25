const router = require('express').Router();
const editJsonFile = require('edit-json-file');

const users = editJsonFile(`${__dirname}/../database/Users.json`, {
  autosave: true,
});

function isAuthorized(req, res, next) {
  if(!["::1", "::ffff:127.0.0.1"].includes(req.connection.remoteAddress))
    return res.sendStatus(401)
  next()
}

router.get('/users', isAuthorized, (req, res) => {
  users.data.forEach((u) => {
    u.password = 'Nothing to see around here';
    u.user = 'Nothing to see around here';
  });

  res.send(users.data);
});

router.get('/auth', isAuthorized, ({ query: user }, res) => {
  const resAuth = users.data.find(
    (r) =>
      r.user.toLowerCase() == user.user.toLowerCase() &&
      r.password === user.password,
  );
  
  if (!resAuth)
    return res
      .status(404)
      .send('Senha ou usuário não encontrados, verifique o usuario e senha.');
  if (!resAuth.authorized)
    return res.status(403).send('Usuário não autorizado.');

  res.status(202).send(resAuth);
});

module.exports = router;
