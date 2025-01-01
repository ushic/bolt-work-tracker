export function MyAssetsPage() {
  const container = document.createElement('div');
  container.className = 'page my-assets-page';
  
  const title = document.createElement('h1');
  title.textContent = 'My Assets';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage your assets here.</p>
    <!-- Add assets content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
