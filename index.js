const config = require('./config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./src/modules/router/index');
const errorMiddleware = require('./src/modules/middlewares/error-middleware');

const PORT = config.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(config.corsOptions));
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(config.URL, config.launchOptions);
    app.listen(PORT, () => console.log(`Running port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
}

start();