import i18n from '../../i18n';
import { createContractForm } from '../Forms/ContractForm';
import { exportToExcel } from '../../utils/exportUtils';
import { generateNextCode } from '../../utils/codeGenerator';

// Initialize contracts from localStorage or empty array
let contracts = JSON.parse(localStorage.getItem('contracts') || '[]').map(contract => ({
  id: contract.id || Math.random().toString(36).substr(2, 9),
  data: contract.data || contract
}));

export function ContractsPage() {
  const container = document.createElement('div');
  container.className = 'page contracts-page';
  container.style.padding = '80px 20px 20px 20px';
  
  const title = document.createElement('h1');
  title.textContent = i18n.t('contracts.title');
  title.style.marginBottom = '20px';
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  
  // Add New Contract button
  const newButton = document.createElement('button');
  newButton.textContent = i18n.t('common.new');
  newButton.className = 'new-contract-btn';
  newButton.style.cssText = `
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  `;

  const content = document.createElement('div');
  content.className = 'page-content';

  newButton.addEventListener('click', () => {
    content.innerHTML = '';
    buttonContainer.style.display = 'none';
    const existingCodes = contracts.map(contract => contract.data[0]);
    const nextCode = generateNextCode('C', existingCodes);
    
    const contractForm = createContractForm(
      (data) => {
        // Create new contract
        const newContract = {
          id: Math.random().toString(36).substr(2, 9),
          data: [
            data.code,
            data.name,
            data.contractNumber,
            i18n.t(`contracts.form.types.${data.type}`),
            data.partyOrganization || '',
            data.partyContact || '',
            data.endDate || '',
            i18n.t(`contracts.form.statuses.${data.status}`)
          ],
          details: {
            amount: data.amount,
            frequency: data.frequency,
            startDate: data.startDate,
            generalEndDate: data.generalEndDate,
            services: data.services,
            labors: data.labors,
            parts: data.parts
          }
        };
        contracts.push(newContract);
        
        // Save to localStorage
        localStorage.setItem('contracts', JSON.stringify(contracts));
        
        buttonContainer.style.display = 'flex';
        // Return to list view
        renderContractList();
      },
      () => {
        buttonContainer.style.display = 'flex';
        // Cancel button clicked - return to list view
        renderContractList();
      },
      { code: nextCode }
    );
    content.appendChild(contractForm);
  });

  function renderContractList() {
    content.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'contracts-table';
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `;
    
    const headers = [
      i18n.t('contracts.table.code'),
      i18n.t('contracts.table.name'),
      i18n.t('contracts.table.contractNumber'),
      i18n.t('contracts.table.type'),
      i18n.t('contracts.table.partyOrganization'),
      i18n.t('contracts.table.partyContact'),
      i18n.t('contracts.table.endDate'),
      i18n.t('contracts.table.status')
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
    contracts.forEach((contract, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#90dfaa' : 'white';
      tr.style.color = 'black';
      
      contract.data.forEach(cellText => {
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
          code: contract.data[0],
          name: contract.data[1],
          contractNumber: contract.data[2],
          type: Object.keys(i18n.t('contracts.form.types', { returnObjects: true }))
            .find(key => i18n.t(`contracts.form.types.${key}`) === contract.data[3]),
          partyOrganization: contract.data[4],
          partyContact: contract.data[5],
          endDate: contract.data[6],
          status: Object.keys(i18n.t('contracts.form.statuses', { returnObjects: true }))
            .find(key => i18n.t(`contracts.form.statuses.${key}`) === contract.data[7]),
          // Add general section data
          amount: contract.details?.amount,
          frequency: contract.details?.frequency,
          startDate: contract.details?.startDate,
          generalEndDate: contract.details?.generalEndDate,
          // Add services data
          services: contract.details?.services || [],
          // Add labors and parts data
          labors: contract.details?.labors || [],
          parts: contract.details?.parts || []
        };
        
        const contractForm = createContractForm(
          (data) => {
            const updatedContract = {
              id: contract.id,
              data: [
                data.code,
                data.name,
                data.contractNumber,
                i18n.t(`contracts.form.types.${data.type}`),
                data.partyOrganization || '',
                data.partyContact || '',
                data.endDate || '',
                i18n.t(`contracts.form.statuses.${data.status}`)
              ],
              details: {
                amount: data.amount,
                frequency: data.frequency,
                startDate: data.startDate,
                generalEndDate: data.generalEndDate,
                services: data.services,
                labors: data.labors,
                parts: data.parts
              }
            };
            
            const contractIndex = contracts.findIndex(c => c.id === contract.id);
            contracts[contractIndex] = updatedContract;
            localStorage.setItem('contracts', JSON.stringify(contracts));
            buttonContainer.style.display = 'flex';
            renderContractList();
          },
          () => {
            buttonContainer.style.display = 'flex';
            renderContractList();
          },
          formData
        );
        content.appendChild(contractForm);
      });
      
      deleteButton.addEventListener('click', () => {
        if (confirm(i18n.t('common.confirmDelete', { item: i18n.t('contracts.title') }))) {
          contracts = contracts.filter(c => c.id !== contract.id);
          localStorage.setItem('contracts', JSON.stringify(contracts));
          renderContractList();
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
  
  container.appendChild(title);
  container.appendChild(buttonContainer);
  container.appendChild(content);
  
  renderContractList();
  return container;
}
