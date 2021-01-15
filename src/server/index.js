// Setup empty JS object to act as endpoint for all routes
projectData = {

}
// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

/*Dependencies*/
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));
app.use(express.json({limit:'1mb'}));
app.get('/',function(req,res){
  res.sendfile('dist/index.html')
})

// Setup Server
const port = 9000;
const server = app.listen(port,listening);
function listening(){
  console.log('server running');
  console.log(`running on localhost:${port}`);
};

// Post Route for city
app.post('/addCity',addCity);
function addCity(req,res){
  console.log(req.body);
  
   projectData.date= req.body.date;
   projectData.city = req.body.city;
   projectData.country= req.body.country;
   projectData.longitude= req.body.longitude;
   projectData.latitude = req.body.latitude;
   projectData.content = req.body.content;
}
// post for weather
app.post('/addWeather',addweather);
function addweather(req,res){
  console.log(req.body);
  projectData.weather= req.body.weather;
  //console.log('weather');
}
app.post('/addPhoto',addPhoto);
function addPhoto(req,res){
  console.log(req.body);
  projectData.photoUrl=req.body.photoUrl;
}
app.post('/addCapital',addCapital);
function addCapital(req,res){
  console.log(req.body);
  projectData.name=req.body.name;
}

app.get('/all',getData)
function getData(req,res){
  res.send(projectData);
  console.log(projectData);
}


