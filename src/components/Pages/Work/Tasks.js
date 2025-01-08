export function TasksPage() {
  const container = document.createElement('div');
  container.className = 'page tasks-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Tasks';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage tasks here.</p>
    <!-- Add tasks content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
