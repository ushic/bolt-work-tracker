export function GroupsPage() {
  const container = document.createElement('div');
  container.className = 'page groups-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Asset Groups';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage asset groups here.</p>
    <!-- Add groups content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
