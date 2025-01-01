export function ToolsPage() {
  const container = document.createElement('div');
  container.className = 'page tools-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Tools';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage tools here.</p>
    <!-- Add tools content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
