document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskName = document.getElementById('taskInput').value;
    if (taskName) {
        fetch('https://ykqt5dlvjb.execute-api.eu-north-1.amazonaws.com/prod/put', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                taskName: taskName,
                completed: false
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                loadTasks();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
function loadTasks() {
    fetch('https://ykqt5dlvjb.execute-api.eu-north-1.amazonaws.com/prod/get')
        .then(response => response.json()) // Convertit la réponse en objet JSON
        .then(data => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            if (!Array.isArray(data)) {
                console.error('Error: Expected an array but received:', data);
                return;
            }

            data.forEach(taskObject => {
                const task = {
                    taskId: taskObject.taskId.N,
                    taskName: taskObject.taskName.S,
                    completed: taskObject.completed.S === 'true'
                };

                const taskElement = document.createElement('li');
                taskElement.textContent = task.taskName;
                taskElement.setAttribute('data-taskId', task.taskId);
                if (task.completed) {
                    taskElement.classList.add('completed');
                }
                taskElement.addEventListener('click', () => toggleTask(task.taskId));
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Supprimer';
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteTask(task.taskId);
                });
                taskElement.appendChild(deleteBtn);
                taskList.appendChild(taskElement);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function toggleTask(taskId) {

}

function deleteTask(taskId) {

}

loadTasks();
