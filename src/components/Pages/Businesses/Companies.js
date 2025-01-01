import i18n from '../../../i18n';
import { createCompanyForm } from '../../Forms/CompanyForm';
import { exportToExcel } from '../../../utils/exportUtils';

// Initialize companies from localStorage or empty array
let companies = JSON.parse(localStorage.getItem('companies') || '[]').map(company => ({
  id: company.id || Math.random().toString(36).substr(2, 9),
  data: company.data || company // Support old format
}));

export function CompaniesPage() {
  const container = document.createElement('div');
  container.className = 'page companies-page';
  container.style.padding = '80px 20px 20px 20px';
  
  const title = document.createElement('h1');
  title.textContent = i18n.t('companies.title');
  title.style.marginBottom = '20px';
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // Add New Company button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-company-btn';
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
      i18n.t('companies.table.code'),
      i18n.t('companies.table.name'),
      i18n.t('companies.table.type'),
      i18n.t('companies.table.active')
    ];
    const success = await exportToExcel(companies, headers);
    
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
    const companyForm = createCompanyForm(
      async (data) => {
        // Create new company with unique ID
        const newCompany = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            data.code || '',
            data.name || '',
            data.type || '',
            data.active ? i18n.t('companies.table.activeStatus.true') : i18n.t('companies.table.activeStatus.false')
          ]
        };
        companies.push(newCompany);
        
        // Save to localStorage
        localStorage.setItem('companies', JSON.stringify(companies));
        
        buttonContainer.style.display = 'flex';
        // Return to list view with updated data
        renderCompanyList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        // Cancel button clicked - return to list view
        renderCompanyList();
      }
    );
    content.appendChild(companyForm);
  });

  function renderCompanyList() {
    content.innerHTML = '';
    // Create table
    const table = document.createElement('table');
    table.className = 'companies-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    // Table headers
    const headers = [
      i18n.t('companies.table.code'),
      i18n.t('companies.table.name'),
      i18n.t('companies.table.type'),
      i18n.t('companies.table.active')
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
    companies.forEach((company, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      // Add data cells
      company.data.forEach(cellText => {
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
        const formData = {
          code: company.data[0],
          name: company.data[1],
          type: company.data[2],
          active: company.data[3] === 'Yes'
        };
        const companyForm = createCompanyForm(
          (data) => {
            // Update existing company
            const updatedCompany = {
              id: company.id,
              data: [
                data.code || '',
                data.name || '',
                data.type || '',
                data.active ? 'Yes' : 'No'
              ]
            };
            
            // Replace the old company with updated one
            const companyIndex = companies.findIndex(c => c.id === company.id);
            companies[companyIndex] = updatedCompany;
            
            // Save to localStorage
            localStorage.setItem('companies', JSON.stringify(companies));
            
            // Return to list view
            renderCompanyList();
          },
          () => {
            // Cancel button clicked - return to list view
            renderCompanyList();
          },
          formData
        );
        content.appendChild(companyForm);
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
        if (confirm(i18n.t('common.confirmDelete', { item: i18n.t('companies.title') }))) {
          companies = companies.filter(c => c.id !== company.id);
          localStorage.setItem('companies', JSON.stringify(companies));
          renderCompanyList();
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
  
  // Initial render of company list
  renderCompanyList();
  
  return container;
}
