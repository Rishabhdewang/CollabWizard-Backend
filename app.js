// Express app dependencies.

const express = require("express");
const bodyParser  = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// Express Router Initialize
const router = express.Router();

// Knex and Objection dependencies.
// knex file for database setup. Information regarding databases are stored in this file.
const knexConfig = require("./knexfile");           
const Knex = require("knex");
const { Model } = require("objection");

// Initialize knex.
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(knex);

// Express middlewares { body-parser, cors, morgan... }
const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(router)
  .use(cors({
    credentials: true,
    origin: (origin, callback) => callback(null, true),
  }))
app.use(express.static(path.join(__dirname, 'public')))

// Import API Routes.
const route = require("./routes/Teacher/teacherroute");
app.use('/api',route)


app.use('/', (req, res) => {
  res.json({
    status: true,
    message: 'Welcome to CollabWizard API!',
    code: 200
  });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err || {});
  } else {
    next();
  }
  console.log(err);
});

// Port for Server
const port = process.env.PORT || 5000;

// Express Server 
const server = app.listen(port, () => {
    console.log('Server listening at port %s', port);
  });
  