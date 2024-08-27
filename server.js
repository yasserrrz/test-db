const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('db.json'));

app.listen(5000, () => {
  console.log('Server started on port 5000');
});