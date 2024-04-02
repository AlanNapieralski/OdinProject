import { state, stateProjects } from './state.js';
import { createProject } from './nav.js';
import { addTask } from './content.js'

// nav
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('addProject')) {
        const input = inputField('Enter the name of your new project');
        this.body.appendChild(input);

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const myProjects = document.querySelector('.myProjects');
                const ul = myProjects.querySelector('ul');
                const li = document.createElement('li');

                const projectName = input.value;
                const newProject = createProject(projectName);
                stateProjects.json.push(newProject);
                state.currentProject = newProject;

                li.innerHTML = `<button class="taskListBtn">#${projectName}</button>`;
                ul.appendChild(li);
                input.remove();
            }
        });
    }
});

// content load
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('taskListBtn')) {
        const content = document.querySelector('.content');
        const h1 = content.querySelector('h1');
        if (state.currentProject !== null) {
            h1.innerHTML = state.currentProject.name;
        } else {
            console.log("ERROR: No project selected");
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('addTaskButton')) {
        const input = inputField('Describe your task here');
        this.body.appendChild(input);

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // const projectID = projects.length;
                // const taskID = projects[projectID-1].tasks.length;
                // const entryID = `${projectID}-${taskID}`

                // const item = document.createElement('div');
                // item.classList.add('checklist-item');
                // item.innerHTML =    `<div class="input-wrapper">
                //                         <div class="round">
                //                             <input type="checkbox" checked id="checkbox${entryID}" />
                //                             <label for="checkbox3"></label>
                //                         </div>
                //                         <input type="text" id="todo-input${entryID}" autocomplete="off" placeholder="Enter a task" class="todo-input">
                //                         <p>Due date: </p>
                //                         <input type="date" id="due-date${entryID}">
                //                     </div>`;
                // item.querySelector('.todo-input').value = input.value;
                // document.querySelector('#todo-list').appendChild(item);
                addTask(input.value, "2013-12-01");
                input.remove();
            }
        });
    }
});

function inputField(placeholder) {
    const input = document.createElement('input');
    input.id = 'createProject';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Describe your task here');
    return input;
}