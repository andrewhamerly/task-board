// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Grabbing references to important DOM elements.
let modalDisplayEl = $('#modal');
let taskFormEl = $('#formModal');
let taskNameEl = $('#task-name-input');
let taskDescriptionEl = $('#task-description-input');
let taskDueDateEl = $('#task-due-date-input');
let toDoCards = $('#todo-cards')

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (!nextId) {
        nextId = [];
    }

    let taskId = 0;

    for (let i = 0; i < nextId.length; i++) {
        const uniqueTaskId = nextId[i];

        if (uniqueTaskId > taskId) {
            taskId = uniqueTaskId;
        }
    }

    const newTaskId = taskId + 1;
    return newTaskId;
}

// Todo: create a function to create a task card
// Creates a task card from the information passed in 'task' parameter and returns it.
function createTaskCard(task) {
    // Create a variable and grab the DOM to create new elements for each part of the task card.
    const taskCard = $('<div>')
        .addClass('card project-card draggable my-3')
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
    for (let i = 0; i < tempList.length; i++) {
        const nextTaskListItem = tempList[i];
        const newTaskCards = createTaskCard(nextTaskListItem);
        // Make cards draggable with jQuery
        newTaskCards.draggable();
        // Append new tasks to the to-do column
        toDoCards.append(newTaskCards);
    }
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
        status: 'to-do'
    }

    // Adding the new task card.
    const newTaskCard = createTaskCard(newTask);
    newTaskCard.draggable();
    toDoCards.append(newTaskCard);

    // Reset form fields
    taskNameEl.val('');
    taskDescriptionEl.val('');
    taskDueDateEl.val('');
}

taskFormEl.on('submit', handleAddTask);

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
