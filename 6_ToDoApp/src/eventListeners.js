import { state, stateProjects } from './state.js';
import { addProjectToJSON, addProjectBox } from './nav.js';
import { addTasktoJSON, loadContent, readTasks } from './content.js';
import { generateInputField } from './index.js';

// app init
document.addEventListener('DOMContentLoaded', () => {
    stateProjects.json.filter(pr => stateProjects.json.indexOf(pr) !== 0).forEach((project) => {
        addProjectBox(project.name);
    });

    state.currentProject = stateProjects.json[0];
    loadContent(state.currentProject);

    const content = document.querySelector('.content');
    const h2 = content.querySelector('h2');
    h2.innerHTML = `All Tasks`;
});

// nav
let projectInput = null;
document.addEventListener('click', function(event) {
    if (projectInput !== null ) {
        projectInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                stateProjects.json.forEach((project) => {
                    if (project.name === projectInput.value) {
                        projectInput.remove();
                        projectInput = null;
                        return;
                    }
                });
                addProjectBox(projectInput.value);
                addProjectToJSON(projectInput.value);
                projectInput.remove();
                projectInput = null;

                loadContent(state.currentProject);
            }
        });
    }
    else if (event.target.classList.contains('addProject')) {
        projectInput = document.createElement('input');
        projectInput = generateInputField(projectInput, 'Enter the name of your new project');
        state.currentProject = stateProjects.json[stateProjects.json.length - 1];
    }
});

// click on project button
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('taskListBtn')) {
        stateProjects.json[stateProjects.json.indexOf(state.currentProject)].tasks = readTasks();

        // if (stateProjects.json.indexOf(state.currentProject) !== 0) {

        //     const currentProjectTasks = stateProjects.json[stateProjects.json.indexOf(state.currentProject)].tasks;
        //     let AllProjectTasks = stateProjects.json[0].tasks;

        //     AllProjectTasks = AllProjectTasks.map(task => {
        //         const editedTask = currentProjectTasks.find(t => JSON.stringify(t) !== JSON.stringify(task));
        //         console.log(editedTask);
        //         return editedTask ? editedTask : task;
        //     });

        //     stateProjects.json[0].tasks = AllProjectTasks;
        // }

        if (event.target.innerHTML === "All Tasks") {
            state.currentProject = stateProjects.json[0];
        } else {
            stateProjects.json.forEach((project) => {
                if (project.name === event.target.innerHTML.slice(1)) {
                    state.currentProject = project;
                }
            });
        }

        loadContent(state.currentProject);
    }
});

let taskInput = null;
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('addTaskButton')) {
        if (taskInput === null) {
            taskInput = document.createElement('input');
            taskInput = generateInputField(taskInput, 'Describe your task here');
        }   
        if (taskInput !== null) {
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTasktoJSON(taskInput.value, "2013-12-01");
                    taskInput.remove();
                    taskInput = null;

                    loadContent(state.currentProject);
                }
            });
        }
    }
});

// no action on input enter key press
document.querySelector('input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        
    }
});