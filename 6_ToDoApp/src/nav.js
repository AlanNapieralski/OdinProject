import todos from './todos.json';
import { state, stateProjects } from './state.js';

export function createProject(name) {
    return {
        name: name,
        tasks: []
    };
}

function addProject(name) {
    const newProject = createProject(name);
    stateProjects.json.push(newProject);
    state.currentProject = newProject;
}