const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const namesController = require('./src/namesController');
// const aiController = require('./src/openaiController.ai');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json()); //used for POST/PUT
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); //used for POST/PUT

app.get('/names', namesController.index);
app.get('/names/:id', namesController.show);
// app.get('/openai', aiController.ai);
app.post('/names', namesController.create);
app.put('/names/:id', namesController.update);
app.delete('/names/:id', namesController.destroy);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
