export function ContactsPage() {
  const container = document.createElement('div');
  container.className = 'page Contacts-page';
  
  const title = document.createElement('h1');
  title.textContent = 'Contacts';
  
  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <p>Manage system Contacts here.</p>
    <!-- Add your Contacts UI here -->
  `;
  
  container.appendChild(title);
  container.appendChild(content);
  return container;
}
