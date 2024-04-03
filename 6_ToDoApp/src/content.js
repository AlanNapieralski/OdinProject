import { state, stateProjects } from './state.js';

export function addTasktoJSON(desc, due) {
    if (stateProjects.json) {
        const jsonProject = state.currentProject;
        const jsonProjectIndex = stateProjects.json.indexOf(jsonProject);

        stateProjects.json[0].tasks.push({
            "desc": desc,
            "done": false,
            "due": due
        });
        stateProjects.json[jsonProjectIndex].tasks.push({
            "desc": desc,
            "done": false,
            "due": due
        });
    }
}

function readTaskFromHTML(task) {
    
    const desc = task.querySelector('.todo-input').value;
    const done = task.querySelector('[type="checkbox"]').checked;
    const due = task.querySelector('[type="date"]').value;
    
    return {
        "desc": desc,
        "done": done,
        "due": due
    };
}

export function readTasks() {
    let tasks = [];
    const tasksHTML = document.querySelectorAll('.input-wrapper');

    tasksHTML.forEach((task) => {
        tasks.push(readTaskFromHTML(task));
    });

    return tasks;
}

function generateHTMLforTask(task, taskID) {
    const desc = task.desc;
    const done = task.done;
    const due = task.due;
    
    return `<div class="input-wrapper">
                <div class="round">
                    <input type="checkbox" ${done ? "checked" : ""} id="checkbox${taskID}" />
                    <label for="checkbox${taskID}"></label>
                </div>
                <input type="text" id="todo-input${taskID}" value="${desc}" autocomplete="off" placeholder="Enter a task" class="todo-input">
                <p>Due date: </p>
                <input type="date" id="due-date${taskID}" value="${due}">
            </div>`;
}

export function loadContent(onProject) {
    clearContent();

    const projectIndex = stateProjects.json.indexOf(onProject);
    stateProjects.json[projectIndex].tasks.forEach((task, index) => {
        const taskID = `${index}`;
        const item = document.createElement('div');
        item.classList.add('checklist-item');
        item.innerHTML = generateHTMLforTask(task, taskID);
        document.querySelector('#todo-list').appendChild(item);
    });

    const content = document.querySelector('.content');
    const h2 = content.querySelector('h2');
    if (onProject.name === "none") {
        h2.innerHTML = `All Tasks`;
    } else {
        h2.innerHTML = `#${onProject.name}`;
    }
}

function clearContent() {
    document.querySelector('#todo-list').innerHTML = '';
}