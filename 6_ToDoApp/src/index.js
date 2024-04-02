import './style.css';
import './eventListeners.js';

export function generateInputField(input, placeholder) {
    input.id = 'createProject';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholder);
    document.body.appendChild(input);
    return input;
}