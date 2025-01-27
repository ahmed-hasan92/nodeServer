const express = require('express');
const port = 7000;

const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const connection = require('./dataBase');
const salespersonroutes = require('./api/salesperson/salesperson.routes');

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use('/api', salespersonroutes);

app.use(errorHandler);
app.use(notFound);

connection();
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});
