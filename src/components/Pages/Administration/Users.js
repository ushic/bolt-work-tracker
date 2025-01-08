export function UsersPage() {
  const container = document.createElement('div');
  container.className = 'page users-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Users';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>Manage system users here.</p>
    <!-- Add your user management UI here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
