/*
0 => Selector elements
1 => Check If Input Have Value Or Not
2 => Create Array To Save Date From It
3 => Create Element To Append At body element
4 => Active Delete Butoon
5 => Active Class Status To Active Or Not
6 => Save Date To LocaleStorage
7 => Confirm Delete Button From LocalStorage
8 => Change Status From Locale Stroge
*/
// 0 => Selector All Element
let add = document.querySelector(".add");
let input = document.querySelector(".input");
let tasks = document.querySelector(".tasks");
let arrayOfTasks = [];
// Check If LocaleStorage Have Items Or Not
if(localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    arrayOfTasks = tasks;
    addElementToBody(arrayOfTasks);
}
// 1 => Check If Input Have Value Or Not
add.addEventListener("click", function() {
    if(input.value.length) {
        addTaskToArray(input.value);
        input.value = "";
    }
});
// 2 => Create Array To Save Date From It
function addTaskToArray(value) {
   let task = {
        title: value,
        id: Math.random(),
        stauts: false,
    }
    // Add task to array
    arrayOfTasks.push(task);
    // add element to body
    addElementToBody(arrayOfTasks);
    // append tasks to array
    addTasksToLocalStorage(arrayOfTasks);
};
// 3 => Create Element To Append At body element
function addElementToBody(tasksDiv) {
    tasks.innerHTML = "";
    tasksDiv.forEach(task => {
        // Create Main Div To append It To body
        let div = document.createElement("div");
        div.innerHTML = task.title;
        div.classList.add("task");
        if(task.stauts === true) {
            div.classList.add("active");
        };
        div.setAttribute("data-id" , task.id);
        // Create Main Span To Apend It to div element
        let span = document.createElement("span");
        span.innerHTML = "Delete";
        span.classList.add("del");
        // Apend span To Main Div
        div.append(span);
        // Append Div To tasks Element at body
        tasks.appendChild(div);
    });
};
// Active Delete Button 
function deleteDiv(tasksele) {
    tasks.addEventListener("click",function(e) {
                // Change Array tasks
        deleteTaskId(e.target.parentElement.getAttribute("data-id"));
        if(e.target.classList.contains("del")) {
            deleteTaskFromLocaleStroge(e.target.getAttribute("data-id"));
            e.target.parentElement.remove();
        };
    });
};
deleteDiv(arrayOfTasks);
// Change Array List To new Data
function deleteTaskId(taskid) {
    arrayOfTasks = arrayOfTasks.filter(task => {
        return task.id != taskid;
     });
};
// 5 => Active Class Status To Active Or Not
function changeClassStatus() {
        // Add active class to Div element
    tasks.addEventListener("click",function(e) {
        if(e.target.classList.contains("task")) {
            e.target.classList.toggle("active");
            changeStatusFromLocale(e.target.getAttribute("data-id"));

        }
    });
};
changeClassStatus();

// 6 => Save Date To LocaleStorage
function addTasksToLocalStorage(tasks) {
    tasks = JSON.stringify(tasks);
    window.localStorage.setItem("tasks",tasks);
}
// 7 => Delete Task  From LocaleStorage

function deleteTaskFromLocaleStroge(taskid) {
    arrayOfTasks = arrayOfTasks.filter(task => task != taskid);
    addTasksToLocalStorage(arrayOfTasks);
};
// 8 => Change Status From Locale Stroge
function changeStatusFromLocale(taskid) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id == taskid) {
            arrayOfTasks[i].stauts == false ? arrayOfTasks[i].stauts = true : arrayOfTasks[i].stauts = false; 
        };
    };
    addTasksToLocalStorage(arrayOfTasks);
}
