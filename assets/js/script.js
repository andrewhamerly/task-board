// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

//Grabbing references to important DOM elements.
let modalDisplayEl = $('#modal');
let taskFormEl = $('#formModal');
let taskNameEl = $('#task-name-input');
let taskDescriptionEl = $('#task-description-input');
let taskDueDateEl = $('#task-due-date-input');

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
    return taskId + 1;
}

generateTaskId();

console.log(generateTaskId());

// Todo: create a function to create a task card
// Creates a task card from the information passed in 'task' parameter and returns it.
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card project-card draggable my-3')
        .attr('data-project-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-boy');
    const cardDescription = $('<p>').addClass(card-text).text(task.type);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-project-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

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

createTaskCard();

console.log(createTaskCard());

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    for (let i = 0; i < array.length; i++) {
        const nextTaskListItem = taskList [i];
        
    }

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    taskFormEl.on('click', createTaskCard());

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
