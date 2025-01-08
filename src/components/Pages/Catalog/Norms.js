import i18n from '../../../i18n';
import { createNormForm } from '../../Forms/NormForm';
import { exportToExcel } from '../../../utils/exportUtils';
import { generateNextCode } from '../../../utils/codeGenerator';

// Initialize norms and services from localStorage
let norms = JSON.parse(localStorage.getItem('norms') || '[]').map(norm => ({
  id: norm.id || Math.random().toString(36).substr(2, 9),
  data: norm.data || norm
}));

let services = JSON.parse(localStorage.getItem('services') || '[]').map(service => ({
  code: service.data[0],
  name: service.data[1]
}));

export function NormsPage() {
  const container = document.createElement('div');
  container.className = 'page norms-page';
  container.style.padding = '80px 20px 20px 20px';
  
  const title = document.createElement('h1');
  title.textContent = i18n.t('norms.title');
  title.style.marginBottom = '20px';
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // Add New Norm button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-norm-btn';
  newButton.style.cssText = `
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.2s;
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
  `;

  const content = document.createElement('div');
  content.className = 'page-content';

  // Add export functionality
  exportButton.addEventListener('click', async () => {
    exportButton.disabled = true;
    exportButton.textContent = i18n.t('common.loading');
    
    const headers = [
      i18n.t('norms.table.code'),
      i18n.t('norms.table.name'),
      i18n.t('norms.table.service'),
      i18n.t('norms.table.active')
    ];
    
    const success = await exportToExcel(norms, headers);
    
    if (!success) {
      alert(i18n.t('common.exportFailed'));
    }
    
    exportButton.disabled = false;
    exportButton.textContent = i18n.t('common.export');
  });

  newButton.addEventListener('click', () => {
    content.innerHTML = '';
    buttonContainer.style.display = 'none';
    const existingCodes = norms.map(norm => norm.data[0]);
    const nextCode = generateNextCode('ST', existingCodes);
    
    const normForm = createNormForm(
      (data) => {
        // Get service name from code
        const service = services.find(s => s.code === data.service);
        
        // Store labors and parts data separately
        const normDetails = {
          labors: data.labors,
          parts: data.parts
        };
        
        // Create new norm
        const newNorm = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            data.code,
            data.name,
            service ? service.name : '',
            data.active ? i18n.t('norms.table.activeStatus.true') : i18n.t('norms.table.activeStatus.false')
          ],
          details: normDetails
        };
        norms.push(newNorm);
        
        // Save to localStorage
        localStorage.setItem('norms', JSON.stringify(norms));
        
        buttonContainer.style.display = 'flex';
        // Return to list view
        renderNormList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        // Cancel button clicked - return to list view
        renderNormList();
      },
      { code: nextCode },
      services
    );
    content.appendChild(normForm);
  });

  function renderNormList() {
    content.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'norms-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    const headers = [
      i18n.t('norms.table.code'),
      i18n.t('norms.table.name'),
      i18n.t('norms.table.service'),
      i18n.t('norms.table.active')
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
    norms.forEach((norm, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      norm.data.forEach(cellText => {
        const td = document.createElement('td');
        td.textContent = cellText;
        td.style.cssText = `
          padding: 8px;
          border-bottom: 1px solid #eee;
          text-align: ${document.documentElement.dir === 'rtl' ? 'right' : 'left'};
        `;
        tr.appendChild(td);
      });
      
      const actionsTd = document.createElement('td');
      actionsTd.style.cssText = `
        padding: 8px;
        border-bottom: 1px solid #eee;
        white-space: nowrap;
        text-align: ${document.documentElement.dir === 'rtl' ? 'right' : 'left'};
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
          code: norm.data[0],
          name: norm.data[1],
          service: services.find(s => s.name === norm.data[2])?.code,
          active: norm.data[3] === i18n.t('norms.table.activeStatus.true')
        };
        
        const normForm = createNormForm(
          (data) => {
            const service = services.find(s => s.code === data.service);
            
            // Store labors and parts data separately
            const normDetails = {
              labors: data.labors,
              parts: data.parts
            };
            
            const updatedNorm = {
              id: norm.id,
              data: [
                data.code,
                data.name,
                service ? service.name : '',
                data.active ? i18n.t('norms.table.activeStatus.true') : i18n.t('norms.table.activeStatus.false')
              ],
              details: normDetails
            };
            
            const normIndex = norms.findIndex(n => n.id === norm.id);
            norms[normIndex] = updatedNorm;
            localStorage.setItem('norms', JSON.stringify(norms));
            renderNormList();
          },
          () => renderNormList(),
          formData,
          services
        );
        content.appendChild(normForm);
      });
      
      deleteButton.addEventListener('click', () => {
        if (confirm(i18n.t('common.confirmDelete', { item: i18n.t('norms.title') }))) {
          norms = norms.filter(n => n.id !== norm.id);
          localStorage.setItem('norms', JSON.stringify(norms));
          renderNormList();
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
  
  renderNormList();
  return container;
}
