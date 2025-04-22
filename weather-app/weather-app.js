
const apiKey = "d9c1a4603e9c90bd3fb43db001f68315";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//Selecting the elements searched

const weatherIcon= document.querySelector(".weather-icon");
const todayWeatherImage = document.querySelector('.weather-image img');
const todayWeatherTemperature = document.querySelector(".weather-temperature");
const todayWeatherName = document.querySelector(".weather-name");
const todayWeatherDate = document.querySelector(".weather-date");
const todayWeatherCity = document.querySelector(".weather-city");

//Buttons Elements

const searchInput = document.querySelector("#search-value");
const searchBtn= document.querySelector("#search-btn");

const changeToCelcious = document.querySelector("#celcious");
const changeToFahrenheit = document.querySelector("#fahrenheit");

//Selecting Future Elements

//Next Day
const nextWeatherDate = document.querySelector(".next-day .next-day-date");
const nextDayWeatherImage = document.querySelector(".next-day .next-day-weather-img img");
const nextDayWeatherTemperature = document.querySelector(".next-day .next-weather-temperature");

//Second Day After Next Day

const secondWeatherDate = document.querySelector(".second-day .second-day-date");
const secondDayWeatherImage = document.querySelector(".second-day .second-day-weather-img img");
const secondWeatherTemperature = document.querySelector(".second-day .second-weather-temperature");

//Third Day From the Next Day

const thirdWeatherDate = document.querySelector(".third-day .third-day-date");
const thirdDayWeatherImage = document.querySelector(".third-day .third-day-weather-img img");
const thirdDayWeatherTemperature = document.querySelector(".third-day .third-weather-temperature");

//Wind And Humidity Information

const windSpeed = document.querySelector('.wind-speed')
const humidityPercentage = document.querySelector('.humidity-percentage')

//https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}
//  
let time = new Date().getTime().toString();
let dayMilliseconds =  86400000;

//console.log(Number(time) + (dayMilliseconds));
let api2 = `https://api.openweathermap.org/data/2.5/weather?q=nairobi&appid=${apiKey}`

//let api = `https://api.openweathermap.org/data/2.5/weather?q=nairobi&dt=${time}&appid=${apiKey}`

async function nowWeather() {
     let a = await fetch(api)
     let r = await a.json();
     //console.log(new Date(r.dt).toDateString());
     console.log(r)
     //console.log(new Date(time - r.dt).toLocaleTimeString())

     // let weather = r.weather[0].main;
     // let weatherDesc = r.weather[0].description;
     // let windSpeed =  r.wind.speed
     // let windDeg = r.wind.deg;
     // let windgust = r.wind.gust;
     // let country = r.sys.country;
     // let countrySunrise = new Date(r.sys.sunrise).toUTCString();
     // let countrySunset = new Date(r.sys.sunset).toUTCString();

     // console.log(
     //      "Weather: ", weather,
     //      "\nWeatherDesc: ", weatherDesc,
     //      "\nWindSpeed: ", windSpeed,
     //      "\nWindDeg: ", windDeg,
     //      "\nWindGust: ", windgust,
     //      "\nCountry: ", country, 
     //      "\nCountrySunrise: ", countrySunrise,
     //      "\nCountrySunSet: ", countrySunset
     // )
}

//nowWeather();

//console.log(typeof Date.now())


let times = []

for(let i = Date.now(); i <= (Date.now() + (dayMilliseconds * 3)); i += dayMilliseconds){
     
     let api2 = `https://api.openweathermap.org/data/2.5/weather?q=nairobi&dt=${i}&appid=${apiKey}`
     
     async function nowWeather2() {
     let a = await fetch(api2)
     let r = await a.json();
          //console.log(typeof new Date(i).toDateString());
     

      todayWeatherName.textContent = r.weather[0].main;
      todayWeatherCity.textContent = r.name;
      todayWeatherTemperature.innerHTML = r.main.temp+"°C"
      //console.log(times)
     // let weatherDesc = r.weather[0].description;
     // let windTemp = r.weather[0].main.temp
 
     // console.log(
     //      `
     //      \nThere will be ${weather} at ${times}, weather description ${windTemp}
     //      `
     // )

     //console.log(r)

     
}

//nowWeather2();

nowWeather2();

//console.log(i);
//console.log(new Date(i));
}
//console.log(times)

//nowWeather2();
//console.log(document.querySelectorAll('input[type="radio"]'));
document.querySelectorAll('input[type="radio"]').forEach (
     (element) => {
          element.addEventListener('click', () => {
               if(element.checked){
               console.log(element.id)
               }
               else{
                    console.log(element.id, " Not")
               }
          })
     }
)






/*

async function checkWeather(city){
          const response = await fetch(apiUrl + city + `
          &appid=${apiKey}`);

          if(response.status == 404){
                    document.querySelector(".error").style.display = "block"
                    document.querySelector(".weather").style.display = "none"
          }
          else{

          
          var data = await response.json();

          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML = Math.round(data.main.temp )+ "°c";
          document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
          document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

          if(data.weather[0].main == "Clouds"){
                   weatherIcon.src = "images/clouds.png";
          }
          else if(data.weather[0].main == "Clear"){
                    weatherIcon.src = "images/clear.png";
          }
          else if(data.weather[0].main == "Rain"){
                    weatherIcon.src = "images/rain.png";
          }
          else if(data.weather[0].main == "Drizzle"){
                    weatherIcon.src = "images/drizzle.png";
          }
          else if(data.weather[0].main == "Mist"){
                    weatherIcon.src = "images/mist.png";
          }

          document.querySelector(".weather").style.display = "block";
          document.querySelector(".error").style.display = "none";
}
}

searchBtn.addEventListener("click", () => {
          checkWeather(searchBox.value);
})

*/