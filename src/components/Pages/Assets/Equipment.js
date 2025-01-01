export function EquipmentPage() {
  const container = document.createElement('div');
  container.className = 'page equipment-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Equipment';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage equipment here.</p>
    <!-- Add equipment content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
