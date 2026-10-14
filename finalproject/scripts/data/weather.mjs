// weather.mjs


export async function getWeather(latitude, longitude) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather data could not be loaded");
        }

        const data = await response.json();

        return {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code
        };

    } catch (error) {
        console.error("Weather Error:", error);

        return {
            temperature: "N/A",
            humidity: "N/A",
            windSpeed: "N/A",
            weatherCode: "N/A"
        };
    }
}
export function getWeatherDescription(code) {
    const codes = {
        0: "Clear Sky ☀️",
        1: "Mostly Clear 🌤",
        2: "Partly Cloudy ⛅",
        3: "Cloudy ☁️",
        45: "Fog 🌫",
        61: "Rain 🌧",
        71: "Snow ❄️",
        95: "Thunderstorm ⛈"
    };

    return codes[code] || "Unknown";
}