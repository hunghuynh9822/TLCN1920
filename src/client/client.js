const path = require('path');
console.log("HOST : " + process.env.SERVER_HOST)
console.log("HOST AUTH : " + process.env.SERVER_HOST_AUTH)
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const cors = require('cors');

//app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:8003',
//   credentials: false
// }));

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8003');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use('/', express.static(`${__dirname}/dist`));

// express will serve up index.html if it doesn't recognize the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));