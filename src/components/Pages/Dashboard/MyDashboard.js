export function MyDashboardPage() {
  const container = document.createElement('div');
  container.className = 'page dashboard-page';
  
  const title = document.createElement('h1');
  title.textContent = 'My Dashboard';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View your personalized dashboard here.</p>
    <!-- Add dashboard content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
