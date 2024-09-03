// Конфігурація Firebase для вашого веб-додатку
const firebaseConfig = {
  apiKey: "AIzaSyBJSrSzrShQWN3CDYVVMYjzibQ1FgTDVO8",
  authDomain: "referals-b30ae.firebaseapp.com",
  databaseURL: "https://referals-b30ae-default-rtdb.firebaseio.com",
  projectId: "referals-b30ae",
  storageBucket: "referals-b30ae.appspot.com",
  messagingSenderId: "631246699277",
  appId: "1:631246699277:web:adba2608ca51e6d72f0e44",
  measurementId: "G-QSR6SB6P8P"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// main.js

// Функція для отримання даних користувача
function getUserInfo() {
    // Замість 'YOUR_TELEGRAM_BOT_TOKEN' використовуйте ваш токен бота
    const botToken = '7475830625:AAGuEX6UxNLwHe-yIgtyq1mtkKdKM25lzJs';
    
    // Взаємодія з Telegram API
    const apiUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // Витягуємо перший результат для простоти
                const userInfo = data.result[0].message.from;
                displayUserInfo(userInfo);
            } else {
                console.error('Error fetching user info:', data.description);
                document.getElementById('login-info').textContent = 'Не вдалося завантажити інформацію';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('login-info').textContent = 'Не вдалося завантажити інформацію';
        });
}

// Функція для відображення інформації про користувача
function displayUserInfo(user) {
    const loginInfoElement = document.getElementById('login-info');
    loginInfoElement.textContent = `Вітаємо, ${user.first_name} ${user.last_name || ''}`;
}

// Викликаємо функцію для отримання даних користувача
getUserInfo();
