export function RequestsPage() {
  const container = document.createElement('div');
  container.className = 'page requests-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Work Requests';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage work requests here.</p>
    <!-- Add work requests content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
