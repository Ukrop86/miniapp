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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

window.onload = function() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Display Telegram username and save to Firebase
    const userLogin = tg.initDataUnsafe.user.username;

    if (userLogin) {
        document.getElementById('user-login').textContent = `Ваш логін Telegram: ${userLogin}`;
        
        // Save the Telegram username to Firebase
        database.ref('users/' + userLogin).set({
            telegramLogin: userLogin,
            timestamp: Date.now()
        });
    } else {
        document.getElementById('user-login').textContent = 'Ваш логін Telegram не знайдено.';
    }

    // Function to toggle box
    function toggleBox(box) {
        const isExpanded = box.classList.contains('expanded');
        const boxes = document.querySelectorAll('.box');
        
        // Collapse all boxes
        boxes.forEach(b => b.classList.remove('expanded'));
        
        // Expand the clicked box if it was not already expanded
        if (!isExpanded) {
            box.classList.add('expanded');
        }
    }

    // Function to update count
    function updateCount(event, type) {
        event.stopPropagation(); // Prevent the click event from affecting the box
        const countSpan = event.target.nextElementSibling;
        let count = parseInt(countSpan.textContent, 10);
        countSpan.textContent = count + 1;
    }

    // Expose functions to global scope
    window.toggleBox = toggleBox;
    window.updateCount = updateCount;
};
