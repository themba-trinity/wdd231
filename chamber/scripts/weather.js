const currentTemp = document.querySelector("#weather-current");
const forecast = document.querySelector("#weather-forecast");

const lat = -33.92;
const lon = 18.42;
const apiKey = "a1b45de95ef294605f344b7869d357e9";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(currentUrl);
        const data = await response.json();
        displayCurrent(data);

        const response2 = await fetch(forecastUrl);
        const data2 = await response2.json();
        displayForecast(data2);
    } catch (error) {
        console.log(error);
    }
}

function displayCurrent(data) {
    currentTemp.innerHTML = `
        <p><strong>Current Temperature:</strong> ${data.main.temp.toFixed(0)}°C</p>
        <p>${data.weather[0].description}</p>
    `;
}

function displayForecast(data) {
    const threeDays = data.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    forecast.innerHTML = "";
    threeDays.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${day.main.temp.toFixed(0)}°C</p>
            <p>${day.weather[0].description}</p>
        `;
        forecast.appendChild(div);
    });
}

getWeather();