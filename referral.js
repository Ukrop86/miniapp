// Імпортуйте функції, які вам потрібні з SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";

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

// Ініціалізуйте Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Функція для збереження даних користувача у Firebase
async function saveUserData(userId, referralLink) {
    try {
        await set(ref(db, 'users/' + userId), {
            telegramId: userId,
            referralLink: referralLink
        });
        console.log('Дані користувача успішно збережені');
    } catch (error) {
        console.error('Помилка при збереженні даних користувача:', error);
    }
}

// Функція для відображення реферального посилання
async function displayReferralLink() {
    // Отримати ID користувача Telegram з параметрів URL або з іншого джерела
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id'); // Отримати ID з URL параметрів

    if (userId) {
        const referralLink = `https://example.com/referral/${userId}`;
        document.getElementById('referral-link').innerText = `Ваше реферальне посилання: ${referralLink}`;

        // Збережіть дані користувача у Firebase
        await saveUserData(userId, referralLink);
    } else {
        console.error('Не вдалося отримати ID користувача');
    }
}

// Викликаємо функцію для відображення реферального посилання при завантаженні сторінки
window.onload = displayReferralLink;
