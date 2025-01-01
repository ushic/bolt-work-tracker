export function WorkOrdersPage() {
  const container = document.createElement('div');
  container.className = 'page work-orders-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Work Orders';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage work orders here.</p>
    <!-- Add work orders content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
