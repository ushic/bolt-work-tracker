export function ItemsPage() {
  const container = document.createElement('div');
  container.className = 'page items-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Catalog Items';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage catalog items here.</p>
    <!-- Add catalog items content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
