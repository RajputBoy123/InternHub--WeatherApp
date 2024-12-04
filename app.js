let id = '9505fd1df737e20152fbd78cdb289b6a';
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let unsplashAccessKey = 'o0IiE4YqHe-7u50-JEBxoQ-Sc3YfoDQgK3mZimPcshU';
let unsplashUrl = 'https://api.unsplash.com/search/photos?query=';

let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if (valueSearch.value != '') {
        searchWeather();
    }
});

const searchWeather = () => {
    fetch(weatherUrl + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            if (data.cod == 200) {
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;

                setBackground(data.name);
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        });
};

const setBackground = (location) => {
    fetch(unsplashUrl + location + ' city skyline' + '&client_id=' + unsplashAccessKey)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                document.body.style.backgroundImage = `url(${data.results[0].urls.regular})`;
            }
        });
};

// Search Default
const initApp = () => {
    valueSearch.value = 'New Delhi';
    searchWeather();
};
initApp();
