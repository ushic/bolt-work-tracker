import i18n from '../../../i18n';
import { createServiceForm } from '../../Forms/ServiceForm';
import { exportToExcel } from '../../../utils/exportUtils';
import { generateNextCode } from '../../../utils/codeGenerator';

// Initialize services from localStorage or empty array
let services = JSON.parse(localStorage.getItem('services') || '[]').map(service => ({
  id: service.id || Math.random().toString(36).substr(2, 9),
  data: service.data || service
}));

export function ServicesPage() {
  const container = document.createElement('div');
  container.className = 'page services-page';
  container.style.padding = '80px 20px 20px 20px';
  
  const title = document.createElement('h1');
  title.textContent = i18n.t('services.title');
  title.style.marginBottom = '20px';
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // Add New Service button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-service-btn';
  newButton.style.cssText = `
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-left: ${document.documentElement.dir === 'rtl' ? '0' : '10px'};
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
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-right: ${document.documentElement.dir === 'rtl' ? '10px' : '0'};
  `;

  const content = document.createElement('div');
  content.className = 'page-content';

  // Add export functionality
  exportButton.addEventListener('click', async () => {
    exportButton.disabled = true;
    exportButton.textContent = i18n.t('common.loading');
    
    const headers = [
      i18n.t('services.table.code'),
      i18n.t('services.table.name'),
      i18n.t('services.table.category'),
      i18n.t('services.table.active')
    ];
    
    const success = await exportToExcel(services, headers);
    
    if (!success) {
      alert(i18n.t('common.exportFailed'));
    }
    
    exportButton.disabled = false;
    exportButton.textContent = i18n.t('common.export');
  });

  newButton.addEventListener('click', () => {
    content.innerHTML = '';
    buttonContainer.style.display = 'none';
    const existingCodes = services.map(service => service.data[0]);
    const nextCode = generateNextCode('S', existingCodes);
    
    const serviceForm = createServiceForm(
      (data) => {
        // Create new service
        const newService = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            data.code,
            data.name,
            data.category || '',
            data.description || '',
            data.active ? i18n.t('services.table.activeStatus.true') : i18n.t('services.table.activeStatus.false')
          ]
        };
        services.push(newService);
        
        // Save to localStorage
        localStorage.setItem('services', JSON.stringify(services));
        
        buttonContainer.style.display = 'flex';
        // Return to list view
        renderServiceList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        // Cancel button clicked - return to list view
        renderServiceList();
      },
      { code: nextCode }
    );
    content.appendChild(serviceForm);
  });

  function renderServiceList() {
    content.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'services-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    const headers = [
      i18n.t('services.table.code'),
      i18n.t('services.table.name'),
      i18n.t('services.table.category'),
      i18n.t('services.table.active')
    ];
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
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
    
    const tbody = document.createElement('tbody');
    services.forEach((service, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      // Display all columns except description (index 3)
      service.data.forEach((cellText, cellIndex) => {
        if (cellIndex === 3) return; // Skip description column
        const td = document.createElement('td');
        td.textContent = cellText;
        td.style.cssText = `
          padding: 8px;
          border-bottom: 1px solid #eee;
        `;
        tr.appendChild(td);
      });
      
      const actionsTd = document.createElement('td');
      actionsTd.style.cssText = `
        padding: 8px;
        border-bottom: 1px solid #eee;
        white-space: nowrap;
      `;
      
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
      
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.style.cssText = `
        background: none;
        border: none;
        color: #e74c3c;
        cursor: pointer;
        padding: 4px 8px;
      `;
      
      editButton.addEventListener('click', () => {
        content.innerHTML = '';
        const formData = {
          code: service.data[0],
          name: service.data[1],
          category: service.data[2],
          description: service.data[3],
          active: service.data[4] === i18n.t('services.table.activeStatus.true')
        };
        
        const serviceForm = createServiceForm(
          (data) => {
            const updatedService = {
              id: service.id,
              data: [
                data.code,
                data.name,
                data.category || '',
                data.description || '',
                data.active ? i18n.t('services.table.activeStatus.true') : i18n.t('services.table.activeStatus.false')
              ]
            };
            
            const serviceIndex = services.findIndex(s => s.id === service.id);
            services[serviceIndex] = updatedService;
            localStorage.setItem('services', JSON.stringify(services));
            renderServiceList();
          },
          () => renderServiceList(),
          formData
        );
        content.appendChild(serviceForm);
      });
      
      deleteButton.addEventListener('click', () => {
        if (confirm(i18n.t('common.confirmDelete', { item: i18n.t('services.title') }))) {
          services = services.filter(s => s.id !== service.id);
          localStorage.setItem('services', JSON.stringify(services));
          renderServiceList();
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
  
  renderServiceList();
  return container;
}
