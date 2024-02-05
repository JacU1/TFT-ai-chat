require('dotenv').config();

const infoData = require("./insert-data");
infoData.insertData();

const express = require('express');
const cors = require('cors');
const needle = require('needle');
const apiCache = require('apicache');
const rateLimit = require('express-rate-limit');
const http = require("http");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;

const app = express();

// Middleware
app.use(morgan("dev"));

//JSON parser
app.use(express.json());

//Rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20
});

app.use(limiter);
app.set('trust proxy', 1);

//CORS
app.use(cors());
app.options('*');

//Env variables
const SB_API_URL = process.env.SB_API_URL;
const SB_API_KEY = process.env.SB_API_KEY;

//Init cache
let cache = apiCache.middleware;

app.post('/api/userQuestion', cache('2 minutes') , async (req,res) => {
  const reqBody = req.body.sender;
  console.log(reqBody);
  try {
      // await needle('post', `${API_BASE_URL}`, JSON.stringify({
          
      // }), { headers : { 'api-key' : API_KEY, 'accept': 'application/json' } });
      res.status(200).json({'status':'200', 'message': 'Mail send successfully', 'type': 'succeed'});   
  } catch (error) {
      res.status(500).json({error});
  }
});

// serve the API on 80 (HTTP) port
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log('HTTP Server running on port' + ' ' +PORT);
});