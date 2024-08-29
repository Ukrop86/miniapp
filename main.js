// main.js
import { toggleBox, updateCount, handleLinkClick } from './utils.js';

const gistId = 'c68b6848d7e34bb08457728c28aa5dd2';  // Замініть на ваш Gist ID
const githubToken = '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';  // Замініть на ваш GitHub токен

// Функція для завантаження лічильників з Gist
async function loadCounts() {
    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });
        const data = await response.json();
        const fileContent = JSON.parse(data.files['like-counts.json'].content);
        return fileContent;
    } catch (error) {
        console.error('Error loading counts:', error);
        return {};
    }
}

// Функція для збереження лічильників у Gist
async function saveCounts(counts) {
    try {
        await fetch(`https://api.github.com/gists/${gistId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: {
                    'like-counts.json': {
                        content: JSON.stringify(counts)
                    }
                }
            })
        });
    } catch (error) {
        console.error('Error saving counts:', error);
    }
}

// Ініціалізація лічильників
async function initCounts() {
    const counts = await loadCounts();

    document.querySelectorAll('.like-icon').forEach((icon, index) => {
        const countSpan = icon.nextElementSibling;
        const countKey = `like${index}`;
        countSpan.textContent = counts[countKey] || 0;

        icon.addEventListener('click', async function(event) {
            event.stopPropagation();
            let currentCount = parseInt(countSpan.textContent, 10);
            currentCount++;
            countSpan.textContent = currentCount;
            counts[countKey] = currentCount;
            await saveCounts(counts);
        });
    });

    document.querySelectorAll('.dislike-icon').forEach((icon, index) => {
        const countSpan = icon.nextElementSibling;
        const countKey = `dislike${index}`;
        countSpan.textContent = counts[countKey] || 0;

        icon.addEventListener('click', async function(event) {
            event.stopPropagation();
            let currentCount = parseInt(countSpan.textContent, 10);
            currentCount++;
            countSpan.textContent = currentCount;
            counts[countKey] = currentCount;
            await saveCounts(counts);
        });
    });

    document.querySelectorAll('.neutral-icon').forEach((icon, index) => {
        const countSpan = icon.nextElementSibling;
        const countKey = `neutral${index}`;
        countSpan.textContent = counts[countKey] || 0;

        icon.addEventListener('click', async function(event) {
            event.stopPropagation();
            let currentCount = parseInt(countSpan.textContent, 10);
            currentCount++;
            countSpan.textContent = currentCount;
            counts[countKey] = currentCount;
            await saveCounts(counts);
        });
    });
}

// Виклик ініціалізації при завантаженні сторінки
document.addEventListener('DOMContentLoaded', initCounts);


