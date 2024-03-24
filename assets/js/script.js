// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Grabbing references to important DOM elements.
let modalDisplayEl = $('#modal');
let taskFormEl = $('#formModal');
let taskNameEl = $('#task-name-input');
let taskDescriptionEl = $('#task-description-input');
let taskDueDateEl = $('#task-due-date-input');
let toDoCards = $('#todo-cards');
let inProgressCards = $('#in-progress-cards');
let doneCards = $('#done-cards');


function readTasksFromStorage() {
    // ? Retrieve projects from localStorage and parse the JSON to an array.
    // ? We use `let` here because there is a chance that there are no projects in localStorage (which means the projects variable will be equal to `null`) and we will need it to be initialized to an empty array.
    let taskList = JSON.parse(localStorage.getItem("tasks"));
  
    if (!Array.isArray(taskList)) {
      taskList = [];
    }
  
    return taskList;
  }

// ? Accepts an array of projects, stringifys them, and saves them in localStorage.
function saveTasksToStorage(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }

// Todo: create a function to generate a unique task id and save to localstorage
function generateTaskId() {
    // Check local storage for any taskId or set to 0 as a starting point.
    let taskId = JSON.parse(localStorage.getItem('nextId')) || 0;

    let newTaskId = ++taskId;

    // Stores new task ID in local storage
    localStorage.setItem('nextId', JSON.stringify(newTaskId));

    // Returns the new Unique Task Id
    return newTaskId;

}

// Todo: create a function to create a task card
// Creates a task card from the information passed in 'task' parameter and returns it.
function createTaskCard(task) {
    // Create a variable and grab the DOM to create new elements for each part of the task card.
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-project-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-boy');
    const cardDescription = $('<p>').addClass('card-text').text(task.type);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-project-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    // Create a warning and danger color for cards that are due today or overdue.
    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'MM/DD/YYYY');
    
        if(now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white')
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let taskList = readTasksFromStorage();
    // Use the jQuery empty() function to reset each of the card columns
    toDoCards.empty();
    inProgressCards.empty();
    doneCards.empty();

    if (!Array.isArray(taskList)) {
        // Handle cases where taskList is not an array, such as when local storage is empty
        return;
    }

    for (const nextTaskListItem of taskList) {
        const newTaskCards = createTaskCard(nextTaskListItem);

        // Make cards draggable with jQuery
        newTaskCards.draggable({
            opacity: 0.8,
            zIndez: 20,
        });

        // Conditionally append new tasks to the correct column status
        if (nextTaskListItem.status === 'to-do') {
            toDoCards.append(newTaskCards);
        } else if (nextTaskListItem.status === 'in-progress') {
            inProgressCards.append(newTaskCards);
        } else if (nextTaskListItem.status === 'done') {
            doneCards.append(newTaskCards);
        }
    };
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // Preventing the default page reload when form submits.
    event.preventDefault();

    // Using jQuery val function to get the user input values and apply to a new varibale.
    let taskNameInput = taskNameEl.val();
    let taskDescriptionInput = taskDescriptionEl.val();
    let taskDueDateInput = taskDueDateEl.val();

    // Creating the new task object.
    let newTask = {
        id: generateTaskId(),
        name: taskNameInput,
        type: taskDescriptionInput,
        dueDate: taskDueDateInput,
        status: 'to-do',
    }

    // Adding the new task card.
    let taskList = readTasksFromStorage();
    taskList.push(newTask); // Adds a new task to the taskList array

    // Save updated tasklist to local storage.
    saveTasksToStorage(taskList);

    // Update the screen with all tasks.
    renderTaskList();

    // Reset form fields
    taskNameEl.val('');
    taskDescriptionEl.val('');
    taskDueDateEl.val('');
}

// Todo: create a function to handle deleting a task
// data attributes section
// 
function handleDeleteTask(event){
    // Prevents default actions by the browser
    event.preventDefault();


}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let currentTaskList = readTasksFromStorage();

    // Get the task id from the event
    let taskId = ui.draggable[0].dataset.taskId;

    // Get the id of the lane card was dropped
    let newStatus = event.target.id;

    for (let task of currentTaskList) {
        if(task.id === taskId) {
            task.status = newStatus
        }
    }

    saveTasksToStorage(currentTaskList);
    
    renderTaskList();

    // $('.draggable').draggable({
    //     opacity: 0.8,
    //     zIndez: 10,
    // });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Render the task list with function call
    let storedTasks = readTasksFromStorage();

    if (storedTasks) {
        renderTaskList(storedTasks);
    }

    // Form submit button event listener to run function handleAddTask()
    taskFormEl.on('submit', handleAddTask);

    // Event listener for the delet button for each task.
    $('.task-card .delete').on('click', handleDeleteTask)

    // Makes lanes droppable. (*****Need to finish********)
    $('.swim-lanes').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });


    // Make due date field a date picker.
    $('#task-due-date-input').datepicker({
        changeMonth: true,
        changeYear: true,
      });

});

//Only thing we can do with localstorage is get everything out and then add a new item on with a push method 
// and then put our changes back into localstorage.
// setItem with new JSOn string updated with the previous work.
//