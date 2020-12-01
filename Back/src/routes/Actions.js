const router = require('express').Router();
const editJsonFile = require('edit-json-file');
const users = editJsonFile(`${__dirname}/../database/Users.json`, {
  autosave: true
});

router.post('/update', async (req, res) => {
  const index = users.data.findIndex(r=> r.user === req.body.user);
  if(index < 0) return res.status(404).send("Usuário encontrado.");

  if(req.body.link && !users.data[index].link){
    if(users.data.findIndex(r => r.link === req.body.link) >= 0)
      return res.status(303).send("Este link já está sendo usado.");

    users.data[index].link = req.body.link
    users.save()

    return res.sendStatus(200);
  }
  
  users.data[index] = req.body;
  users.save()
  
  res.sendStatus(200);
});

router.post('/delete', async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
