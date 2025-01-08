export function RolesPage() {
  const container = document.createElement('div');
  container.className = 'page roles-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Roles';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>Manage system roles and permissions here.</p>
    <!-- Add your role management UI here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
