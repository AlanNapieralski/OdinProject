import { state, stateProjects } from './state.js';

export function addTask(desc, due) {
    if (stateProjects.json) {
        const jsonProject = state.currentProject;
        const jsonProjectIndex = stateProjects.json.indexOf(jsonProject);

        stateProjects.json[jsonProjectIndex].tasks.push({
            "desc": desc,
            "done": false,
            "due": due
        });
    }
}