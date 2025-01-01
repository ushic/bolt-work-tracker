export function MyActionsPage() {
  const container = document.createElement('div');
  container.className = 'page my-actions-page';
  
  const title = document.createElement('h1');
  title.textContent = 'My Actions';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage your actions here.</p>
    <!-- Add actions content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
