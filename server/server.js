//Modules imports
const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');
const router = express.Router();

//Import routes
const user = require('./routes/user');

//Connecting to database
mongoose
  .connect("mongodb://localhost:27017/createuresdb")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//Define express object
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//CORS define
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Routes
app.get('/',function(req,res){
    res.json("Hello World")
})
app.use('/user', user);

//Define listening port and launch app
const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));