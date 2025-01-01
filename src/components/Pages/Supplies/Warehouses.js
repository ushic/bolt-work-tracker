export function WarehousesPage() {
  const container = document.createElement('div');
  container.className = 'page warehouses-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Warehouses';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage warehouses here.</p>
    <!-- Add warehouses management content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}