const form = document.querySelector('form')
const todos = document.querySelector('.todos');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let todo = form.querySelector('input').value.trim();
    if (todo) {
        form.querySelector('input').value = '';
        let data = {
            text: todo,
            status: ''
        }
        addTask(data);
    } else {
        alert('You haven\'t typed Task');
    }
    saveToStorage();
})


function addTask(data) {
    let li = document.createElement("li");
    if (data.status === 'completed')
        li.classList.add('completed');
    li.innerHTML = `
                        <span >${data.text}</span>
                        <i class='bx bxs-trash'></i>
                     `

    li.addEventListener('click', function () {
        this.classList.toggle('completed')
        saveToStorage();
    })

    li.querySelector('i').addEventListener('click', (e) => {
        e.target.parentElement.remove()
        saveToStorage();
    })
    todos.appendChild(li);
}

function saveToStorage() {
    let tasks = document.querySelectorAll('li');
    let arrayTask = [];
    tasks.forEach(e => {
        let text = e.querySelector('span').innerText;
        let status = e.getAttribute('class');
        arrayTask.push({ text, status });
    }
    )

    localStorage.setItem('todoList', JSON.stringify(arrayTask));
}

function init() {
    let arrayTask = JSON.parse(localStorage.getItem('todoList')) || [];
    arrayTask.forEach(e => {
        addTask(e);
    })
}

init();