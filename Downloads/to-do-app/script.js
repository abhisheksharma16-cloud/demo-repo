const splashScreen = document.getElementById('splash-screen');
const signInScreen = document.getElementById('sign-in-screen');
const appShell = document.getElementById('app-shell');
const googleSignInButton = document.getElementById('google-sign-in');
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const newsList = document.getElementById('news-list');
const newsStatus = document.getElementById('news-status');
let newsRefreshInterval = null;

function createTodoItem(text) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('p');
  span.className = 'todo-text';
  span.textContent = text;
  span.title = 'Click to mark complete';
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', () => {
    li.remove();
    updateEmptyState();
  });

  li.append(span, deleteButton);
  return li;
}

function updateEmptyState() {
  const hasTodos = todoList.children.length > 0;
  const existingEmpty = document.querySelector('.todo-empty');

  if (!hasTodos) {
    if (!existingEmpty) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'todo-empty';
      emptyMessage.textContent = 'No todos yet. Add one to get started!';
      todoList.append(emptyMessage);
    }
  } else if (existingEmpty) {
    existingEmpty.remove();
  }
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const todoItem = createTodoItem(text);
  todoList.appendChild(todoItem);
  updateEmptyState();
  todoInput.value = '';
  todoInput.focus();
}

function showSignInScreen() {
  splashScreen.classList.add('hidden');
  signInScreen.classList.remove('hidden');
}

function showAppShell() {
  signInScreen.classList.add('hidden');
  appShell.classList.remove('hidden');
  todoInput.focus();
  if (!newsRefreshInterval) {
    fetchLatestNews();
    newsRefreshInterval = window.setInterval(fetchLatestNews, 10000);
  }
}

function renderNewsItem(article) {
  const li = document.createElement('li');
  li.className = 'news-item';

  const title = document.createElement('h3');
  title.textContent = article.title;

  const summary = document.createElement('p');
  summary.textContent = article.summary || 'No summary available.';

  const link = document.createElement('a');
  link.href = article.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Read more';

  li.append(title, summary, link);
  return li;
}

function showNewsLoading() {
  newsStatus.textContent = 'Loading latest news...';
}

function showNewsError() {
  newsStatus.textContent = 'Unable to load news right now. Please try again later.';
}

async function fetchLatestNews() {
  newsList.innerHTML = '';
  showNewsLoading();

  try {
    const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles?limit=5');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    const articles = Array.isArray(data.results) ? data.results : [];

    if (articles.length === 0) {
      newsStatus.textContent = 'No news available at the moment.';
      return;
    }

    newsStatus.textContent = 'Top 5 latest news';
    articles.forEach((article) => {
      newsList.appendChild(renderNewsItem(article));
    });
  } catch (error) {
    console.error('News fetch failed:', error);
    showNewsError();
  }
}

addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

googleSignInButton.addEventListener('click', showAppShell);

setTimeout(showSignInScreen, 1600);
updateEmptyState();
