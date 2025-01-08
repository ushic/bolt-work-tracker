import i18n from '../../../i18n';
import { createContactForm } from '../../Forms/ContactForm';
import { exportToExcel } from '../../../utils/exportUtils';

// Initialize contacts from localStorage or empty array
let contacts = JSON.parse(localStorage.getItem('contacts') || '[]').map(contact => ({
  id: contact.id || Math.random().toString(36).substr(2, 9),
  data: contact.data || contact // Support old format
}));

export function ContactsPage() {
  const container = document.createElement('div');
  container.className = 'page contacts-page';
  container.style.padding = '80px 20px 20px 20px';
  
  const title = document.createElement('h1');
  title.textContent = i18n.t('contacts.title');
  title.style.marginBottom = '20px';
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // Add New Contact button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-contact-btn';
  newButton.style.cssText = `
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  `;
  
  // Add Export button
  const exportButton = document.createElement('button');
  exportButton.textContent = i18n.t('common.export');
  exportButton.className = 'export-btn';
  exportButton.style.cssText = `
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  `;

  // Add export functionality
  exportButton.addEventListener('click', async () => {
    exportButton.disabled = true;
    exportButton.textContent = i18n.t('common.loading');
    
    const headers = [
      i18n.t('contacts.table.fullName'),
      i18n.t('contacts.table.jobTitle'),
      i18n.t('contacts.table.company'),
      i18n.t('contacts.table.organization'),
      i18n.t('contacts.table.email'),
      i18n.t('contacts.table.mobile')
    ];
    const success = await exportToExcel(contacts, headers);
    
    if (!success) {
      alert(i18n.t('common.exportFailed'));
    }
    
    exportButton.disabled = false;
    exportButton.textContent = i18n.t('common.export');
  });

  const content = document.createElement('div');
  content.className = 'page-content';

  newButton.addEventListener('click', () => {
    content.innerHTML = '';
    buttonContainer.style.display = 'none';
    const contactForm = createContactForm(
      (data) => {
        // Create new contact with unique ID
        const newContact = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            `${data.firstName} ${data.lastName}`,
            data.jobTitle || '',
            data.company || '',
            '', // Organization (not in form)
            data.email || '',
            data.phone || ''
          ]
        };
        contacts.push(newContact);
        
        // Save to localStorage
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        buttonContainer.style.display = 'flex';
        // Return to list view with updated data
        renderContactList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        // Cancel button clicked - return to list view
        renderContactList();
      }
    );
    content.appendChild(contactForm);
  });

  function renderContactList() {
    content.innerHTML = '';
    // Create table
    const table = document.createElement('table');
    table.className = 'contacts-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    // Table headers
    const headers = [
      i18n.t('contacts.table.fullName'),
      i18n.t('contacts.table.jobTitle'),
      i18n.t('contacts.table.company'),
      i18n.t('contacts.table.organization'),
      i18n.t('contacts.table.email'),
      i18n.t('contacts.table.mobile')
    ];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Add Actions column header
    headers.push(i18n.t('common.actions'));
    
    headerRow.style.backgroundColor = '#2f4050';
    
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.style.cssText = `
        padding: 8px;
        text-align: ${document.documentElement.dir === 'rtl' ? 'right' : 'left'};
        color: white;
        font-weight: 500;
      `;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Table body
    const tbody = document.createElement('tbody');
    contacts.forEach((contact, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      // Add data cells
      contact.data.forEach(cellText => {
        const td = document.createElement('td');
        td.textContent = cellText;
        td.style.cssText = `
          padding: 8px;
          border-bottom: 1px solid #eee;
        `;
        tr.appendChild(td);
      });
      
      // Add actions cell
      const actionsTd = document.createElement('td');
      actionsTd.style.cssText = `
        padding: 8px;
        border-bottom: 1px solid #eee;
        white-space: nowrap;
      `;
      
      // Edit button
      const editButton = document.createElement('button');
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.style.cssText = `
        background: none;
        border: none;
        color: #2ecc71;
        cursor: pointer;
        margin-right: 8px;
        padding: 4px 8px;
      `;
      editButton.addEventListener('click', () => {
        content.innerHTML = '';
        const formData = parseContactData(contact.data);
        const contactForm = createContactForm(
          (data) => {
            // Update existing contact
            const updatedContact = {
              id: contact.id,
              data: [
                `${data.firstName} ${data.lastName}`,
                data.jobTitle || '',
                data.company || '',
                '', // Organization
                data.email || '',
                data.phone || ''
              ]
            };
            
            // Replace the old contact with updated one
            const contactIndex = contacts.findIndex(c => c.id === contact.id);
            contacts[contactIndex] = updatedContact;
            
            // Save to localStorage
            localStorage.setItem('contacts', JSON.stringify(contacts));
            
            // Return to list view
            renderContactList();
          },
          () => {
            // Cancel button clicked - return to list view
            renderContactList();
          },
          formData // Pass existing data to pre-fill the form
        );
        content.appendChild(contactForm);
      });
      
      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.style.cssText = `
        background: none;
        border: none;
        color: #e74c3c;
        cursor: pointer;
        padding: 4px 8px;
      `;
      deleteButton.addEventListener('click', () => {
        if (confirm(i18n.t('common.confirmDelete', { item: i18n.t('contacts.title') }))) {
          contacts = contacts.filter(c => c.id !== contact.id);
          localStorage.setItem('contacts', JSON.stringify(contacts));
          renderContactList();
        }
      });
      
      actionsTd.appendChild(editButton);
      actionsTd.appendChild(deleteButton);
      tr.appendChild(actionsTd);
      
      tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    content.appendChild(table);
  }
  
  buttonContainer.appendChild(newButton);
  buttonContainer.appendChild(exportButton);

  container.appendChild(title);
  container.appendChild(buttonContainer);
  container.appendChild(content);
  
  // Initial render of contact list
  renderContactList();
  
  return container;
}
