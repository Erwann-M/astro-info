const axiosNasa = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: "https://api.nasa.gov/"
})

// axiosInstance.defaults.headers['X-API-KEY'] = "CziPa1hyfrksQn2clWgcQIyxxcb5d14RRzAFw9RY"
const imageContainer = document.querySelector(".nasa-image-container")

axiosNasa.get("planetary/apod?api_key=CziPa1hyfrksQn2clWgcQIyxxcb5d14RRzAFw9RY")
    .then(function(data) {
        const image = document.createElement("img")
        image.src = data.data.url
        image.className = "nasa-image__image"
        imageContainer.append(image)
    })
    .catch(function(error) {
        alert("Une erreur est survenu, veuillez réessayer plus tard.")
        console.log(error);
    })


const authString = btoa(`69aac2a5-67e3-4395-a0cd-5c47666483e5:8386000fc8ededb6713d447b56be4d697b4356e5c1a7792cc097275a357f8939f6715eb721c6f8164996875ea174b2dc3f0b9386c273ad6373c6d04c064b25b18cf8e9addd1e4827265e1c2f636d6005873962949b7803dd24a55483448615735298d1d40406c0c626efcf38c22b8bd1`);

const basicAuth = "Basic " + authString;

const urlMoon = "https://api.astronomyapi.com/api/v2/studio/moon-phase";
const axiosMoon = axios.create({
    headers: {
        "Authorization": basicAuth
    }
})

let latitude = 0
let longitude = 0

function success(pos) {
    var crd = pos.coords;
  
    console.log("Votre position actuelle est :");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    latitude = crd.latitude;
    longitude = crd.longitude;
  }
  
  function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
  }

const Geolocation = navigator.geolocation
Geolocation.getCurrentPosition(success, error);

console.log("latitude: " + latitude);

let date = new Date().toJSON().slice(0, 10);

axiosMoon.post(urlMoon, {
        "format": "png",
        "style": {
            "moonStyle": "default",
            "backgroundStyle": "stars",
            "backgroundColor": "white",
            "headingColor": "white",
            "textColor": "white"
        },
        "observer": {
            "latitude": latitude,
            "longitude": longitude,
            "date": date
        },
        "view": {
            "type": "portrait-simple",
            "orientation": "south-up"
        }
})
    .then(function(data) {
        const moonContainer = document.querySelector(".moon-container");
        const moonImage = document.createElement("img");
        moonImage.src = data.data.data.imageUrl;
        moonContainer.append(moonImage);
    })
    .catch(function(error) {
        console.log(error);
    })

const ApiKey = "188de08062cfcd2f05064467da11f7dd"
weatherUrl = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${ApiKey}`
axios.get(weatherUrl)
    .then(function(data){
        console.log(data);
    })