const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');

function addTask() {
    const taskText = taskInput.value.trim();
    
    // Validation for empty tasks
    if (taskText === '') {
        taskInput.classList.add('is-invalid');
        setTimeout(() => {
            taskInput.classList.remove('is-invalid');
        }, 500);
        return;
    }
    
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center justify-content-between task-item';
    
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-outline-danger btn-sm btn-delete ms-2';
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.onclick = function() {
        deleteTask(li);
    };
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    
    // Clear input and focus
    taskInput.value = '';
    taskInput.focus();
    
    updateUI();
}

function deleteTask(taskElement) {
    // Add fade-out animation
    taskElement.style.transition = 'all 0.3s ease';
    taskElement.style.opacity = '0';
    taskElement.style.transform = 'translateX(20px)';
    
    // Remove after animation
    setTimeout(() => {
        taskElement.remove();
        updateUI();
    }, 300);
}

// Update UI state 
function updateUI() {
    const tasks = taskList.children;
    const count = tasks.length;
    
    // Show/hide empty state
    if (count === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
    
    // Update task count
    taskCount.textContent = count === 1 ? '1 task' : count + ' tasks';
}

 taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskInput.addEventListener('input', function() {
    this.classList.remove('is-invalid');
});

document.addEventListener('DOMContentLoaded', function() {
    updateUI();
    taskInput.focus();
});

