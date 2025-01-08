export function ProjectsPage() {
  const container = document.createElement('div');
  container.className = 'page projects-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Projects';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage projects here.</p>
    <!-- Add projects content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
