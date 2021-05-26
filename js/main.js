const api = {
    key: "f1daa3b21fbc4e93a9f160309210605",
    city: "cairo",
};
let childArr = [];
let weatherArr = [];
let box = ``;

//onload action 
window.addEventListener('load', getApiData);

//get weather API data
async function getApiData() {

    let fetchAPI = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api.key}&q=${api.city}&days=3&aqi=no&alerts=no`)

    let convertData = await fetchAPI.json()
        //add location info to childArr
    childArr.push(convertData.location)
        //add current info data to childArr
    childArr.push(convertData.current)
        // console.log(convertData);
        //API array + childArr = weatherArr 
    weatherArr = convertData.forecast.forecastday.concat(childArr);

    renderData();
    // searchQuery(searchInput.value)
}


//Display the data on page
renderData = () => {
    console.log(weatherArr);

    for (let i = 0; i < weatherArr.length - 2; i++) {

        //current weather
        const { temp_c, condition, humidity, vis_km } = weatherArr[weatherArr.length - 1]
            //location
        const { name, country } = weatherArr[weatherArr.length - 2]
            //days forecast
        const { day, date } = weatherArr[i]
            //days conditon
        const { text, icon } = day.condition
            //a function to utilize the date format
        let goDate = new Date(`${date}`)

        // box += console.log(`<p>${dateBuilder(goDate)}</p> , ${name} , ${temp_c}, ${text}`);

        box += `<div class="col-md-4 weatherHeader">
        <div class="card shadow-lg">
            <div class="card-header">
                <h4 class="weather-city pt-3">${name} , ${country}</h4>
            </div>
            <h5 class="date-time">${dateBuilder(goDate)}</h5>
            <div class="temp-sign d-flex justify-content-center">
                <p class="temp-current"> ${Math.round(day.avgtemp_c)}</p><span>&deg;c</span>
            </div>

            <p class="temp-cond text-muted">${text}</p>
            <div class="temp-icon">
            <img src="https:${icon}" alt="">
            </div>
            <div class="row temp-extras">
                <div class="col-6 my-2">
                    <span class="temp-feelslike">${Math.round(day.avgvis_km)}km</span>
                </div>
                <div class="col-6 my-2">
                    <span class="humidity">${Math.round(day.avghumidity)}%</span>
                </div>
                <div class="col-6 mb-3">
                    <i class="fas fa-long-arrow-alt-up"></i>
                    <span class="temp-high">${Math.round(day.maxtemp_c)}&deg;c</span>
                </div>
                <div class="col-6 mb-3">
                    <i class="fas fa-long-arrow-alt-down"></i>
                    <span class="temp-low">${Math.round(day.mintemp_c)}&deg;c</span>
                </div>
            </div>
        </div>
    </div>
        `
        document.getElementById('weatherCards').innerHTML = box;

        //current date card
        let fChild = `<div class="card shadow-lg xxx">
            <div class="card-header">
                <h4 class="weather-city pt-3">${name} , ${country}</h4>
            </div>
            <h5 class="date-time">${dateBuilder(new Date())}</h5>
            
            <div class="temp-sign d-flex justify-content-center">
                <p class="temp-current"> ${Math.round(temp_c)}</p><span>&deg;c</span>
            </div>

            <p class="temp-cond text-muted">${condition.text}</p>
            <div class="temp-icon">
            <img src="https:${condition.icon}" alt="">
            </div>
            <div class="row temp-extras">
                <div class="col-6 my-2">
                    <span class="temp-feelslike">${Math.round(vis_km)}km</span>
                </div>
                <div class="col-6 my-2">
                    <span class="humidity">${Math.round(humidity)}%</span>
                </div>
                <div class="col-6 mb-3">
                    <i class="fas fa-long-arrow-alt-up"></i>
                    <span class="temp-high">${Math.round(day.maxtemp_c)}&deg;c</span>
                </div>
                <div class="col-6 mb-3">
                    <i class="fas fa-long-arrow-alt-down"></i>
                    <span class="temp-low">${Math.round(day.mintemp_c)}&deg;c</span>
                </div>
            </div>
        </div>`
        document.getElementById('weatherCards').firstChild.innerHTML = fChild

    }
}

//Create the Date Format
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}/${month}/${year}`;
}

// search function
let searchInput = document.querySelector('.search input')

searchInput.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        searchQuery(searchInput.value)
    }
})

//search using input
function searchQuery() {
    if (searchInput.value != "") {
        api.city = searchInput.value
        clearInputs()
        getApiData()
        console.log(api.city);

    } else if (searchInput.value == "") {
        console.log("please enter city");


        // api.city = "alex"
        // console.log(api.city);
        // getApiData()
    }
}

//clear cards
function clearInputs() {
    childArr = [];
    box = ``
    searchInput.value = ""
}