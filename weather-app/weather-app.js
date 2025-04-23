
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

const currentWindSpeed = document.querySelector('.atmospheric-conditions .wind-status .wind-speed')
const humidityPercentage = document.querySelector('.humidity-percentage')
const humidityBarPercentage = document.querySelector('.humidity-bar-data');

//https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}
//  
let weatherPic;
let  a;
let r;
let api2;
 let badMessage;
// let badMessageCity;

let y = searchInput.value || "nairobi";
     api2 = `https://api.openweathermap.org/data/2.5/forecast?q=nairobi&appid=${apiKey}&units=metric`


//°F = (°C × 9/5) + 32

const nowWeather = async (api2) => {
     try{
     a = await fetch(api2)
     r = await a.json();
     console.log(r)
     //console.log("Weather Today: ", r)
     //console.log(Date.now())
     if(r.cod >= 400){
          badMessage = r.message;
          return
     }
     else{
     let defaultData = r.list[0]
     let city_name = r.city.name;
     let temp = defaultData.main.temp
     let weather = defaultData.weather[0].main;
     let weatherDesc = defaultData.weather[0].description;
     let windSpeed = defaultData.wind.speed;
     let humidity = defaultData.main.humidity
     let date = defaultData.dt_txt;
     let date2 = new Date(defaultData.dt * 1000).toDateString();
     //console.log(length)
     
     // console.log(
          
     //      `
     //      City Name: ${} \n
     //      Temp: ${} \n
     //      Weather: ${} \n
     //      Date: ${date}  \n
     //      Date 2: ${} \n
     //      Weather Desc: ${weatherDesc} \n
     //      Wind Speed: ${windSpeed} \n
     //      Humidity: ${humidity}
     //      `
     // )
     
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

          document.querySelector(".weather-container").style.height = '100vh'
          document.querySelector(".weather-container").innerHTML = `
                    <div>
                    <h1>No City Matches Your Query </h1>
                    </br>
                    <button onclick="location.reload()</div>"
                    style=" padding: 1rem; cursor: pointer "
                    >Search Again
                    </button>
          `;
     }
     //console.log(r)
     //displayFutureWeather()
     
         
                  //console.log(r)  
     

      //console.log(times)
     // let weatherDesc = r.weather[0].description;
     // let windTemp = r.weather[0].main.temp
 
     // console.log(
     //      `
     //      \nThere will be ${weather} at ${times}, weather description ${windTemp}
     //      `
     // )

     //console.log(r)

     //console.log(new Date(times[timesLen]).toDateString())   
     //nowWeather2();



     //console.log(i);
     //console.log(new Date(i));
}


function displayFutureWeather(){

     
     for(let i = 9; i <= r.list.length -1; i += 8){
          let constData = r.list[i]
          let temp = constData.main.temp
          let weather = constData.weather[0].main;
          let weatherDesc = constData.weather[0].description;
          //let date = constData.dt_txt;
          displayCorrectImages(weather)
          let date = new Date(constData.dt * 1000).toDateString();
     
      document.querySelector('.future-weather').innerHTML += 
                    `
                    <div class="next-day">
                         <h2 class="next-day-date">${date}</h2>
                         <div class="next-day-weather-image"><img src="${weatherPic}" alt=""></div>
                         <h3  class="next-weather-temperature" > ${temp}</h3>
                         <h3  class="next-weather-temperature" > ${weather}</h3>
                         <h3  class="next-weather-temperature" > ${weatherDesc}</h3>
                    </div>
                    `

     }
}

nowWeather(api2);

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


//console.log("Response Out: ",r)
//console.log(new Date(times[2]).toDateString())
// function displayFutureWeather(){
//      for(let i = 1; i <= times.length - 1; i++){
//           document.querySelector('.future-weather').innerHTML += 
//                     `
//                     <div class="next-day">
//                          <h2 class="next-day-date">${new Date(times[i]).toDateString()}</h2>
//                          <div class="next-day-weather-image"><img src="./images/clear.png" alt=""></div>
//                          <h3  class="next-weather-temperature" > ${(r.main.temp - 273.15).toFixed(2)+"°C"}</h3>
//                     </div>
//                     `
//      }
// }


//nowWeather2();
//console.log(document.querySelectorAll('input[type="radio"]'));
document.querySelectorAll('input[type="radio"]').forEach (
     (element) => {
          element.addEventListener('click', () => {
               if(element.checked){
               //console.log(element.id)
               }
               else{
                   // console.log(element.id, " Not")
               }
          })
     }
)






/*

async function checkWeather(city){
          const response = await fetch(apiUrl + city + `
          &appid=${apiKey}`);

          if(response.status == 090){
                    document.querySelector(".error").style.display = "block"
                    document.querySelector(".weather").style.display = "none"
          }
          else{

          
          var data = await response.json();

          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML = Math.round(data.main.temp )+ "°c";
          document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
          document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

          document.querySelector(".weather").style.display = "block";
          document.querySelector(".error").style.display = "none";
}
}

searchBtn.addEventListener("click", () => {
          checkWeather(searchBox.value);
})

*/