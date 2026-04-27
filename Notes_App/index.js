const htmlEl = document.documentElement;
const themeIcon = document.getElementById('themeIcon');
const notesGrid = document.getElementById('notesGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const noteModal = new bootstrap.Modal(document.getElementById('noteModal'));
const modalTitle = document.getElementById('modalTitle');
const titleInput = document.getElementById('noteTitle');
const contentInput = document.getElementById('noteContent');

let notes = JSON.parse(localStorage.getItem('notesAppNotes') || '[]');
let editId = null;

function loadTheme() {
    const t = localStorage.getItem('notesAppTheme') || 'light';
    htmlEl.setAttribute('data-bs-theme', t);
    themeIcon.className = t === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const t = htmlEl.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-bs-theme', t);
    localStorage.setItem('notesAppTheme', t);
    themeIcon.className = t === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
});

function saveNotes() {
    localStorage.setItem('notesAppNotes', JSON.stringify(notes));
}

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
}

function renderNotes(query = '') {
    notesGrid.innerHTML = '';
    const q = query.toLowerCase().trim();
    const filtered = notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
                         .sort((a, b) => b.updatedAt - a.updatedAt);

    if (!filtered.length) {
        emptyState.style.display = 'block';
        emptyState.querySelector('h4').textContent = q ? 'No matching notes' : 'No notes yet';
        emptyState.querySelector('p').textContent = q ? `No notes found for "${escapeHtml(query)}"` : 'Create a new note to get started!';
        return;
    }
    emptyState.style.display = 'none';

    filtered.forEach(n => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <div class="card h-100 shadow-sm note-card" data-id="${n.id}">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${escapeHtml(n.title)}</h5>
                    <p class="card-text text-secondary note-content">${escapeHtml(n.content)}</p>
                </div>
                <div class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center">
                    <small class="text-muted">${new Date(n.updatedAt).toLocaleString()}</small>
                    <div class="btn-group">
                        <button class="btn btn-outline-success btn-sm me-2" onclick="openEdit('${n.id}')" aria-label="Edit"><i class="bi bi-pencil icon-edit"></i></button>
                        <button class="btn btn-outline-danger btn-sm" onclick="delNote('${n.id}')" aria-label="Delete"><i class="bi bi-trash icon-delete"></i></button>
                    </div>
                </div>
            </div>`;
        notesGrid.appendChild(div);
    });
}

function openModal() {
    editId = null;
    modalTitle.textContent = 'New Note';
    titleInput.value = contentInput.value = '';
    titleInput.classList.remove('is-invalid');
    contentInput.classList.remove('is-invalid');
    noteModal.show();
    setTimeout(() => titleInput.focus(), 200);
}

function openEdit(id) {
    const n = notes.find(x => x.id === id);
    if (!n) return;
    editId = id;
    modalTitle.textContent = 'Edit Note';
    titleInput.value = n.title;
    contentInput.value = n.content;
    titleInput.classList.remove('is-invalid');
    contentInput.classList.remove('is-invalid');
    noteModal.show();
    setTimeout(() => titleInput.focus(), 200);
}

function saveNote() {
    const t = titleInput.value.trim(), c = contentInput.value.trim();
    if (!t || !c) {
        if (!t) titleInput.classList.add('is-invalid');
        if (!c) contentInput.classList.add('is-invalid');
        return;
    }
    if (editId) {
        const n = notes.find(x => x.id === editId);
        n.title = t; n.content = c; n.updatedAt = Date.now();
    } else {
        notes.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2), title: t, content: c, createdAt: Date.now(), updatedAt: Date.now() });
    }
    saveNotes();
    renderNotes(searchInput.value);
    noteModal.hide();
}

function delNote(id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.style.cssText = 'transition:opacity .3s,transform .3s;opacity:0;transform:scale(.95)';
        setTimeout(() => { notes = notes.filter(n => n.id !== id); saveNotes(); renderNotes(searchInput.value); }, 300);
    } else {
        notes = notes.filter(n => n.id !== id); saveNotes(); renderNotes(searchInput.value);
    }
}

searchInput.addEventListener('input', e => renderNotes(e.target.value));
[titleInput, contentInput].forEach(el => el.addEventListener('input', () => el.classList.remove('is-invalid')));

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    renderNotes();
});

