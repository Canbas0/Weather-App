// OpenWeather Api'si Tarafından Kişisel Olarak Oluşturulan Api Key'i Değişkene Atama
const apiKey = '234b4940a9174ce4e734cd680bac77be';

// Eğer Kullanıcı Enter'a Tıklarsa Input İçerisindeki Veriyi getCoordinateValue Fonksiyonuna Yolla
const sendInputData = (event) => {
    // (Key Code = 13) Enter Tuşuna Basılmasını İfade Eder 
    if (event.keyCode == '13') {
        getCoordinateValue(inputText.value);
    }
}

// id Bilgisi 'inputText' Olan HTML Etiketini Değişkene Atama 
const inputText = document.querySelector('#inputText');

// Ataması Gerçekleşen Etikete Tuşa Basma Olayı Ekleme ve Bu Olay için Gerçekleşecek Methodu Ekleme
inputText.addEventListener('keypress', sendInputData);

// Weather Api Aracılığıyla Elde Edilen Verinin Json Dosyasına Dönüştürülmesini Sağlayan Method
const getCoordinateValue = (cityName) => {

    // Json Dosyasına Dönüştürülecek Verinin Adresini Değişkene Atama 
    let data = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    // Verinin Json Dosyasına Dönüştürülmesi
    fetch(data)
        .then(weather => {
            return weather.json();
        })
        .then(keepCoordinateValue);
}

// Bir Sonraki Anlamlı Veri Oluşturma Aşaması İçin Gerekli Olan Enlem (lat) ve Boylam (lon) Bilgilerini Alma ve Değişkenlere Atama
const keepCoordinateValue = (result) => {
    latitude = result[0].lat;
    longitude = result[0].lon;

    showResult(latitude, longitude);
}

// Weather Api Aracılığıyla Elde Edilen lat, lon Bilgileri ile Veriye Ulaşarak Json Dosyasına Dönüştürülmesini Sağlayan Method
function showResult(lat, lon) {
    let weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(weatherData)
        .then(weather => {
            return weather.json();
        })
        .then(weatherResult);
}


// class Bilgileri 'city, degree, desc, minMaxDegree' Olan HTML Etiketlerini Değişkene Atama 

const city = document.querySelector('.city');
const degree = document.querySelector('.degree');
const desc = document.querySelector('.desc');
const minMaxDegree = document.querySelector('.minMaxDegree');


// Yukarıda Ataması Gerçekleşen HTML Etiketlerinin Kullanıcı Görünümü için innerHTML Bilgilerinin Api Aracılığıyla Elde Edilen Bilgiler ile Eşleştirerek Atamalarının Gerçekleştirilmesini Sağlayan Method
const weatherResult = (result) => {

    city.innerHTML = `${inputText.value} , ${result.sys.country} `;

    degree.innerText = `${Math.floor(result.main.temp)} °`;

    desc.innerHTML = result.weather[0].description;

    minMaxDegree.innerHTML = `${Math.floor(result.main.temp_min) - 2} ° | ${Math.floor(result.main.temp_max) + 2} ° `;

}





