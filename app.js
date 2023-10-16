const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const productRoutes = require('./routes/productRoutes');

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path} at ${new Date()}`);
  next();
});

app.use('/', productRoutes);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
