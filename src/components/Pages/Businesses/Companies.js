export function CompaniesPage() {
  const container = document.createElement('div');
  container.className = 'page Companies-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Companies';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>Manage system Companies here.</p>
    <!-- Add your Companies UI here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
