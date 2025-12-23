const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const tempEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind-speed");
const descEl = document.getElementById("weather-desc");
const cityEl = document.getElementById("city-name");
const weatherImg = document.getElementById("weather-img");
const forecastDiv = document.getElementById("forecast");
const errorDiv = document.getElementById("error");

searchBtn.addEventListener("click", ()=>{
    const city = cityInput.value.trim();
    if(city==="") { errorDiv.textContent="Enter a city name!"; return; }
    fetchWeather(city);
});

async function fetchWeather(city){
    errorDiv.textContent="";
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        if(data.cod!==200){ errorDiv.textContent = data.message; return; }

        displayCurrent(data);
        fetchForecast(data.coord.lat, data.coord.lon);
    } catch(err){
        errorDiv.textContent="Unable to fetch weather data!";
    }
}

function displayCurrent(data){
    tempEl.textContent = `${Math.round(data.main.temp)} °C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} km/h`;
    descEl.textContent = data.weather[0].main;
    cityEl.textContent = data.name;

    let weatherMain = data.weather[0].main.toLowerCase();
    switch(weatherMain){
        case "clear":
            document.body.style.background = "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7e?auto=format&fit=crop&w=1200&q=80') no-repeat center/cover";
            weatherImg.src = "https://img.icons8.com/emoji/96/sun-emoji.png";
            break;
        case "clouds":
            document.body.style.background = "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80') no-repeat center/cover";
            weatherImg.src = "https://img.icons8.com/emoji/96/cloud-emoji.png";
            break;
        case "rain":
        case "drizzle":
            document.body.style.background = "url('https://images.unsplash.com/photo-1526676035837-d3d0a6a82b11?auto=format&fit=crop&w=1200&q=80') no-repeat center/cover";
            weatherImg.src = "https://img.icons8.com/emoji/96/cloud-with-rain-emoji.png";
            break;
        case "snow":
            document.body.style.background = "url('https://images.unsplash.com/photo-1609945032792-3fcf0c3e5d44?auto=format&fit=crop&w=1200&q=80') no-repeat center/cover";
            weatherImg.src = "https://img.icons8.com/emoji/96/snowflake-emoji.png";
            break;
        default:
            document.body.style.background = "linear-gradient(to right, #74ebd5, #ACB6E5)";
            weatherImg.src="";
    }
}

// 7-day forecast
async function fetchForecast(lat, lon){
    forecastDiv.innerHTML="";
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    data.daily.slice(0,7).forEach(day=>{
        const date = new Date(day.dt*1000);
        const dayName = date.toLocaleDateString('en-US',{weekday:'short'});
        let iconUrl = getIconUrl(day.weather[0].main);
        const card = document.createElement("div");
        card.className="forecast-card";
        card.innerHTML=`<h4>${dayName}</h4><img src="${iconUrl}" width="50"><p>${Math.round(day.temp.min)}° / ${Math.round(day.temp.max)}°</p>`;
        forecastDiv.appendChild(card);
    });
}

function getIconUrl(weather){
    weather = weather.toLowerCase();
    switch(weather){
        case "clear": return "https://img.icons8.com/emoji/96/sun-emoji.png";
        case "clouds": return "https://img.icons8.com/emoji/96/cloud-emoji.png";
        case "rain": return "https://img.icons8.com/emoji/96/cloud-with-rain-emoji.png";
        case "drizzle": return "https://img.icons8.com/emoji/96/cloud-with-rain-emoji.png";
        case "snow": return "https://img.icons8.com/emoji/96/snowflake-emoji.png";
        default: return "https://img.icons8.com/emoji/96/sun-behind-cloud-emoji.png";
    }
}
