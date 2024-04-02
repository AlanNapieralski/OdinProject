import { state, stateProjects } from './state.js';
import { addProjectToJSON, addProjectBox } from './nav.js';
import { addTaskToDOM, addTasktoJSON } from './content.js';
import { generateInputField } from './index.js';

// nav


let projectInput = null;
document.addEventListener('click', function(event) {
    if (projectInput !== null ) {
        projectInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addProjectBox(projectInput.value);
                addProjectToJSON(projectInput.value);
                projectInput.remove();
                projectInput = null;
            }
        });
    }
    else if (event.target.classList.contains('addProject')) {
        projectInput = document.createElement('input');
        generateInputField(projectInput, 'Enter the name of your new project');
    }
});

// content load
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('taskListBtn')) {
        const content = document.querySelector('.content');
        const h2 = content.querySelector('h2');
        h2.innerHTML = event.target.innerHTML;
    }
});

let taskInput = null;
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('addTaskButton')) {
        if (taskInput === null) {
            taskInput = document.createElement('input');
            taskInput = generateInputField(document.createElement('input'), 'Describe your task here');
        }   
        if (taskInput !== null) {
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTaskToDOM(taskInput.value);
                    addTasktoJSON(taskInput.value, "2013-12-01");
                    taskInput.remove();
                    taskInput = null;
                }
            });
        }
    }
});

                    