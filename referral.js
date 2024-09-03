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

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        if (tab.id === tabId) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    });
}

// Initialize Telegram Web App
window.onload = function() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Display Telegram username
    const userLogin = tg.initDataUnsafe.user.username;
    if (userLogin) {
        document.getElementById('user-login').textContent = `Ваш логін Telegram: ${userLogin}`;
    } else {
        document.getElementById('user-login').textContent = 'Ваш логін Telegram не знайдено.';
    }

    // Function to load referrals
    function loadReferrals() {
        const referralList = document.getElementById('referral-list');
        referralList.innerHTML = ''; // Clear previous data

        // Fetch referrals from Firebase
        firebase.database().ref('referrals').once('value').then((snapshot) => {
            const referrals = snapshot.val();
            if (referrals) {
                for (const userId in referrals) {
                    const telegramLogin = referrals[userId].telegramLogin;
                    const listItem = document.createElement('li');
                    listItem.textContent = `User ID: ${userId}, Telegram Login: ${telegramLogin}`;
                    referralList.appendChild(listItem);
                }
            } else {
                referralList.innerHTML = '<li>Рефералів не знайдено</li>';
            }
        });
    }

    loadReferrals();
};

    displayReferralLink();
};
