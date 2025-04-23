
document.querySelector('.spinner-container').style.display = 'none'
document.querySelector('.weather-container').style.display = 'flex'

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

//Wind And Humidity Information

const currentWindSpeed = document.querySelector('.atmospheric-conditions .wind-status .wind-speed')
const humidityPercentage = document.querySelector('.humidity-percentage')
const humidityBarPercentage = document.querySelector('.humidity-bar-data');

let weatherPic;
let  a;
let r;
let api2;
let badMessage;

api2 = `https://api.openweathermap.org/data/2.5/forecast?q=nairobi&appid=${apiKey}&units=metric`


//°F = (°C × 9/5) + 32
let inputId = document.querySelector('input[type="radio"]:checked').id;
let measuresRadio = document.querySelectorAll('input[type="radio"]');

measuresRadio.forEach (
     (radio) => {
          radio.addEventListener('change', function () {
               if(this.checked){
                    inputId = this.id

                    if(inputId == 'fahrenheit'){
                         document.querySelector(".weather-container").textContent = " "
                         nowWeather(api2 = `https://api.openweathermap.org/data/2.5/forecast?q=nairobi&appid=${apiKey}&units=imperials`)
                    }
                    // else if(inputId == 'celcius'){
                         
                    // }
                    
               }
          })
     }
)

function changeMeasures(temp1){
     
}


const nowWeather = async (api2) => {
     //const start = performance.now();
     try{
     a = await fetch(api2)
     r = await a.json();
     //const end = performance.now();
     //apiTime = (end - start)
     //console.log(r)
     //console.log("Weather Today: ", r)
     //console.log(Date.now())
     //console.log("Start: ",  start, "\nEnd: ", end, "Total : ", (end - start) )
     if(r.cod >= 400){
          badMessage = r.message;
          console.log(r)
          return
     }
     else{
     let defaultData = r.list[0]
     let city_name = r.city.name;
     let temp = defaultData.main.temp+"°C"
     let weather = defaultData.weather[0].main;
     let weatherDesc = defaultData.weather[0].description;
     let windSpeed = defaultData.wind.speed;
     let humidity = defaultData.main.humidity
     let date2 = new Date(defaultData.dt * 1000).toDateString();

     displayCorrectImages(weather);

     todayWeatherImage.src = weatherPic;
     
     todayWeatherDate.textContent = date2;
     todayWeatherName.textContent = weather;
     todayWeatherCity.textContent = city_name;
     todayWeatherTemperature.innerHTML = temp
     currentWindSpeed.textContent = windSpeed + "Km/hr";
     humidityPercentage.textContent = humidity+'%';
     humidityBarPercentage.style.width = humidity+'%'

     displayFutureWeather()

     }
     }
     catch(error){
          console.log(error)
          document.querySelector(".weather-container").style.height = '100vh'
          document.querySelector(".weather-container").innerHTML = `
                    <div>
                         <h1>No City Matches Your Query </h1>
                         <button onclick="location.reload()" style=" padding: 1rem; cursor: pointer"> Search Again </button>
                    </div>
          `;
     }
    
}

nowWeather(api2);
function displayFutureWeather(){

     
     for(let i = 9; i <= r.list.length -1; i += 8){
          let constData = r.list[i]
          let temp = constData.main.temp
          let weather = constData.weather[0].main;
          let weatherDesc = constData.weather[0].description;
          displayCorrectImages(weather)
          let date = new Date(constData.dt * 1000).toDateString();
     
      document.querySelector('.future-weather').innerHTML += 
                    `
                    <div class="next-day" style=" min-width: 300px">
                         <h2 class="next-day-date">${date}</h2>
                         <div class="next-day-weather-image"><img src="${weatherPic}" alt=""></div>
                         <h3  class="next-weather-temperature" > ${temp+"°C"}</h3>
                         <h3  class="next-weather-temperature "style=" margin: 1rem 0" > ${weather}</h3>
                         <h3  class="next-weather-temperature" style=" text-transform: capitalize; margin-bottom: 1rem"> ${weatherDesc}</h3>
                    </div>
                    `

     }
}

function displayCorrectImages(weather){
     if(weather == "Clouds"){
                   weatherPic = "images/clouds.png";
          }
          else if(weather == "Clear"){
                    weatherPic = "images/clear.png";
          }
          else if(weather == "Rain"){
                    weatherPic = "images/rain.png";
          }
          else if(weather == "Drizzle"){
                    weatherPic = "images/drizzle.png";
          }
          else if(weather == "Mist"){
                    weatherPic = "images/mist.png";
          }
}

//User Search Button Functionality

searchBtn.addEventListener('click', 
     () =>{

          let userInputLocationValue = searchInput.value;

          if(userInputLocationValue == "" || userInputLocationValue == " "){
               return
          }
          let userInputLocation = `https://api.openweathermap.org/data/2.5/forecast?q=${userInputLocationValue}&appid=${apiKey}&units=metric`
          document.querySelector('.future-weather').innerHTML = "";
          nowWeather(userInputLocation)

          searchInput.value = "";
     }
)
