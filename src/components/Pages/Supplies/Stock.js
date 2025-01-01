export function StockPage() {
  const container = document.createElement('div');
  container.className = 'page stock-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Stock Management';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage stock inventory here.</p>
    <!-- Add stock management content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
