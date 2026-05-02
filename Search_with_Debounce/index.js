const input = document.getElementById('search-input');
const resultsEl = document.getElementById('results');
const spinner = document.getElementById('spinner');
const dot = document.getElementById('dot');
const statusText = document.getElementById('status-text');
const delaySlider = document.getElementById('delay-slider');
const delayVal = document.getElementById('delay-val');
const dKeystrokes = document.getElementById('d-keystrokes');
const dCalls = document.getElementById('d-calls');
const dSaved = document.getElementById('d-saved');
const dQuery = document.getElementById('d-query');
const dTimer = document.getElementById('d-timer');

let debounceTimer = null;
let tickInterval = null;
let keystrokes = 0;
let calls = 0;

function setStatus(state, msg) {
    dot.className = 'dot ' + state;
    statusText.textContent = msg;
}

function highlight(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx < 0) return text;
    return (
        text.slice(0, idx) +
        '<mark>' + text.slice(idx, idx + query.length) + '</mark>' +
        text.slice(idx + query.length)
    );
}

function clearTick() {
    if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
}

async function realSearch(query) {
    spinner.style.display = 'block';
    setStatus('searching', 'Fetching results…');
    dTimer.textContent = 'none';

    try {
        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=10&format=json&origin=*`);
        const data = await res.json();
        
        spinner.style.display = 'none';
        
        if (!query.trim()) {
            resultsEl.innerHTML = '';
            setStatus('', 'Waiting for input');
            return;
        }

        const titles = data[1] || [];
        const descriptions = data[2] || [];

        if (!titles.length) {
            resultsEl.innerHTML = `<div class="empty">No results for "<strong>${query}</strong>"</div>`;
            setStatus('done', '0 results');
        } else {
            resultsEl.innerHTML = titles.map((title, i) => `
                <div class="result-item">
                    <div class="result-title">${highlight(title, query)}</div>
                    <div class="result-sub">${descriptions[i] || ''}</div>
                </div>
            `).join('');
            setStatus('done', `${titles.length} result${titles.length === 1 ? '' : 's'} found`);
        }

        dQuery.textContent = `"${query}"`;
    } catch (err) {
        spinner.style.display = 'none';
        resultsEl.innerHTML = `<div class="empty">Error: ${err.message}</div>`;
        setStatus('done', 'Error');
    }
}

function debounce(fn, delay) {
    return function (...args) {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
            clearTick();
        }

        const query = args[0];
        if (!query.trim()) {
            resultsEl.innerHTML = '';
            setStatus('', 'Waiting for input');
            dTimer.textContent = 'none';
            return;
        }

        setStatus('waiting', `Debouncing… waiting ${delay}ms`);

        let remaining = delay;
        dTimer.textContent = remaining + 'ms left';
        tickInterval = setInterval(() => {
            remaining -= 100;
            dTimer.textContent = remaining > 0 ? remaining + 'ms left' : 'firing…';
            if (remaining <= 0) clearTick();
        }, 100);

        debounceTimer = setTimeout(() => {
            clearTick();
            calls++;
            dCalls.textContent = calls;
            dSaved.textContent = Math.max(0, keystrokes - calls);
            fn(...args);
        }, delay);
    };
}

const debouncedSearch = debounce(realSearch, parseInt(delaySlider.value));

delaySlider.addEventListener('input', () => {
    delayVal.textContent = delaySlider.value + 'ms';
});

input.addEventListener('input', () => {
    keystrokes++;
    dKeystrokes.textContent = keystrokes;
    dSaved.textContent = Math.max(0, keystrokes - calls);

    const currentDelay = parseInt(delaySlider.value);
    if (debounceTimer) { clearTimeout(debounceTimer); clearTick(); }

    const query = input.value;

    if (!query.trim()) {
        resultsEl.innerHTML = '';
        setStatus('', 'Waiting for input');
        dTimer.textContent = 'none';
        return;
    }

    setStatus('waiting', `Debouncing… waiting ${currentDelay}ms`);

    let remaining = currentDelay;
    dTimer.textContent = remaining + 'ms left';
    tickInterval = setInterval(() => {
        remaining -= 100;
        dTimer.textContent = remaining > 0 ? remaining + 'ms left' : 'firing…';
        if (remaining <= 0) clearTick();
    }, 100);

    debounceTimer = setTimeout(() => {
        clearTick();
        calls++;
        dCalls.textContent = calls;
        dSaved.textContent = Math.max(0, keystrokes - calls);
        realSearch(query);
    }, currentDelay);
});
