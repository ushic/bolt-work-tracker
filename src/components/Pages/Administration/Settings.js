export function SettingsPage() {
  const container = document.createElement('div');
  container.className = 'page settings-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Settings';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>Manage your system settings here.</p>
    <!-- Add your settings management UI here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
