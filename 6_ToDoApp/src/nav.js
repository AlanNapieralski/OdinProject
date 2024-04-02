import todos from './todos.json';
import { state, stateProjects } from './state.js';

let projectName = '';

function createProject(name) {
    return {
        name: name,
        tasks: []
    };
}

export function addProjectToJSON(projectName) {
    const newProject = createProject(projectName);
    stateProjects.json.push(newProject);
    state.currentProject = newProject;
}

export function addProjectBox(projectName) {
    const myProjects = document.querySelector('.myProjects');
    const ul = myProjects.querySelector('ul');
    const li = document.createElement('li');
    
    li.innerHTML = `<button class="taskListBtn">#${projectName}</button>`;
    ul.appendChild(li);
}