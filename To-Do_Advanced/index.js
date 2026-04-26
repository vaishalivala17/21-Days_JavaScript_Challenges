const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');

let tasks = [];
let currentFilter = 'all';

function loadTasks() {
    const stored = localStorage.getItem('advancedTodoTasks');
    if (stored) {
        try {
            tasks = JSON.parse(stored);
        } catch (e) {
            tasks = [];
        }
    }
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('advancedTodoTasks', JSON.stringify(tasks));
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

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
    
    const newTask = {
        id: generateId(),
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    
    // Clear input and focus
    taskInput.value = '';
    taskInput.focus();
    
    renderTasks();
}

function deleteTask(id) {
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    if (taskElement) {
        // Add fade-out animation
        taskElement.style.transition = 'all 0.3s ease';
        taskElement.style.opacity = '0';
        taskElement.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }, 300);
    }
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function startEdit(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const li = document.querySelector(`[data-id="${id}"]`);
    if (!li) return;
    
    // Replace content with edit input
    li.innerHTML = '';
    li.className = 'list-group-item d-flex align-items-center task-item';
    
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'form-control edit-input';
    editInput.value = task.text;
    editInput.setAttribute('aria-label', 'Edit task');
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-outline-success btn-sm btn-save ms-2';
    saveBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
    saveBtn.setAttribute('aria-label', 'Save task');
    saveBtn.onclick = function() {
        saveEdit(id, editInput.value.trim());
    };
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-outline-secondary btn-sm btn-cancel ms-1';
    cancelBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
    cancelBtn.setAttribute('aria-label', 'Cancel edit');
    cancelBtn.onclick = function() {
        renderTasks();
    };
    
    li.appendChild(editInput);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);
    
    editInput.focus();
    editInput.select();
    
    // Save 
    editInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saveEdit(id, editInput.value.trim());
        }
    });
    
    // Cancel
    editInput.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            renderTasks();
        }
    });
}

function saveEdit(id, newText) {
    if (newText === '') {
        renderTasks();
        return;
    }
    
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        saveTasks();
        renderTasks();
    }
}

function setFilter(filter) {
    currentFilter = filter;
    
    // Update active state on filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    
    // Filter tasks
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center justify-content-between task-item';
        li.setAttribute('data-id', task.id);
        
        const leftDiv = document.createElement('div');
        leftDiv.className = 'd-flex align-items-center flex-grow-1';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label', 'Mark task as complete');
        checkbox.onchange = function() {
            toggleComplete(task.id);
        };
        
        const span = document.createElement('span');
        span.className = 'task-text' + (task.completed ? ' completed' : '');
        span.textContent = task.text;
        span.onclick = function() {
            if (!task.completed) {
                toggleComplete(task.id);
            }
        };
        
        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);
        
        const btnGroup = document.createElement('div');
        btnGroup.className = 'd-flex';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-outline-primary btn-sm btn-edit ms-2';
        editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
        editBtn.setAttribute('aria-label', 'Edit task');
        editBtn.onclick = function() {
            startEdit(task.id);
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-outline-danger btn-sm btn-delete ms-1';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.onclick = function() {
            deleteTask(task.id);
        };
        
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);
        
        li.appendChild(leftDiv);
        li.appendChild(btnGroup);
        taskList.appendChild(li);
    });
    
    updateUI(filteredTasks.length);
}

function updateUI(filteredCount) {
    const totalCount = tasks.length;
    const activeCount = tasks.filter(t => !t.completed).length;
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (filteredCount === 0) {
        emptyState.classList.add('show');
        if (currentFilter === 'completed' && totalCount > 0) {
            emptyState.querySelector('p').textContent = 'No completed tasks yet.';
        } else if (currentFilter === 'active' && totalCount > 0) {
            emptyState.querySelector('p').textContent = 'No active tasks. Great job!';
        } else {
            emptyState.querySelector('p').textContent = 'No tasks yet. Add one above!';
        }
    } else {
        emptyState.classList.remove('show');
    }
    
    // task count
    let countText = '';
    if (currentFilter === 'all') {
        countText = totalCount === 1 ? '1 task' : `${totalCount} tasks`;
    } else if (currentFilter === 'active') {
        countText = `${activeCount} active`;
    } else if (currentFilter === 'completed') {
        countText = `${completedCount} completed`;
    }
    taskCount.textContent = countText;
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
    loadTasks();
    taskInput.focus();
});

