document.addEventListener('DOMContentLoaded', function () {
    // ===== DOM Elements =====
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const openAddModal = document.getElementById('openAddModal');
    const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
    const modalTitle = document.getElementById('modalTitle');
    const modalTaskInput = document.getElementById('modalTaskInput');
    const modalPlannedDate = document.getElementById('modalPlannedDate');
    const modalSaveBtn = document.getElementById('modalSaveBtn');
    const diffBtns = document.querySelectorAll('.diff-btn');
    const filterBtns = document.querySelectorAll('[data-filter]');
    const rewardToast = document.getElementById('rewardToast');

    // Profile 
    const elLevel = document.getElementById('level');
    const elXP = document.getElementById('xp');
    const elCoins = document.getElementById('coins');
    const elCompletedCount = document.getElementById('completedCount');
    const elXpBar = document.getElementById('xpBar');
    const elXpCurrent = document.getElementById('xpCurrent');
    const elXpNeeded = document.getElementById('xpNeeded');
    const elRewardXP = document.getElementById('rewardXP');
    const elRewardCoin = document.getElementById('rewardCoin');
    const userNameDisplay = document.getElementById('userNameDisplay');

    let tasks = [];
    let profile = { totalXP: 0, level: 1, coins: 0, tasksCompleted: 0 };
    let editingId = null;
    let currentFilter = 'all';
    let selectedDifficulty = 'easy';

    const difficultyRewards = {
        easy: { xp: 10, coins: 5 },
        medium: { xp: 25, coins: 15 },
        hard: { xp: 50, coins: 30 }
    };

    const XP_PER_LEVEL = 100;

    loadData();
    renderTasks();
    updateProfileUI();

    let originalUserName = 'User Name';

    // Load saved username
    const savedUserName = localStorage.getItem('xpTracker_username');
    if (savedUserName) {
        userNameDisplay.textContent = savedUserName;
        originalUserName = savedUserName;
    }

    userNameDisplay.addEventListener('click', function () {
        if (userNameDisplay.isContentEditable) return;
        userNameDisplay.contentEditable = 'true';
        userNameDisplay.classList.add('editing');
        userNameDisplay.focus();

        const range = document.createRange();
        range.selectNodeContents(userNameDisplay);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    });

    userNameDisplay.addEventListener('blur', saveUserName);

    userNameDisplay.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            userNameDisplay.blur();
        }
    });

    userNameDisplay.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            userNameDisplay.textContent = originalUserName;
            userNameDisplay.contentEditable = 'false';
            userNameDisplay.classList.remove('editing');
        }
    });

    function saveUserName() {
        const newName = userNameDisplay.textContent.trim();
        if (newName) {
            userNameDisplay.textContent = newName;
            originalUserName = newName;
            localStorage.setItem('xpTracker_username', newName);
        } else {
            userNameDisplay.textContent = originalUserName;
        }
        userNameDisplay.contentEditable = 'false';
        userNameDisplay.classList.remove('editing');
    }

    // ===== Event Listeners =====
    openAddModal.addEventListener('click', () => openModal());

    modalSaveBtn.addEventListener('click', saveTask);

    modalTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveTask();
    });

    diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            diffBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDifficulty = btn.dataset.diff;
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // ===== Modal Functions =====
    function openModal(task = null) {
        editingId = task ? task.id : null;
        modalTitle.textContent = task ? 'Edit Task' : 'Add New Task';
        modalTaskInput.value = task ? task.text : '';
        modalSaveBtn.textContent = task ? 'Update Task' : 'Save Task';

        if (task) {
            selectedDifficulty = task.difficulty;
            diffBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.diff === task.difficulty);
            });
            // Set planned date for editing
            if (task.plannedDate) {
                modalPlannedDate.value = toDatetimeLocal(new Date(task.plannedDate));
            } else {
                modalPlannedDate.value = '';
            }
        } else {
            selectedDifficulty = 'easy';
            diffBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.diff === 'easy');
            });
            modalPlannedDate.value = '';
        }

        taskModal.show();
        setTimeout(() => modalTaskInput.focus(), 200);
    }

    function saveTask() {
        const text = modalTaskInput.value.trim();
        if (!text) {
            alert('Please enter a task name!');
            return;
        }

        const plannedDateValue = modalPlannedDate.value;

        if (editingId) {
            const task = tasks.find(t => t.id === editingId);
            if (task) {
                task.text = text;
                task.difficulty = selectedDifficulty;
                task.plannedDate = plannedDateValue ? new Date(plannedDateValue).toISOString() : null;
            }
        } else {
            const newTask = {
                id: Date.now().toString(),
                text: text,
                difficulty: selectedDifficulty,
                date: new Date().toISOString(),
                plannedDate: plannedDateValue ? new Date(plannedDateValue).toISOString() : null,
                completed: false,
                completedDate: null
            };
            tasks.unshift(newTask);
        }

        saveData();
        renderTasks();
        taskModal.hide();
        modalTaskInput.value = '';
        modalPlannedDate.value = '';
        editingId = null;
    }

    // ===== Task Rendering =====
    function renderTasks() {
        const filtered = filterTasks();

        if (filtered.length === 0) {
            taskList.innerHTML = '';
            taskList.appendChild(emptyState);
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        taskList.innerHTML = '';

        filtered.forEach(task => {
            const card = createTaskCard(task);
            taskList.appendChild(card);
        });
    }

    function filterTasks() {
        if (currentFilter === 'active') return tasks.filter(t => !t.completed);
        if (currentFilter === 'completed') return tasks.filter(t => t.completed);
        return tasks;
    }

    function createTaskCard(task) {
        const div = document.createElement('div');
        div.className = `task-card diff-${task.difficulty} ${task.completed ? 'completed' : ''}`;

        const rewards = difficultyRewards[task.difficulty];
        const formattedDate = formatDate(new Date(task.date));

        // Build meta tags HTML
        let metaHTML = `<span class="task-date">${formattedDate}</span>`;

        // Planned date
        if (task.plannedDate) {
            const planned = new Date(task.plannedDate);
            const isOverdue = !task.completed && planned < new Date();
            const plannedText = formatShortDateTime(planned);
            metaHTML += `<span class="task-planned ${isOverdue ? 'overdue' : ''}">📅 ${isOverdue ? 'Overdue: ' : 'Due: '}${plannedText}</span>`;
        }

        // Completion time
        if (task.completed && task.completedDate) {
            const completed = new Date(task.completedDate);
            metaHTML += `<span class="task-completed-time">✓ Done: ${formatShortDateTime(completed)}</span>`;
        }

        metaHTML += `<span class="task-reward reward-${task.difficulty}">+${rewards.xp} XP · ${rewards.coins}🪙</span>`;

        div.innerHTML = `
            <div class="task-check ${task.completed ? 'checked' : ''}" data-id="${task.id}">
                ${task.completed ? '✓' : ''}
            </div>
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.text)}</div>
                <div class="task-meta">
                    ${metaHTML}
                </div>
            </div>
            <div class="task-actions">
                <button class="task-btn edit" data-id="${task.id}" title="Edit">✏️</button>
                <button class="task-btn delete" data-id="${task.id}" title="Delete">🗑️</button>
            </div>
        `;

        // Checkbox toggle
        div.querySelector('.task-check').addEventListener('click', () => {
            toggleTaskComplete(task.id);
        });

        // Edit button
        div.querySelector('.task-btn.edit').addEventListener('click', () => {
            openModal(task);
        });

        // Delete button
        div.querySelector('.task-btn.delete').addEventListener('click', () => {
            if (confirm('Delete this task?')) {
                deleteTask(task.id);
            }
        });

        return div;
    }

    // ===== Task Actions =====
    function toggleTaskComplete(id) {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const rewards = difficultyRewards[task.difficulty];

        if (!task.completed) {
            // Complete task - give rewards
            task.completed = true;
            task.completedDate = new Date().toISOString();
            profile.totalXP += rewards.xp;
            profile.coins += rewards.coins;
            profile.tasksCompleted += 1;
            showRewardToast(rewards.xp, rewards.coins);
        } else {
            // Uncomplete task - remove rewards
            task.completed = false;
            task.completedDate = null;
            profile.totalXP = Math.max(0, profile.totalXP - rewards.xp);
            profile.coins = Math.max(0, profile.coins - rewards.coins);
            profile.tasksCompleted = Math.max(0, profile.tasksCompleted - 1);
        }

        // Recalculate levels
        profile.level = Math.floor(profile.totalXP / XP_PER_LEVEL) + 1;

        saveData();
        renderTasks();
        updateProfileUI();
    }

    function deleteTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task && task.completed) {
            // Remove rewards if deleting completed task
            const rewards = difficultyRewards[task.difficulty];
            profile.totalXP = Math.max(0, profile.totalXP - rewards.xp);
            profile.coins = Math.max(0, profile.coins - rewards.coins);
            profile.tasksCompleted = Math.max(0, profile.tasksCompleted - 1);
            profile.level = Math.floor(profile.totalXP / XP_PER_LEVEL) + 1;
        }

        tasks = tasks.filter(t => t.id !== id);
        saveData();
        renderTasks();
        updateProfileUI();
    }

    // ===== Profile UI =====
    function updateProfileUI() {
        elLevel.textContent = profile.level;
        elXP.textContent = profile.totalXP;
        elCoins.textContent = profile.coins;
        elCompletedCount.textContent = profile.tasksCompleted;

        const xpInLevel = profile.totalXP % XP_PER_LEVEL;
        const xpNeeded = XP_PER_LEVEL;
        const progress = (xpInLevel / xpNeeded) * 100;

        elXpBar.style.width = `${progress}%`;
        elXpCurrent.textContent = xpInLevel;
        elXpNeeded.textContent = xpNeeded;
    }

    // ===== Reward Toast =====
    let toastTimeout;
    function showRewardToast(xp, coins) {
        elRewardXP.textContent = xp;
        elRewardCoin.textContent = coins;
        rewardToast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            rewardToast.classList.remove('show');
        }, 3000);
    }

    // ===== Utilities =====
    function formatDate(date) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
        const dayNum = date.getDate();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        return `${dayName}, ${monthName} ${dayNum} · ${hours}:${minutes} ${ampm}`;
    }

    function formatShortDateTime(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = months[date.getMonth()];
        const dayNum = date.getDate();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        return `${monthName} ${dayNum}, ${hours}:${minutes} ${ampm}`;
    }

    function toDatetimeLocal(date) {
        const pad = (n) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function saveData() {
        localStorage.setItem('xpTracker_tasks', JSON.stringify(tasks));
        localStorage.setItem('xpTracker_profile', JSON.stringify(profile));
    }

    function loadData() {
        const savedTasks = localStorage.getItem('xpTracker_tasks');
        const savedProfile = localStorage.getItem('xpTracker_profile');

        if (savedTasks) {
            try {
                tasks = JSON.parse(savedTasks);
            } catch (e) {
                tasks = [];
            }
        }

        if (savedProfile) {
            try {
                profile = JSON.parse(savedProfile);
            } catch (e) {
                profile = { totalXP: 0, level: 1, coins: 0, tasksCompleted: 0 };
            }
        }
    }
});

