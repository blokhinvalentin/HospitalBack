require('dotenv').config();

const URL = process.env.URL;
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
  credentials: true,
  origin: CLIENT_URL
};
const launchOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = {
  URL,
  PORT,
  CLIENT_URL,
  corsOptions,
  launchOptions
}