import i18n from '../../i18n';

export function createNormForm(onSave, onCancel, initialData = {}, services = []) {
  const form = document.createElement('form');
  form.className = 'form-base norm-form';
  
  // Get labors and parts from localStorage
  const labors = JSON.parse(localStorage.getItem('labors') || '[]')
    .map(labor => ({
      code: labor.data[0],
      name: labor.data[1],
      category: labor.data[2]
    }));
  
  const parts = JSON.parse(localStorage.getItem('parts') || '[]')
    .map(part => ({
      code: part.data[0],
      name: part.data[1],
      type: part.data[2]
    }));
  
  const formFields = [
    { label: `${i18n.t('norms.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true, readonly: true },
    { label: `${i18n.t('norms.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: `${i18n.t('norms.form.service')}<span class="required-asterisk">*</span>`, name: 'service', type: 'select', options: services, required: true },
    { label: i18n.t('norms.form.description'), name: 'description', type: 'textarea' },
    { label: i18n.t('norms.form.active'), name: 'active', type: 'checkbox' }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('norms.form.titleEdit') : i18n.t('norms.form.title')}</h2>
    </div>
    <div class="form-content">
      ${formFields.map(field => {
        if (field.type === 'select') {
          return `
            <div class="form-field">
              <label for="${field.name}">${field.label}</label>
              <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                <option value="">${i18n.t('norms.form.selectService')}</option>
                ${field.options.map(service => `
                  <option value="${service.code}" ${initialData[field.name] === service.code ? 'selected' : ''}>
                    ${service.name}
                  </option>
                `).join('')}
              </select>
            </div>
          `;
        } else if (field.type === 'textarea') {
          return `
            <div class="form-field">
              <label for="${field.name}">${field.label}</label>
              <textarea id="${field.name}" name="${field.name}" rows="4">${initialData[field.name] || ''}</textarea>
            </div>
          `;
        } else if (field.type === 'checkbox') {
          return `
            <div class="form-field checkbox-field">
              <label>
                <input type="checkbox" id="${field.name}" name="${field.name}"
                  ${initialData[field.name] ? 'checked' : ''}>
                ${field.label}
              </label>
            </div>
          `;
        } else {
          return `
            <div class="form-field">
              <label for="${field.name}">${field.label}</label>
              <input type="${field.type}" id="${field.name}" name="${field.name}" 
                value="${initialData[field.name] || ''}"
                ${field.required ? 'required' : ''}
                ${field.readonly ? 'readonly' : ''}>
            </div>
          `;
        }
      }).join('')}

      <!-- Labors Section -->
      <div class="form-section">
        <h3>${i18n.t('norms.form.labors')}</h3>
        <div class="item-section-container">
        <div class="selected-items" id="selected-labors">
          <p class="no-items">${i18n.t('norms.form.noLaborsSelected')}</p>
        </div>
        <div class="add-item-row">
          <select id="labor-select">
            <option value="">${i18n.t('norms.form.addLabor')}</option>
            ${labors.map(labor => `
              <option value="${labor.code}">${labor.name} (${labor.category})</option>
            `).join('')}
          </select>
          <input type="number" id="labor-quantity" min="1" value="1">
          <button type="button" id="add-labor" class="btn-add">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        </div>
      </div>

      <!-- Parts Section -->
      <div class="form-section">
        <h3>${i18n.t('norms.form.parts')}</h3>
        <div class="item-section-container">
        <div class="selected-items" id="selected-parts">
          <p class="no-items">${i18n.t('norms.form.noPartsSelected')}</p>
        </div>
        <div class="add-item-row">
          <select id="part-select">
            <option value="">${i18n.t('norms.form.addPart')}</option>
            ${parts.map(part => `
              <option value="${part.code}">${part.name} (${part.type})</option>
            `).join('')}
          </select>
          <input type="number" id="part-quantity" min="1" value="1">
          <button type="button" id="add-part" class="btn-add">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        </div>
      </div>
    </div>
    <div class="form-actions">
      <button type="button" class="btn-cancel">${i18n.t('common.cancel')}</button>
      <button type="submit" class="btn-save">${i18n.t('common.save')}</button>
    </div>
  `;

  // Initialize selected items
  const selectedLabors = new Map();
  const selectedParts = new Map();
  
  // Initialize with existing data if available
  if (initialData.details) {
    // Load existing labors
    initialData.details.labors?.forEach(labor => {
      const laborData = labors.find(l => l.code === labor.code);
      if (laborData) {
        selectedLabors.set(labor.code, {
          name: laborData.name,
          category: laborData.category,
          quantity: labor.quantity
        });
      }
    });
    
    // Load existing parts
    initialData.details.parts?.forEach(part => {
      const partData = parts.find(p => p.code === part.code);
      if (partData) {
        selectedParts.set(part.code, {
          name: partData.name,
          type: partData.type,
          quantity: part.quantity
        });
      }
    });
    
    // Update displays
    setTimeout(() => {
      updateSelectedItems('labors');
      updateSelectedItems('parts');
    }, 0);
  }

  // Helper function to update selected items display
  function updateSelectedItems(type) {
    const container = form.querySelector(`#selected-${type}`);
    const items = type === 'labors' ? selectedLabors : selectedParts;
    const noItemsText = type === 'labors' ? 
      i18n.t('norms.form.noLaborsSelected') : 
      i18n.t('norms.form.noPartsSelected');
    
    if (items.size === 0) {
      container.innerHTML = `<p class="no-items">${noItemsText}</p>`;
      return;
    }

    container.innerHTML = Array.from(items.entries()).map(([code, data]) => `
      <div class="selected-item" data-code="${code}">
        <span>${data.name}</span>
        <span class="quantity">×${data.quantity}</span>
        <button type="button" class="btn-remove" data-type="${type}" data-code="${code}">×</button>
      </div>
    `).join('');
  }

  // Add labor handler
  form.querySelector('#add-labor').addEventListener('click', () => {
    const select = form.querySelector('#labor-select');
    const quantity = parseInt(form.querySelector('#labor-quantity').value);
    const code = select.value;
    
    if (code && quantity > 0) {
      const labor = labors.find(l => l.code === code);
      if (labor) {
        selectedLabors.set(code, {
          name: labor.name,
          category: labor.category,
          quantity: quantity
        });
        updateSelectedItems('labors');
        select.value = '';
        form.querySelector('#labor-quantity').value = '1';
      }
    }
  });

  // Add part handler
  form.querySelector('#add-part').addEventListener('click', () => {
    const select = form.querySelector('#part-select');
    const quantity = parseInt(form.querySelector('#part-quantity').value);
    const code = select.value;
    
    if (code && quantity > 0) {
      const part = parts.find(p => p.code === code);
      if (part) {
        selectedParts.set(code, {
          name: part.name,
          type: part.type,
          quantity: quantity
        });
        updateSelectedItems('parts');
        select.value = '';
        form.querySelector('#part-quantity').value = '1';
      }
    }
  });

  // Remove item handler
  form.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
      const type = e.target.dataset.type;
      const code = e.target.dataset.code;
      
      if (type === 'labors') {
        selectedLabors.delete(code);
        updateSelectedItems('labors');
      } else if (type === 'parts') {
        selectedParts.delete(code);
        updateSelectedItems('parts');
      }
    }
  });

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .item-section-container {
      background: #fff;
      border: 1px solid #e1e4e8;
      border-radius: 6px;
      padding: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .selected-items {
      margin-bottom: 16px;
      min-height: 50px;
      border-bottom: 1px solid #e1e4e8;
      padding-bottom: 16px;
    }

    .selected-item {
      display: flex;
      align-items: center;
      background: #f6f8fa;
      padding: 12px;
      margin: 8px 0;
      border-radius: 6px;
      border: 1px solid #e1e4e8;
      transition: all 0.2s ease;
    }

    .selected-item:hover {
      border-color: #2ecc71;
      box-shadow: 0 2px 4px rgba(46,204,113,0.1);
    }

    .selected-item span {
      flex: 1;
      font-size: 0.95em;
    }

    .selected-item .quantity {
      margin: 0 10px;
      color: #2ecc71;
      font-weight: 500;
    }

    .btn-remove {
      background: none;
      border: none;
      color: #e74c3c;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .btn-remove:hover {
      background: #fee;
    }

    .btn-add {
      background: #2ecc71;
      color: white;
      border: none;
      padding: 8px;
      width: 36px;
      height: 36px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-add:hover {
      background: #27ae60;
      transform: translateY(-1px);
    }

    .add-item-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-top: 8px;
    }
    
    .add-item-row select {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #e1e4e8;
      border-radius: 4px;
      background: #f6f8fa;
      font-size: 0.95em;
      transition: all 0.2s ease;
    }

    .add-item-row select:focus {
      border-color: #2ecc71;
      box-shadow: 0 0 0 3px rgba(46,204,113,0.1);
      outline: none;
    }

    .add-item-row input[type="number"] {
      width: 80px;
      padding: 8px 12px;
      border: 1px solid #e1e4e8;
      border-radius: 4px;
      background: #f6f8fa;
      font-size: 0.95em;
      transition: all 0.2s ease;
    }

    .add-item-row input[type="number"]:focus {
      border-color: #2ecc71;
      box-shadow: 0 0 0 3px rgba(46,204,113,0.1);
      outline: none;
    }

    .no-items {
      color: #6e7681;
      font-style: italic;
      text-align: center;
      padding: 16px;
      background: #f6f8fa;
      border-radius: 4px;
      margin: 8px 0;
    }
  `;

  return form;
}
