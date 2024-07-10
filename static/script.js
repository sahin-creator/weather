const apiKey = '8b575ea21b686245c4705c12c205864e'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const response = await fetch('/get_weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city })
    });

    if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
    }

    const data = await response.json();
    displayWeather(data);
    showRainMap(data.coord.lat, data.coord.lon);
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <p><strong>City:</strong> ${data.city}</p>
        <p><strong>Temperature:</strong> ${data.temperature} °C</p>
        <p><strong>Weather:</strong> ${data.description}</p>
        <p><strong>Humidity:</strong> ${data.humidity} %</p>
        <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
    `;
}

function showRainMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
    }).addTo(map);
}