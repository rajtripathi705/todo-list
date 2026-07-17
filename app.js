(() => {
  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const listEl = document.getElementById('todo-list');

  const STORAGE_KEY = 'simple_todos_v1';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function save(todos) { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); }

  function render() {
    const todos = load();
    listEl.innerHTML = '';
    todos.forEach((t, idx) => {
      const li = document.createElement('li');
      if (t.done) li.classList.add('completed');

      const chk = document.createElement('input');
      chk.type = 'checkbox'; chk.checked = !!t.done;
      chk.addEventListener('change', () => {
        t.done = chk.checked; save(todos); render();
      });

      const span = document.createElement('span');
      span.className = 'text'; span.textContent = t.text;

      const del = document.createElement('button');
      del.className = 'btn'; del.textContent = '✕';
      del.title = 'Delete';
      del.addEventListener('click', () => { todos.splice(idx,1); save(todos); render(); });

      li.appendChild(chk);
      li.appendChild(span);
      li.appendChild(del);
      listEl.appendChild(li);
    });
  }

  function addTodo(text) {
    const todos = load();
    todos.unshift({ text: text.trim(), done: false });
    save(todos); render();
  }

  addBtn.addEventListener('click', () => {
    const v = input.value; if (!v.trim()) return; addTodo(v); input.value=''; input.focus();
  });

  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addBtn.click(); });

  render();
})();
