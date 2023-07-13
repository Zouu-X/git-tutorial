const todoList = [{name: 'wash dishes', dueDate:'2022-12-22'},
    {name: 'watch youtube', dueDate: '2022-12-22'}];

renderTodoList();
function renderTodoList() {

let todoListHTML = '';
    /*用JS循环generateHTML*/
    for (let i =0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const name = todoObject.name;
        const dueDate = todoObject.dueDate;
        const html = `
           <div>${name}</div>
           <div>${dueDate}</div>
           <button onclick="
             todoList.splice(${i}, 1);
             renderTodoList();
           " class="delete-todo-button">Delete</button>
        `;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list')
        .innerHTML = todoListHTML;
}

function addTodo() {
    const inputElement = document.querySelector('.js-todo-input');
    const name = inputElement.value;
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;
    todoList.push({
        //name: name,
        //dueDate: dueDate,
        name,
        dueDate
    });

    inputElement.value = '';
    renderTodoList();
}