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

// Ініціалізація Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Функція для збереження логіну Telegram
function saveTelegramLogin(userId, telegramLogin) {
    if (!userId || !telegramLogin) {
        alert('Please enter both User ID and Telegram Login');
        return;
    }

    // Зберігаємо дані в Firebase
    database.ref('referrals/' + userId).set({
        telegramLogin: telegramLogin
    }, (error) => {
        if (error) {
            alert('Failed to save data');
        } else {
            alert('Data saved successfully');
            loadReferrals(); // Оновлюємо список рефералів
        }
    });
}

// Функція для завантаження рефералів
function loadReferrals() {
    const referralList = document.getElementById('referral-list');
    referralList.innerHTML = ''; // Очищуємо попередні дані

    database.ref('referrals').once('value', (snapshot) => {
        const referrals = snapshot.val();
        if (referrals) {
            for (const userId in referrals) {
                const telegramLogin = referrals[userId].telegramLogin;
                const listItem = document.createElement('li');
                listItem.textContent = `User ID: ${userId}, Telegram Login: ${telegramLogin}`;
                referralList.appendChild(listItem);
            }
        } else {
            referralList.innerHTML = '<li>No referrals found</li>';
        }
    });
}

// Функція для відображення реферального посилання
function displayReferralLink() {
    const referralLink = document.getElementById('referral-url');
    const baseUrl = window.location.href.split('?')[0]; // Витягуємо базову URL
    referralLink.textContent = baseUrl + '?ref=' + encodeURIComponent('YOUR_REFERRAL_CODE');
}

// Завантаження рефералів та відображення реферального посилання при завантаженні сторінки
window.onload = function() {
    loadReferrals();
    displayReferralLink();
};
