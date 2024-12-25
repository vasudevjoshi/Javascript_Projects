const userLocation = document.getElementById('userLocation'),
converter = document.getElementById("converter"),
weatherIcon = document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
feelsLike = document.querySelector(".feelsLike"),
description = document.querySelector(".description"),
date = document.querySelector(".date"),
city = document.querySelector(".city"),
btn = document.getElementById("button"),
HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSValue"),
CValue = document.getElementById("CValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue");
console.log(userLocation);

const WEATHER_API_ENDPOINT = 'http://api.weatherapi.com/v1/current.json?key=a91701bf7dfb43e88b0100210242212&q=';
btn.addEventListener("click",()=>{
    let loc = userLocation.value;
    if(loc ==""){ 
        alert("ENTER THE PLACE VALUE");
        return;
    }
    findUserLocation(loc);
});
function findUserLocation(loc) {
    fetch(WEATHER_API_ENDPOINT + loc)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            city.innerHTML = data.location.name+ "," + data.location.region;
            let link = data.current.condition.icon;
            // console.log(link);
            // const urlRegex = /(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/\w.-]*)*/g;
            weatherIcon.style.background  = 'url(//cdn.weatherapi.com/weather/64x64/night/116.png)';
            temperature.innerHTML = data.current.temp_c;
            feelsLike.innerHTML = "Feels like, "  + data.current.feelslike_c + " C";
            description.innerHTML = '<i class="fa-brands fa-cloudversify"></i> &nbsp' + data.current.condition.text;
            HValue.innerHTML = Math.round(data.current.humidity) + '<span>%</span>';
            WValue.innerHTML = data.current.wind_kph + '<span>m/s</span>';
            CValue.innerHTML = data.current.cloud + '<span>%</span>';
            UVValue.innerHTML = data.current.uv;
            PValue.innerHTML = data.current.pressure_mb + '<span>&nbsp hPa</span>';
            console.log("Weather Data:", data);
        })
        .catch((error) => {
            console.error("Error fetching the weather data:", error);
        });
}

// Call the function to fetch and log the weather data
