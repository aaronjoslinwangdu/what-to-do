const express = require("express");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;
const connectDatabase = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const verifyJwt = require('./middleware/AuthMiddleware');
const cookieParser = require('cookie-parser');

connectDatabase();

const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true, optionSuccessStatus: 200 }));

// middleware for JSON
app.use(express.json());

// middleware for handling form data
app.use(express.urlencoded({ extended: false }));

// middleware for cookies
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// routes
app.use('/auth', require('./routes/AuthRoutes'));
app.use('/refresh', require('./routes/RefreshTokenRoutes'));

// all routes below this will require jwt verification
app.use(verifyJwt);
app.use('/api/user', require('./routes/UserRoutes'));
app.use('/api/item', require('./routes/ItemRoutes'));


// say hi
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});