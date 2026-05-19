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

const rumiNewsData = [
  {
    title: "Rumi Discovers Ancient Demon Containment Spell",
    summary: "K-pop sensation Rumi shocked the demon hunter community by discovering a lost incantation during a secret ritual. The spell is said to neutralize even the most powerful demonic entities.",
    url: "#rumi-news-1"
  },
  {
    title: "Rumi Performs Live Concert While Fighting Demons",
    summary: "In an unprecedented display of multitasking, Rumi simultaneously performed her latest K-pop hit while battling shadow demons. Fans are calling it the most iconic concert moment of the decade.",
    url: "#rumi-news-2"
  },
  {
    title: "Rumi's Demon Hunter Training Goes Viral on Social Media",
    summary: "Behind-the-scenes clips of Rumi's intense training regimen have accumulated 50 million views. Critics praise her dedication to both her music career and demon hunting profession.",
    url: "#rumi-news-3"
  },
  {
    title: "Exclusive: Rumi Releases Demon Hunter Survival Guide",
    summary: "Rumi has authored a comprehensive guide on surviving demonic encounters while maintaining a thriving K-pop career. The book became a bestseller within hours of release.",
    url: "#rumi-news-4"
  },
  {
    title: "Rumi Teams Up with Fellow Hunters for Epic Battle",
    summary: "Rumi joined forces with other elite demon hunters to face off against a legendary boss demon. The collaboration has fans excited for potential future projects.",
    url: "#rumi-news-5"
  }
];

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
    newsStatus.textContent = 'K-pop Demon Hunters - Rumi News';
    rumiNewsData.forEach((article) => {
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
