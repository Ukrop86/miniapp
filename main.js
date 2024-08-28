// main.js
import { toggleBox, updateCount, handleLinkClick } from './utils.js';


document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => toggleBox(box));
});

document.querySelectorAll('.icons i').forEach(icon => {
    icon.addEventListener('click', (event) => updateCount(event, icon.classList.contains('like-icon') ? 'like' : 
        icon.classList.contains('dislike-icon') ? 'dislike' : 'neutral'));
});

document.querySelectorAll('.app-link').forEach(link => {
    link.addEventListener('click', handleLinkClick);
});

