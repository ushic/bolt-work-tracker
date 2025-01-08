import i18n from '../../../i18n';
import { createFormForm } from '../../Forms/FormForm';
import { exportToExcel } from '../../../utils/exportUtils';
import { generateNextCode } from '../../../utils/codeGenerator';

// Initialize forms from localStorage or empty array
let forms = JSON.parse(localStorage.getItem('forms') || '[]').map(form => ({
  id: form.id || Math.random().toString(36).substr(2, 9),
  data: form.data || form
}));

export function FormsPage() {
  const container = document.createElement('div');
  container.className = 'page forms-page';
  container.style.padding = '80px 20px 20px 20px';
  
  const title = document.createElement('h1');
  title.textContent = i18n.t('forms.title');
  title.style.marginBottom = '20px';
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // Add New Form button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-form-btn';
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
      i18n.t('forms.table.code'),
      i18n.t('forms.table.name'),
      i18n.t('forms.table.active')
    ];
    
    const success = await exportToExcel(forms, headers);
    
    if (!success) {
      alert(i18n.t('common.exportFailed'));
    }
    
    exportButton.disabled = false;
    exportButton.textContent = i18n.t('common.export');
  });

  newButton.addEventListener('click', () => {
    content.innerHTML = '';
    buttonContainer.style.display = 'none';
    const existingCodes = forms.map(form => form.data[0]);
    const nextCode = generateNextCode('F', existingCodes);
    
    const formComponent = createFormForm(
      (data) => {
        // Create new form
        const newForm = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            data.code,
            data.name,
            data.description || '',
            data.active ? i18n.t('forms.table.activeStatus.true') : i18n.t('forms.table.activeStatus.false')
          ]
        };
        forms.push(newForm);
        
        // Save to localStorage
        localStorage.setItem('forms', JSON.stringify(forms));
        
        buttonContainer.style.display = 'flex';
        // Return to list view
        renderFormList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        // Cancel button clicked - return to list view
        renderFormList();
      },
      { code: nextCode }
    );
    content.appendChild(formComponent);
  });

  function renderFormList() {
    content.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'forms-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    const headers = [
      i18n.t('forms.table.code'),
      i18n.t('forms.table.name'),
      i18n.t('forms.table.active')
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
    forms.forEach((form, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      // Display only code, name, and active status
      [form.data[0], form.data[1], form.data[3]].forEach(cellText => {
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
          code: form.data[0],
          name: form.data[1],
          description: form.data[2],
          active: form.data[3] === i18n.t('forms.table.activeStatus.true')
        };
        
        const formComponent = createFormForm(
          (data) => {
            const updatedForm = {
              id: form.id,
              data: [
                data.code,
                data.name,
                data.description || '',
                data.active ? i18n.t('forms.table.activeStatus.true') : i18n.t('forms.table.activeStatus.false')
              ]
            };
            
            const formIndex = forms.findIndex(f => f.id === form.id);
            forms[formIndex] = updatedForm;
            localStorage.setItem('forms', JSON.stringify(forms));
            renderFormList();
          },
          () => renderFormList(),
          formData
        );
        content.appendChild(formComponent);
      });
      
      deleteButton.addEventListener('click', () => {
        if (confirm(i18n.t('common.confirmDelete', { item: i18n.t('forms.title') }))) {
          forms = forms.filter(f => f.id !== form.id);
          localStorage.setItem('forms', JSON.stringify(forms));
          renderFormList();
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
  
  renderFormList();
  return container;
}
