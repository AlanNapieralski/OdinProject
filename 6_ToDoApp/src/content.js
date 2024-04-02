import { state, stateProjects } from './state.js';

export function addTasktoJSON(desc, due) {
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

export function addTaskToDOM(taskName) {
    const projectID = stateProjects.json.indexOf(state.currentProject);
    const taskID = state.currentProject.tasks.length;
    const entryID = `${projectID}-${taskID}`;

    const item = document.createElement('div');
    item.classList.add('checklist-item');
    item.innerHTML =    `<div class="input-wrapper">
                            <div class="round">
                                <input type="checkbox" id="checkbox${entryID}" />
                                <label for="checkbox${entryID}"></label>
                            </div>
                            <input type="text" id="todo-input${entryID}" autocomplete="off" placeholder="Enter a task" class="todo-input">
                            <p>Due date: </p>
                            <input type="date" id="due-date${entryID}">
                        </div>`;
                        
    document.querySelector('#todo-list').appendChild(item);
    item.querySelector(`#todo-input${entryID}`).value = taskName;
}

// create a function that's auto generating the html template based on the task that's stored in json