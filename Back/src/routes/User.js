const router = require('express').Router();
const editJsonFile = require('edit-json-file');

const users = editJsonFile(`${__dirname}/../database/Users.json`, {
  autosave: true
});

router.put('/', async ({ body: user }, res) => {
  const index = users.data.findIndex(r=> r.user === user.user);

  if(index < 0) return res.status(404).send("Usuário não encontrado.");

  if(user.link && !users.data[index].link){
    if(users.data.findIndex(r => r.link === user.link) >= 0)
      return res.status(303).send("Este link já está sendo utilizado.");

    users.data[index].link = user.link
    users.save()

    return res.sendStatus(200);
  }
  
  users.data[index] = user;
  users.save()
  
  res.sendStatus(200);
});

router.get('/', ({ query: user }, res) => {
  const logAuth = users.data.filter(
    (r) => r.link.toLowerCase() === user.user.toLowerCase(),
  )[0];

  if (!logAuth) res.status(404).send('Usuário não encontrado.');

  logAuth.password = 'Nothing to see around here';
  logAuth.user = 'Nothing to see around here';

  res.status(302).send(logAuth);
});

router.post('/', ({ body: user }, res) => {
  if (
    users.data.findIndex((r) => r.user.toLowerCase() == user.user.toLowerCase()) >= 0
  )
    return res.status(303).send('Usuário já cadastrado, tente outro.');

  users.data.push(req.body);
  users.save();

  res.sendStatus(201);
});

module.exports = router;
