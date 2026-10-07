<div align="center">

# ⛅ Weather Portal 🌈

### *Your tiny window to the sky* ☁️

A cozy single-page weather app that fetches live forecasts from the internet and shows them in a pretty frosted-glass card 💙

![HTML5](https://img.shields.io/badge/HTML5-ff9a8b?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-7fb7ff?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ffd166?style=for-the-badge&logo=javascript&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-b8a1ff?style=for-the-badge)

</div>

---

## 🌸 What is this?

Type in any city, hit search, and watch the weather appear! ✨
Built with **vanilla JavaScript** and the **OpenWeatherMap REST API**, using `fetch` with `async/await`.

## 🍬 Features

- 🔍 **Search any city** in the world
- ⏳ **Loading spinner** while the data travels to you
- 🙈 **Friendly error messages** (city not found, bad API key, no internet, empty search)
- 🌡️ **Temperature, feels like, humidity, wind, pressure**
- 🌅 **Sunrise and sunset** times for the searched city
- 🕐 **Local date** of the city you searched
- 🎨 **Background that changes** with the weather and time of day
- 📱 **Responsive**, so it looks good on phones and computers

## 🧁 Built with

| Tool | What it does |
|------|--------------|
| 🏗️ HTML5 | Page structure |
| 💅 CSS3 | Glass card, gradients, animations |
| ⚡ JavaScript (ES6+) | Fetching data and updating the page |
| 🌍 OpenWeatherMap API | The weather data itself |

## 🗂️ Project structure

```
weather-portal/
├── 📄 index.html          → the page
├── 🎨 style.css           → the looks
├── 🧠 script.js           → the brain
├── 🔑 config.example.js   → API key template
└── 🙈 .gitignore          → keeps your secret key safe
```

## 🚀 Let's run it!

**1.** Clone the project 🐑
```
git clone https://github.com/YOUR-USERNAME/weather-portal.git
```

**2.** Get a free API key at [openweathermap.org](https://openweathermap.org/api) 🔑
*(new keys can take a couple of hours to wake up, so be patient 😴)*

**3.** Copy `config.example.js` and rename the copy to `config.js` 📋

**4.** Open `config.js` and swap in your key 🗝️
```javascript
const API_KEY = "your_real_key_here";
```

**5.** Open `index.html` in your browser and search a city! 🎉

## 🔮 How it works

```
 🧑 You type a city
        ↓
 ⏳ Loading spinner appears
        ↓
 📡 fetch() asks OpenWeatherMap (async/await)
        ↓
   ✅ Success?                ❌ Problem?
        ↓                        ↓
 🌤️ Weather card shows     🙈 Friendly error shows
        ↓                        ↓
      🧹 finally: spinner hides, button wakes up
```

> 💡 **Fun fact:** `fetch` doesn't complain when a city isn't found (a 404), so the app checks `response.ok` itself and shows a kind message instead!

## 🔒 A note about API keys

Your key lives in `config.js`, which is listed in `.gitignore` so it never gets uploaded. Never share your real key publicly! 🤫

## 💌 Author

Made with 💙 and lots of ☕ by **Your Name**

---

<div align="center">

⭐ *If you liked this little project, give it a star!* ⭐

</div>
