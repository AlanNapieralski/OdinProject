import './style.css';
import mainComponent from './main.js';
import menuComponent from './menu.js';
import aboutComponent from './about.js';

const content = document.querySelector('#content');
const navButtons = document.querySelectorAll('button');


for (let button of navButtons) {
    button.addEventListener('click', () => {
        resetContent();

        switch(button.className) {
            case 'main':
                content.appendChild(mainComponent());
                break;
            case 'menu':
                content.appendChild(menuComponent());
                break;
            case 'about':
                content.appendChild(aboutComponent());
                break;
        }
    });
}

const resetContent = () => {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}