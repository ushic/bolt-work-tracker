import i18n from '../../../i18n';
import { createWarehouseForm } from '../../Forms/WarehouseForm';
import { exportToExcel } from '../../../utils/exportUtils';
import { generateNextCode } from '../../../utils/codeGenerator';

// Initialize warehouses from localStorage or empty array
let warehouses = JSON.parse(localStorage.getItem('warehouses') || '[]').map(warehouse => ({
  id: warehouse.id || Math.random().toString(36).substr(2, 9),
  data: warehouse.data || warehouse
}));

export function WarehousesPage() {
  const container = document.createElement('div');
  container.className = 'page warehouses-page';
  container.style.padding = '80px 20px 20px 20px';
  
  // Page Header
  const title = document.createElement('h1');
  title.textContent = i18n.t('warehouses.title');
  title.style.marginBottom = '20px';
  
  // Button Container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // New Warehouse Button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-warehouse-btn';
  newButton.style.cssText = `
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  `;
  
  // Export Button
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

  // Content Container
  const content = document.createElement('div');
  content.className = 'page-content';

  // Export Functionality
  exportButton.addEventListener('click', async () => {
    exportButton.disabled = true;
    exportButton.textContent = i18n.t('common.loading');
    
    const headers = [
      i18n.t('warehouses.table.code'),
      i18n.t('warehouses.table.name'),
      i18n.t('warehouses.table.type'),
      i18n.t('warehouses.table.organization'),
      i18n.t('warehouses.table.status')
    ];
    
    const success = await exportToExcel(warehouses, headers);
    
    if (!success) {
      alert(i18n.t('common.exportFailed'));
    }
    
    exportButton.disabled = false;
    exportButton.textContent = i18n.t('common.export');
  });

  // New Warehouse Form Handler
  newButton.addEventListener('click', () => {
    content.innerHTML = '';
    buttonContainer.style.display = 'none';
    const existingCodes = warehouses.map(warehouse => warehouse.data[0]);
    const nextCode = generateNextCode('W', existingCodes);
    
    const warehouseForm = createWarehouseForm(
      (data) => {
        // Create new warehouse
        const newWarehouse = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            data.code,
            data.name,
            data.type,
            data.organization || '',
            data.status
          ]
        };
        warehouses.push(newWarehouse);
        
        // Save to localStorage
        localStorage.setItem('warehouses', JSON.stringify(warehouses));
        
        buttonContainer.style.display = 'flex';
        renderWarehouseList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        renderWarehouseList();
      },
      { code: nextCode }
    );
    content.appendChild(warehouseForm);
  });

  // Render Warehouse List
  function renderWarehouseList() {
    content.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'warehouses-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    // Table Headers
    const headers = [
      i18n.t('warehouses.table.code'),
      i18n.t('warehouses.table.name'),
      i18n.t('warehouses.table.type'),
      i18n.t('warehouses.table.organization'),
      i18n.t('warehouses.table.status')
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
        cursor: pointer;
      `;
      
      // Add sort functionality
      if (headerText !== i18n.t('common.actions')) {
        th.addEventListener('click', () => {
          const index = headers.indexOf(headerText);
          sortWarehouses(index);
          renderWarehouseList();
        });
      }
      
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Table Body
    const tbody = document.createElement('tbody');
    warehouses.forEach((warehouse, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      warehouse.data.forEach(cellText => {
        const td = document.createElement('td');
        td.textContent = cellText;
        td.style.cssText = `
          padding: 8px;
          border-bottom: 1px solid #eee;
          text-align: ${document.documentElement.dir === 'rtl' ? 'right' : 'left'};
        `;
        tr.appendChild(td);
      });
      
      // Actions Column
      const actionsTd = document.createElement('td');
      actionsTd.style.cssText = `
        padding: 8px;
        border-bottom: 1px solid #eee;
        white-space: nowrap;
        text-align: ${document.documentElement.dir === 'rtl' ? 'right' : 'left'};
      `;
      
      // Edit Button
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
      
      // Delete Button
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.style.cssText = `
        background: none;
        border: none;
        color: #e74c3c;
        cursor: pointer;
        padding: 4px 8px;
      `;
      
      actionsTd.appendChild(editButton);
      actionsTd.appendChild(deleteButton);
      tr.appendChild(actionsTd);
      
      tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    content.appendChild(table);
  }
  
  // Sort Warehouses
  function sortWarehouses(columnIndex) {
    warehouses.sort((a, b) => {
      const valueA = a.data[columnIndex].toString().toLowerCase();
      const valueB = b.data[columnIndex].toString().toLowerCase();
      return valueA.localeCompare(valueB);
    });
  }
  
  // Assemble Page
  buttonContainer.appendChild(newButton);
  buttonContainer.appendChild(exportButton);
  
  container.appendChild(title);
  container.appendChild(buttonContainer);
  container.appendChild(content);
  
  // Initial Render
  renderWarehouseList();
  
  return container;
}
