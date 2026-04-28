const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weatherDesc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLike = document.getElementById('feelsLike');
const weatherIcon = document.getElementById('weatherIcon');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const loading = document.getElementById('loading');
const dateElement = document.getElementById('date');

const cities = {
    'new york': { lat: 40.7128, lon: -74.0060 },
    'london': { lat: 51.5074, lon: -0.1278 },
    'paris': { lat: 48.8566, lon: 2.3522 },
    'tokyo': { lat: 35.6762, lon: 139.6503 },
    'sydney': { lat: -33.8688, lon: 151.2093 },
    'dubai': { lat: 25.2048, lon: 55.2708 },
    'singapore': { lat: 1.3521, lon: 103.8198 },
    'mumbai': { lat: 19.0760, lon: 72.8777 },
    'delhi': { lat: 28.7041, lon: 77.1025 },
    'berlin': { lat: 52.5200, lon: 13.4050 },
    'los angeles': { lat: 34.0522, lon: -118.2437 },
    'chicago': { lat: 41.8781, lon: -87.6298 },
    'toronto': { lat: 43.6532, lon: -79.3832 },
    'san francisco': { lat: 37.7749, lon: -122.4194 },
    'hong kong': { lat: 22.3193, lon: 114.1694 },
    'bangkok': { lat: 13.7563, lon: 100.5018 },
    'seoul': { lat: 37.5665, lon: 126.9780 },
    'moscow': { lat: 55.7558, lon: 37.6173 },
    'cairo': { lat: 30.0444, lon: 31.2357 },
    'johannesburg': { lat: -26.2041, lon: 28.0473 }
};

const weatherCodes = {
    0: { desc: 'Clear Sky', icon: 'bi-sun' },
    1: { desc: 'Mainly Clear', icon: 'bi-sun' },
    2: { desc: 'Partly Cloudy', icon: 'bi-cloud-sun' },
    3: { desc: 'Overcast', icon: 'bi-cloud' },
    45: { desc: 'Fog', icon: 'bi-cloud-fog' },
    48: { desc: 'Depositing Rime Fog', icon: 'bi-cloud-fog' },
    51: { desc: 'Light Drizzle', icon: 'bi-cloud-rain' },
    53: { desc: 'Moderate Drizzle', icon: 'bi-cloud-rain' },
    55: { desc: 'Dense Drizzle', icon: 'bi-cloud-rain' },
    61: { desc: 'Slight Rain', icon: 'bi-cloud-rain' },
    63: { desc: 'Moderate Rain', icon: 'bi-cloud-rain' },
    65: { desc: 'Heavy Rain', icon: 'bi-cloud-rain' },
    71: { desc: 'Slight Snow', icon: 'bi-snow' },
    73: { desc: 'Moderate Snow', icon: 'bi-snow' },
    75: { desc: 'Heavy Snow', icon: 'bi-snow' },
    77: { desc: 'Snow Grains', icon: 'bi-snow' },
    80: { desc: 'Slight Rain Showers', icon: 'bi-cloud-rain' },
    81: { desc: 'Moderate Rain Showers', icon: 'bi-cloud-rain' },
    82: { desc: 'Violent Rain Showers', icon: 'bi-cloud-rain' },
    85: { desc: 'Slight Snow Showers', icon: 'bi-snow' },
    86: { desc: 'Heavy Snow Showers', icon: 'bi-snow' },
    95: { desc: 'Thunderstorm', icon: 'bi-cloud-lightning' },
    96: { desc: 'Thunderstorm with Hail', icon: 'bi-cloud-lightning' },
    99: { desc: 'Thunderstorm with Heavy Hail', icon: 'bi-cloud-lightning' }
};

document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    fetchWeather('SURAT'); // Default city
});

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name!');
        return;
    }
    fetchWeather(city.toLowerCase());
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (!city) {
            showError('Please enter a city name!');
            return;
        }
        fetchWeather(city.toLowerCase());
    }
});

function setCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

async function fetchWeather(city) {
    showLoading();
    hideError();

    const cityKey = city.toLowerCase();
    let coords;
    let foundCityName = null;
    let foundCountry = null;

    if (cities[cityKey]) {
        coords = cities[cityKey];
        foundCityName = cityKey;
    } else {
        // Try to geocode the city using Open-Meteo Geocoding API
        try {
            const geoResult = await geocodeCity(city);
            coords = { lat: geoResult.lat, lon: geoResult.lon };
            foundCityName = geoResult.foundName;
            foundCountry = geoResult.country;
        } catch (error) {
            showError('City not found! Please try another city.');
            hideLoading();
            return;
        }
    }

    try {
        // Fetch weather data from Open-Meteo API
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

        const response = await fetch(weatherUrl);
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const data = await response.json();
        displayWeather(data, foundCityName || city, foundCountry);
        hideLoading();
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
        hideLoading();
    }
}

async function geocodeCity(city) {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    
    const response = await fetch(geocodeUrl);
    
    if (!response.ok) {
        throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    
    // Check if results exist and have data
    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
        throw new Error('City not found');
    }
    
    // Return both coordinates and the actual city name found
    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        foundName: data.results[0].name,
        country: data.results[0].country
    };
}

// weather information
function displayWeather(data, city, country = null) {
    const current = data.current;
    
    // Update city name with country (capitalize first letter)
    let displayCity = city.charAt(0).toUpperCase() + city.slice(1);
    if (country) {
        displayCity += `, ${country}`;
    }
    cityName.textContent = displayCity;
    
    // Temperature in Celsius
    const tempC = Math.round(current.temperature_2m);
    temperature.textContent = `${tempC}°C`;
    
    // Update feels like in Celsius
    const feelsC = Math.round(current.apparent_temperature);
    feelsLike.textContent = `${feelsC}°C`;
    
    // Update humidity
    humidity.textContent = `${current.relative_humidity_2m}%`;
    
    // Update wind speed
    windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    
    // Update weather description 
    const weatherCode = current.weather_code;
    const weatherData = weatherCodes[weatherCode] || { desc: 'Unknown', icon: 'bi-cloud' };
    weatherDesc.textContent = weatherData.desc;
    
    // Update icon
    weatherIcon.className = `bi ${weatherData.icon}`;
    
    // Show weather info
    weatherInfo.style.display = 'block';
}

function showLoading() {
    weatherInfo.style.display = 'none';
    loading.classList.remove('d-none');
}

function hideLoading() {
    loading.classList.add('d-none');
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('d-none');
    weatherInfo.style.display = 'none';
}

function hideError() {
    errorMessage.classList.add('d-none');
}