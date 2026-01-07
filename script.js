const apiKey = "948a0f610426614418288b616d955b37";

function getWeather() {

    let city = document.getElementById("cityInput").value.trim();
    const dropdownCity = document.getElementById("citySelect").value;

    if (city === "" && dropdownCity === "") {
        alert("Please enter or select a city");
        return;
    }

    if (city === "") city = dropdownCity;

    document.getElementById("mainHeading").innerText = city;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {

            if (data.cod !== 200) {
                alert("City not found in India");
                return;
            }

            const weather = data.weather[0].main;
            const temp = data.main.temp;
            const humidity = data.main.humidity;

            document.getElementById("weather").innerText = weather;
            document.getElementById("temperature").innerText = temp + " °C";
            document.getElementById("humidity").innerText = humidity + " %";

            setWeatherColor(weather);
            setTempColor(temp);
            setHumidityColor(humidity);
        });
}

function setTempColor(temp) {
    const box = document.getElementById("tempBox");
    if (temp >= 40)
        box.style.background = "linear-gradient(red, darkred)";
    else if (temp >= 30)
        box.style.background = "linear-gradient(orange, red)";
    else if (temp >= 20)
        box.style.background = "linear-gradient(yellow, orange)";
    else
        box.style.background = "linear-gradient(#2193b0, #6dd5ed)";
}

function setWeatherColor(weather) {
    const box = document.getElementById("weatherBox");
    if (weather === "Clear")
        box.style.background = "linear-gradient(yellow, orange)";
    else if (weather === "Clouds")
        box.style.background = "linear-gradient(#2c3e50, #4ca1af)";
    else if (weather === "Rain")
        box.style.background = "linear-gradient(#1e3c72, #2a5298)";
    else
        box.style.background = "grey";
}

function setHumidityColor(humidity) {
    const box = document.getElementById("humidityBox");
    if (humidity >= 80)
        box.style.background = "linear-gradient(#00c6ff, #0072ff)";
    else if (humidity >= 50)
        box.style.background = "linear-gradient(#43cea2, #185a9d)";
    else
        box.style.background = "linear-gradient(#f7971e, #ffd200)";
}
