export function LocationsPage() {
  const container = document.createElement('div');
  container.className = 'page Locations-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Locations';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>Manage system Locations here.</p>
    <!-- Add your Locations UI here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
