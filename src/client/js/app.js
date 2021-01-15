

tripData= {};
// Create a new date instance dynamically with JS
var d = new Date();
var newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

var lng=0;
var lat=0;
   
// initialize url / key weatherbt
const secretKey = 'cd07aeccef54435c97939484270382cf';

var baseUrl = 'http://api.weatherbit.io/v2.0/current?';
var finalUrl = `http://api.weatherbit.io/v2.0/current?lat=${self.lat}&lon=${self.lon}&key=${secretKey}`

// intailize url restcountries




// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener
function performAction(e){

    console.log('clicked')
    var cityName =  document.getElementById('city').value;
    var capital =  document.getElementById('capitalCity').value;
    var url = `https://restcountries.eu/rest/v2/capital/${capital}`

   


    
     
    getCityCoordinates(geonamesEP, cityName, userName)

	.then(function(data) {
		console.log(data);
        //Add data to POST request
        self.lat = data.geonames[0].lat ; 
        self.lon =  data.geonames[0].lng ;
        
        postCityData('/addCity', {date:d, city:data.geonames[0].name, country:data.geonames[0].countryName, longitude:data.geonames[0].lng, latitude:data.geonames[0].lat});
        console.log(`the lon is ${self.lon}`); 
        var x = `http://api.weatherbit.io/v2.0/current?lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=${secretKey}`

        getForecast(x)
       .then(function(weatherData) {
        
    })
    getPhoto(pixabayEP,key)
    .then(function(photoData) {
       
    })
   
  
    
    getcapital(url)
    .then(function(capitalData) {
     
 })
    })

   

};

var pixabayEP = 'https://pixabay.com/api/?';
const key = 'key=15828808-948bc1ac9c3899d078bda57be';

/*function to get photo api data */
var getPhoto = async (pixabayEP,key)=>{
   

   
    var res = await fetch(pixabayEP+key)
    try {
        var photoData = await res.json();
        console.log(photoData);
        //Add data to POST request
        postPhotoData('/addPhoto', {photoUrl:photoData.hits[0].largeImageURL})
        updateUI();
        }catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}



/* function to get getForecast */   
var getForecast = async (finalUrl)=>{
   

   
    var res = await fetch(finalUrl)
    try {
        var weatherData = await res.json();
        console.log(weatherData);
        postWeatherData('/addWeather', {weather:weatherData.data[0].weather.description})
        updateUI();
        
        
    }catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

/* function to get getCapital */   
var getcapital = async (Url)=>{
   

   
    var res = await fetch(Url)
    try {
        var capitalData = await res.json();
        console.log(capitalData);
        postCapitalData('/addCapital', {name:capitalData[0].languages[0].name})
        updateUI();
        
        
    }catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

/* Function to POST weather data to Server*/

var postWeatherData = async ( url = '', weatherData = {})=>{
    console.log(weatherData);
    var response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    // Body data type must match "Content-Type" header
        body: JSON.stringify(weatherData),
    });

    try {
        var newData = await response.json();  // parses JSON response into native JavaScript objects
        console.log(newData);
        
    }catch(error) {
        console.log("error", error);
        }
}



/* Function to POST Photo data to Local Server*/

var postPhotoData = async ( url = '', photoData = {})=>{
    console.log(photoData);
    var response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    // Body data type must match "Content-Type" header
        body: JSON.stringify(photoData),
    });

    try {
        var newData = await response.json();  // parses JSON response into native JavaScript objects
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
        }
}


// End point & Username for GeoNames API

var geonamesEP = 'http://api.geonames.org/searchJSON?formatted=true&q=';
var userName = '&username=michaelfawzy';
  

/* Function to GET Geonames API Data*/
var getCityCoordinates = async (geonamesEP, city, key)=>{

	var res = await fetch(geonamesEP+city+key)
	try {
        // Transform into JSON
		var data = await res.json();
        return data;
        updateUI();
	}catch(error) {
    	console.log("error", error);
    	// appropriately handle the error
	}
}


/* Function to POST City data */

var postCityData = async ( url = '', data = {})=>{
	console.log(data);
	var response = await fetch(url, {
    	method: 'POST',
    	credentials: 'same-origin',
    	headers: {
        	'Content-Type': 'application/json',
    	},
    // Body data type must match "Content-Type" header
    	body: JSON.stringify(data),
    });

    try {
    	var newData = await response.json();  // parses JSON response into native JavaScript objects
    	console.log(newData);
    }catch(error) {
    	console.log("error", error);
    	}
}

/* Function to POST Capital data */

var postCapitalData = async ( url = '', Capital = {})=>{
	console.log(Capital);
	var response = await fetch(url, {
    	method: 'POST',
    	credentials: 'same-origin',
    	headers: {
        	'Content-Type': 'application/json',
    	},
    // Body data type must match "Content-Type" header
    	body: JSON.stringify(Capital),
    });

    try {
    	var capitalData = await response.json();  // parses JSON response into native JavaScript objects
    	console.log(capitalData);
    }catch(error) {
    	console.log("error", error);
    	}
}
/* Function to GET All Project Data from server */

var updateUI = async () => {
    var request = await fetch('/all');
    try{
        var allData = await request.json();
        
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('longitude').innerHTML = `longitude: ${allData.longitude}`;
        document.getElementById('latitude').innerHTML = `latitude: ${allData.latitude}`;
        document.getElementById('country').innerHTML = `country: ${allData.country}`;
        document.getElementById('weather').innerHTML = `weather: ${allData.weather}`;
        document.getElementById('Capital').innerHTML = `languages: ${allData.name} <br> Photo URL: <img src="${allData.photoUrl}">`
        tripData.longitude = allData.longitude;
        tripData.latitude = allData.latitude;
      }catch(error){
        console.log("error", error);
      }
}




module.exports = {performAction, getCityCoordinates, postCityData, updateUI, getForecast };