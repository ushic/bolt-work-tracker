import i18n from '../../../i18n';
import { createPartForm } from '../../Forms/PartForm';
import { exportToExcel } from '../../../utils/exportUtils';
import { generateNextCode } from '../../../utils/codeGenerator';

// Initialize parts from localStorage or empty array
let parts = JSON.parse(localStorage.getItem('parts') || '[]').map(part => ({
  id: part.id || Math.random().toString(36).substr(2, 9),
  data: part.data || part
}));

export function PartsPage() {
  const container = document.createElement('div');
  container.className = 'page parts-page';
  container.style.padding = '80px 20px 20px 20px';
  
  const title = document.createElement('h1');
  title.textContent = i18n.t('parts.title');
  title.style.marginBottom = '20px';
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // Add New Part button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-part-btn';
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
      i18n.t('parts.table.code'),
      i18n.t('parts.table.name'),
      i18n.t('parts.table.type'),
      i18n.t('parts.table.category'),
      i18n.t('parts.table.warranty'),
      i18n.t('parts.table.active')
    ];
    
    const success = await exportToExcel(parts, headers);
    
    if (!success) {
      alert(i18n.t('common.exportFailed'));
    }
    
    exportButton.disabled = false;
    exportButton.textContent = i18n.t('common.export');
  });

  newButton.addEventListener('click', () => {
    content.innerHTML = '';
    buttonContainer.style.display = 'none';
    const existingCodes = parts.map(part => part.data[0]);
    const nextCode = generateNextCode('P', existingCodes);
    
    const partForm = createPartForm(
      (data) => {
        // Create new part
        const newPart = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            data.code,
            data.name,
            i18n.t(`parts.form.types.${data.type}`),
            i18n.t(`parts.form.categories.${data.category}`),
            data.warranty || '0',
            data.active ? i18n.t('parts.table.activeStatus.true') : i18n.t('parts.table.activeStatus.false')
          ]
        };
        parts.push(newPart);
        
        // Save to localStorage
        localStorage.setItem('parts', JSON.stringify(parts));
        
        buttonContainer.style.display = 'flex';
        // Return to list view
        renderPartList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        // Cancel button clicked - return to list view
        renderPartList();
      },
      { code: nextCode }
    );
    content.appendChild(partForm);
  });

  function renderPartList() {
    content.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'parts-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    const headers = [
      i18n.t('parts.table.code'),
      i18n.t('parts.table.name'),
      i18n.t('parts.table.type'),
      i18n.t('parts.table.category'),
      i18n.t('parts.table.warranty'),
      i18n.t('parts.table.active')
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
    parts.forEach((part, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      part.data.forEach(cellText => {
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
          code: part.data[0],
          name: part.data[1],
          type: Object.keys(i18n.t('parts.form.types', { returnObjects: true }))
            .find(key => i18n.t(`parts.form.types.${key}`) === part.data[2]),
          category: Object.keys(i18n.t('parts.form.categories', { returnObjects: true }))
            .find(key => i18n.t(`parts.form.categories.${key}`) === part.data[3]),
          warranty: part.data[4],
          active: part.data[5] === i18n.t('parts.table.activeStatus.true')
        };
        
        const partForm = createPartForm(
          (data) => {
            const updatedPart = {
              id: part.id,
              data: [
                data.code,
                data.name,
                i18n.t(`parts.form.types.${data.type}`),
                i18n.t(`parts.form.categories.${data.category}`),
                data.warranty || '0',
                data.active ? i18n.t('parts.table.activeStatus.true') : i18n.t('parts.table.activeStatus.false')
              ]
            };
            
            const partIndex = parts.findIndex(p => p.id === part.id);
            parts[partIndex] = updatedPart;
            localStorage.setItem('parts', JSON.stringify(parts));
            renderPartList();
          },
          () => renderPartList(),
          formData
        );
        content.appendChild(partForm);
      });
      
      deleteButton.addEventListener('click', () => {
        if (confirm(i18n.t('common.confirmDelete', { item: i18n.t('parts.title') }))) {
          parts = parts.filter(p => p.id !== part.id);
          localStorage.setItem('parts', JSON.stringify(parts));
          renderPartList();
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
  
  renderPartList();
  return container;
}
