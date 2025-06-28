const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;

connectToMongo();

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Make sure the path starts with "/"
app.use('/api/auth', require('./router/auth'));
app.use('/api/notes', require('./router/notes'));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
