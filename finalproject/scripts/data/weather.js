const apiKey = "f4dc7fb97d0c2155db8ad90afdbf7e77";

export async function getWeather(lat, lon) {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        return {
            temp: Math.round(data.main.temp),
            description: data.weather[0].description
        };

    } catch (error) {
        console.error(error);

        return {
            temp: "--",
            description: "Unavailable"
        };
    }
}