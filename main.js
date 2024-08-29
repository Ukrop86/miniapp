// main.js
import { toggleBox, updateCount, handleLinkClick } from './utils.js';
import { getDatabase, ref, set, get, update } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js';

// Ваші Firebase конфігурації
const firebaseConfig = {
    apiKey: "AIzaSyAYj1yAtKimTm7ym00Kk3AfH6stlkoTxS0",
    authDomain: "like-counter-8cd29.firebaseapp.com",
    databaseURL: "https://like-counter-8cd29-default-rtdb.firebaseio.com",
    projectId: "like-counter-8cd29",
    storageBucket: "like-counter-8cd29.appspot.com",
    messagingSenderId: "403893805395",
    appId: "1:403893805395:web:f7c9993ba0fb016a04c1a6",
    measurementId: "G-451JTQES2S"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

async function loadCounts() {
    const snapshot = await get(ref(db, 'counts/'));
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return {};
    }
}

async function saveCounts(counts) {
    await set(ref(db, 'counts/'), counts);
}

// Ініціалізація лічильників
async function initCounts() {
    const counts = await loadCounts();

    document.querySelectorAll('.box').forEach((box, index) => {
        const likeSpan = box.querySelector('.like-count');
        const dislikeSpan = box.querySelector('.dislike-count');
        const neutralSpan = box.querySelector('.neutral-count');

        const boxId = `box${index}`;
        likeSpan.textContent = counts[`${boxId}_likes`] || 0;
        dislikeSpan.textContent = counts[`${boxId}_dislikes`] || 0;
        neutralSpan.textContent = counts[`${boxId}_neutrals`] || 0;

        box.querySelector('.like-icon').addEventListener('click', async (event) => {
            event.stopPropagation();
            const count = parseInt(likeSpan.textContent, 10) + 1;
            likeSpan.textContent = count;
            counts[`${boxId}_likes`] = count; 
            await saveCounts(counts);
        });

        box.querySelector('.dislike-icon').addEventListener('click', async (event) => {
            event.stopPropagation();
            const count = parseInt(dislikeSpan.textContent, 10) + 1;
            dislikeSpan.textContent = count;
            counts[`${boxId}_dislikes`] = count;
            await saveCounts(counts);
        });

        box.querySelector('.neutral-icon').addEventListener('click', async (event) => {
            event.stopPropagation();
            const count = parseInt(neutralSpan.textContent, 10) + 1;
            neutralSpan.textContent = count;
            counts[`${boxId}_neutrals`] = count;
            await saveCounts(counts);
        });
    });

    sortBoxesByLikes();
}

function sortBoxesByLikes() {
    const boxes = Array.from(document.querySelectorAll('.box'));
    boxes.sort((a, b) => {
        const aLikes = parseInt(a.querySelector('.like-count').textContent, 10);
        const bLikes = parseInt(b.querySelector('.like-count').textContent, 10);
        return bLikes - aLikes;
    });
    
    const container = document.querySelector('.tab-content');
    boxes.forEach(box => container.appendChild(box));
}

// Виклик ініціалізації при завантаженні сторінки
document.addEventListener('DOMContentLoaded', initCounts);


document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => toggleBox(box));
});



document.querySelectorAll('.app-link').forEach(link => {
    link.addEventListener('click', handleLinkClick);
});
