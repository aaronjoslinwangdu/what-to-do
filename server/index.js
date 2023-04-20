const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;
const connectDatabase = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use('/api/item', require('./routes/ItemRoutes'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});