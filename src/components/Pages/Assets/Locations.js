import i18n from '../../../i18n';
import { createLocationForm } from '../../Forms/LocationForm';
import { exportToExcel } from '../../../utils/exportUtils';
import { generateNextCode } from '../../../utils/codeGenerator';

// Initialize locations from localStorage or empty array
let locations = JSON.parse(localStorage.getItem('locations') || '[]').map(location => ({
  id: location.id || Math.random().toString(36).substr(2, 9),
  data: location.data || location
}));

export function LocationsPage() {
  const container = document.createElement('div');
  container.className = 'page locations-page';
  container.style.padding = '80px 20px 20px 20px';
  
  const title = document.createElement('h1');
  title.textContent = i18n.t('locations.title');
  title.style.marginBottom = '20px';
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // Add New Location button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-location-btn';
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

  const content = document.createElement('div');
  content.className = 'page-content';

  // Add export functionality
  exportButton.addEventListener('click', async () => {
    exportButton.disabled = true;
    exportButton.textContent = i18n.t('common.loading');
    
    const headers = [
      i18n.t('locations.table.code'),
      i18n.t('locations.table.name'),
      i18n.t('locations.table.parentAsset'),
      i18n.t('locations.table.category'),
      i18n.t('locations.table.status')
    ];
    
    const success = await exportToExcel(locations, headers);
    
    if (!success) {
      alert(i18n.t('common.exportFailed'));
    }
    
    exportButton.disabled = false;
    exportButton.textContent = i18n.t('common.export');
  });

  newButton.addEventListener('click', () => {
    content.innerHTML = '';
    buttonContainer.style.display = 'none';
    const existingCodes = locations.map(location => location.data[0]);
    const nextCode = generateNextCode('A', existingCodes);
    
    const locationForm = createLocationForm(
      (data) => {
        // Create new location
        const newLocation = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            data.code,
            data.name,
            data.parentAsset || '',
            i18n.t(`locations.form.categories.${data.category}`),
            i18n.t(`locations.form.statuses.${data.status}`)
          ],
          details: {
            description: data.description,
            warehouse: data.warehouse,
            address: data.address,
            state: data.state,
            city: data.city,
            postalCode: data.postalCode
          }
        };
        locations.push(newLocation);
        
        // Save to localStorage
        localStorage.setItem('locations', JSON.stringify(locations));
        
        buttonContainer.style.display = 'flex';
        // Return to list view
        renderLocationList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        // Cancel button clicked - return to list view
        renderLocationList();
      },
      { code: nextCode }
    );
    content.appendChild(locationForm);
  });

  function renderLocationList() {
    content.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'locations-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    const headers = [
      i18n.t('locations.table.code'),
      i18n.t('locations.table.name'),
      i18n.t('locations.table.parentAsset'),
      i18n.t('locations.table.category'),
      i18n.t('locations.table.status')
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
      th.addEventListener('click', () => {
        const index = headers.indexOf(headerText);
        if (index < headers.length - 1) { // Don't sort by actions column
          sortLocations(index);
          renderLocationList();
        }
      });
      
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    locations.forEach((location, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      location.data.forEach(cellText => {
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
        buttonContainer.style.display = 'none';
        const formData = {
          code: location.data[0],
          name: location.data[1],
          parentAsset: location.data[2],
          category: Object.keys(i18n.t('locations.form.categories', { returnObjects: true }))
            .find(key => i18n.t(`locations.form.categories.${key}`) === location.data[3]),
          status: Object.keys(i18n.t('locations.form.statuses', { returnObjects: true }))
            .find(key => i18n.t(`locations.form.statuses.${key}`) === location.data[4]),
          ...location.details
        };
        
        const locationForm = createLocationForm(
          (data) => {
            const updatedLocation = {
              id: location.id,
              data: [
                data.code,
                data.name,
                data.parentAsset || '',
                i18n.t(`locations.form.categories.${data.category}`),
                i18n.t(`locations.form.statuses.${data.status}`)
              ],
              details: {
                description: data.description,
                warehouse: data.warehouse,
                address: data.address,
                state: data.state,
                city: data.city,
                postalCode: data.postalCode
              }
            };
            
            const locationIndex = locations.findIndex(l => l.id === location.id);
            locations[locationIndex] = updatedLocation;
            localStorage.setItem('locations', JSON.stringify(locations));
            buttonContainer.style.display = 'flex';
            renderLocationList();
          },
          () => {
            buttonContainer.style.display = 'flex';
            renderLocationList();
          },
          formData
        );
        content.appendChild(locationForm);
      });
      
      deleteButton.addEventListener('click', () => {
        if (confirm(i18n.t('common.confirmDelete', { item: i18n.t('locations.title') }))) {
          locations = locations.filter(l => l.id !== location.id);
          localStorage.setItem('locations', JSON.stringify(locations));
          renderLocationList();
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
  
  function sortLocations(columnIndex) {
    locations.sort((a, b) => {
      const valueA = a.data[columnIndex].toString().toLowerCase();
      const valueB = b.data[columnIndex].toString().toLowerCase();
      return valueA.localeCompare(valueB);
    });
  }
  
  buttonContainer.appendChild(newButton);
  buttonContainer.appendChild(exportButton);
  
  container.appendChild(title);
  container.appendChild(buttonContainer);
  container.appendChild(content);
  
  renderLocationList();
  return container;
}
