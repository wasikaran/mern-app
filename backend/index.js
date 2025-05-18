const express = require('express');
const connectToMongo = require('./db');
const app = express();
const port = 5000;

connectToMongo();

app.use(express.json()); // Middleware to parse JSON

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Make sure the path starts with "/"
app.use('/api/auth', require('./router/auth'));
app.use('/api/notes', require('./router/notes'));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
