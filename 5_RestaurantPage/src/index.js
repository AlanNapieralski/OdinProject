import './style.css'
import mainComponent from './main.js';

const { imageContainer, description } = mainComponent();

const content = document.querySelector('#content');

content.appendChild(imageContainer);
content.appendChild(description);