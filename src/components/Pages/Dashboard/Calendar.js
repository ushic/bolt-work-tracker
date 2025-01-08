export function CalendarPage() {
  const container = document.createElement('div');
  container.className = 'page calendar-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Calendar';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>View and manage your calendar here.</p>
    <!-- Add calendar content here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
