import i18n from '../../i18n';

export function createContractForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base contract-form';
  
  const formFields = [
    { label: `${i18n.t('contracts.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true, readonly: true },
    { label: `${i18n.t('contracts.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: `${i18n.t('contracts.form.contractNumber')}<span class="required-asterisk">*</span>`, name: 'contractNumber', type: 'text', required: true },
    { label: `${i18n.t('contracts.form.type')}<span class="required-asterisk">*</span>`, name: 'type', type: 'select', options: [
      { value: 'client', label: i18n.t('contracts.form.types.client') },
      { value: 'serviceProvider', label: i18n.t('contracts.form.types.serviceProvider') }
    ], required: true },
    { label: i18n.t('contracts.form.partyOrganization'), name: 'partyOrganization', type: 'text' },
    { label: i18n.t('contracts.form.partyContact'), name: 'partyContact', type: 'text' },
    { label: i18n.t('contracts.form.endDate'), name: 'endDate', type: 'date' },
    { label: `${i18n.t('contracts.form.status')}<span class="required-asterisk">*</span>`, name: 'status', type: 'select', options: [
      { value: 'active', label: i18n.t('contracts.form.statuses.active') },
      { value: 'draft', label: i18n.t('contracts.form.statuses.draft') },
      { value: 'expired', label: i18n.t('contracts.form.statuses.expired') },
      { value: 'suspended', label: i18n.t('contracts.form.statuses.suspended') }
    ], required: true }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('contracts.form.titleEdit') : i18n.t('contracts.form.title')}</h2>
    </div>
    <div class="form-content">
      <div class="form-row">
        ${[formFields[0], formFields[1]].map(field => {
        if (field.type === 'select') {
          return `
            <div class="form-field" style="flex: 1;">
              <label for="${field.name}">${field.label}</label>
              <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                <option value="">${i18n.t('contracts.form.selectOption')}</option>
                ${field.options.map(option => `
                  <option value="${option.value}" ${initialData[field.name] === option.value ? 'selected' : ''}>
                    ${option.label}
                  </option>
                `).join('')}
              </select>
            </div>
          `;
        } else {
          return `
            <div class="form-field" style="flex: 1;">
              <label for="${field.name}">${field.label}</label>
              <input type="${field.type}" id="${field.name}" name="${field.name}" 
                value="${initialData[field.name] || ''}"
                ${field.required ? 'required' : ''}
                ${field.readonly ? 'readonly' : ''}>
            </div>
          `;
        }
      }).join('')}</div>
      
      <div class="form-row">
        ${[formFields[2], formFields[6]].map(field => `
          <div class="form-field" style="flex: 1;">
            <label for="${field.name}">${field.label}</label>
            ${field.type === 'date' ? `
              <input type="date" 
                id="${field.name}" 
                name="${field.name}" 
                value="${initialData[field.name] || ''}"
                ${field.required ? 'required' : ''}
                min="${new Date().toISOString().split('T')[0]}"
                class="date-input">
            ` : `
            <input type="${field.type}" id="${field.name}" name="${field.name}" 
              value="${initialData[field.name] || ''}"
              ${field.required ? 'required' : ''}
              ${field.readonly ? 'readonly' : ''}>
            `}
          </div>
        `).join('')}
      </div>
      
      <div class="form-row">
        ${[formFields[3], formFields[7]].map(field => `
          <div class="form-field" style="flex: 1;">
            <label for="${field.name}">${field.label}</label>
            <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
              <option value="">${i18n.t('contracts.form.selectOption')}</option>
              ${field.options.map(option => `
                <option value="${option.value}" ${initialData[field.name] === option.value ? 'selected' : ''}>
                  ${option.label}
                </option>
              `).join('')}
            </select>
          </div>
        `).join('')}
      </div>
      
      <div class="form-row">
        ${[formFields[4], formFields[5]].map(field => `
          <div class="form-field" style="flex: 1;">
            <label for="${field.name}">${field.label}</label>
            <input type="${field.type}" id="${field.name}" name="${field.name}" 
              value="${initialData[field.name] || ''}"
              ${field.required ? 'required' : ''}
              ${field.readonly ? 'readonly' : ''}>
          </div>
        `).join('')}
      </div>

      <!-- Section Buttons -->
      <div class="form-sections-nav">
        <button type="button" class="section-btn active" data-section="general">
          <i class="fas fa-info-circle"></i>
          ${i18n.t('contracts.form.sections.general')}
        </button>
        <button type="button" class="section-btn" data-section="services">
          <i class="fas fa-cogs"></i>
          ${i18n.t('contracts.form.sections.services')}
        </button>
        <button type="button" class="section-btn" data-section="labors">
          <i class="fas fa-hard-hat"></i>
          ${i18n.t('contracts.form.sections.labors')}
        </button>
        <button type="button" class="section-btn" data-section="parts">
          <i class="fas fa-tools"></i>
          ${i18n.t('contracts.form.sections.parts')}
        </button>
      </div>

      <!-- General Section -->
      <div class="form-section" id="general-section" style="display: none;">
        <div class="form-row">
          <div class="form-field" style="flex: 1;">
            <label>${i18n.t('contracts.form.amount')}<span class="required-asterisk">*</span></label>
            <input type="number" name="amount" min="0" step="0.01" required value="${initialData.amount || ''}">
          </div>
          <div class="form-field" style="flex: 1;">
            <label>${i18n.t('contracts.form.frequency')}<span class="required-asterisk">*</span></label>
            <select name="frequency" required>
              <option value="">${i18n.t('contracts.form.selectOption')}</option>
              <option value="monthly" ${initialData.frequency === 'monthly' ? 'selected' : ''}>${i18n.t('contracts.form.frequencies.monthly')}</option>
              <option value="quarterly" ${initialData.frequency === 'quarterly' ? 'selected' : ''}>${i18n.t('contracts.form.frequencies.quarterly')}</option>
              <option value="yearly" ${initialData.frequency === 'yearly' ? 'selected' : ''}>${i18n.t('contracts.form.frequencies.yearly')}</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field" style="flex: 1;">
            <label>${i18n.t('contracts.form.startDate')}<span class="required-asterisk">*</span></label>
            <input type="date" name="startDate" required min="${new Date().toISOString().split('T')[0]}" value="${initialData.startDate || ''}">
          </div>
          <div class="form-field" style="flex: 1;">
            <label>${i18n.t('contracts.form.generalEndDate')}</label>
            <input type="date" name="generalEndDate" min="${new Date().toISOString().split('T')[0]}" value="${initialData.generalEndDate || ''}">
          </div>
        </div>
      </div>

      <!-- Services Section -->
      <div class="form-section" id="services-section" style="display: none;">
        <div class="services-list"></div>
        <button type="button" class="btn-add-item" data-type="service" style="margin-top: 10px;">
          <i class="fas fa-plus"></i> ${i18n.t('contracts.form.addService')}
        </button>
      </div>

      <!-- Labors Section -->
      <div class="form-section" id="labors-section" style="display: none;">
        <div class="labors-list"></div>
        <button type="button" class="btn-add-item" data-type="labor" style="margin-top: 10px;">
          <i class="fas fa-plus"></i> ${i18n.t('contracts.form.addLabor')}
        </button>
      </div>

      <!-- Parts Section -->
      <div class="form-section" id="parts-section" style="display: none;">
        <div class="parts-list"></div>
        <button type="button" class="btn-add-item" data-type="part" style="margin-top: 10px;">
          <i class="fas fa-plus"></i> ${i18n.t('contracts.form.addPart')}
        </button>
      </div>

      <style>
        .form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
        }
        
        .form-sections-nav {
          display: flex;
          margin: 20px 0;
          gap: 0;
          background: #f8f9fa;
          padding: 4px;
          border-radius: 8px;
        }
        
        .section-btn {
          background: none;
          border: none;
          color: #666;
          padding: 12px 20px;
          border-radius: 6px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }
        
        .section-btn i {
          font-size: 1.1em;
        }
        
        .section-btn.active {
          color: #2ecc71;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .section-btn:hover:not(.active) {
          color: #2ecc71;
          background: white;
        }

        .btn-add-item {
          background: #2ecc71;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }
        
        .services-list,
        .labors-list,
        .parts-list {
          min-height: 100px;
          border: 1px dashed #ddd;
          border-radius: 4px;
          padding: 10px;
          margin-bottom: 10px;
        }
        
        .service-item,
        .labor-item,
        .part-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .service-item .btn-remove,
        .labor-item .btn-remove,
        .part-item .btn-remove {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          padding: 4px 8px;
          font-size: 18px;
        }
        
        .service-item .btn-remove:hover,
        .labor-item .btn-remove:hover,
        .part-item .btn-remove:hover {
          color: #c0392b;
        }
        
        .form-row .form-field {
          margin-bottom: 0;
        }
        
        .form-content {
          max-width: 800px;
        }

        .date-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.9em;
          cursor: pointer;
        }
      </style>
    </div>
    <div class="form-actions">
      <button type="button" class="btn-cancel">${i18n.t('common.cancel')}</button>
      <button type="submit" class="btn-save">${i18n.t('common.save')}</button>
    </div>
  `;

  // Add event listeners
  form.querySelector('.btn-cancel').addEventListener('click', onCancel);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      ...Object.fromEntries(formData.entries()),
      services: Array.from(document.querySelectorAll('.service-item')).map(item => ({
        code: item.dataset.code,
        name: item.dataset.name
      })),
      labors: Array.from(document.querySelectorAll('.labor-item')).map(item => ({
        code: item.dataset.code,
        name: item.dataset.name
      })),
      parts: Array.from(document.querySelectorAll('.part-item')).map(item => ({
        code: item.dataset.code,
        name: item.dataset.name
      }))
    };
    onSave(data);
  });

  // Section toggle handlers
  const sectionBtns = form.querySelectorAll('.section-btn');
  sectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      
      // Toggle active state of buttons
      sectionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show selected section, hide others
      form.querySelectorAll('.form-section').forEach(section => {
        section.style.display = section.id === `${sectionId}-section` ? 'block' : 'none';
      });
    });
  });

  // Services section handlers
  const addServiceBtn = form.querySelector('[data-type="service"]');
  const servicesList = form.querySelector('.services-list');
  const addLaborBtn = form.querySelector('[data-type="labor"]');
  const laborsList = form.querySelector('.labors-list');
  const addPartBtn = form.querySelector('[data-type="part"]');
  const partsList = form.querySelector('.parts-list');
  
  // Initialize services if editing
  if (initialData.services) {
    initialData.services.forEach(service => {
      const serviceItem = document.createElement('div');
      serviceItem.className = 'service-item';
      serviceItem.dataset.code = service.code;
      serviceItem.dataset.name = service.name;
      serviceItem.innerHTML = `
        <span>${service.name}</span>
        <button type="button" class="btn-remove">×</button>
      `;
      
      servicesList.appendChild(serviceItem);
      
      // Add remove handler
      serviceItem.querySelector('.btn-remove').addEventListener('click', () => {
        serviceItem.remove();
      });
    });
  }
  
  // Initialize labors if editing
  if (initialData.labors) {
    initialData.labors.forEach(labor => {
      const laborItem = document.createElement('div');
      laborItem.className = 'labor-item';
      laborItem.dataset.code = labor.code;
      laborItem.dataset.name = labor.name;
      laborItem.innerHTML = `
        <span>${labor.name}</span>
        <button type="button" class="btn-remove">×</button>
      `;
      
      laborsList.appendChild(laborItem);
      
      laborItem.querySelector('.btn-remove').addEventListener('click', () => {
        laborItem.remove();
      });
    });
  }

  // Initialize parts if editing
  if (initialData.parts) {
    initialData.parts.forEach(part => {
      const partItem = document.createElement('div');
      partItem.className = 'part-item';
      partItem.dataset.code = part.code;
      partItem.dataset.name = part.name;
      partItem.innerHTML = `
        <span>${part.name}</span>
        <button type="button" class="btn-remove">×</button>
      `;
      
      partsList.appendChild(partItem);
      
      partItem.querySelector('.btn-remove').addEventListener('click', () => {
        partItem.remove();
      });
    });
  }

  function showSelectionModal(type, container) {
    const items = JSON.parse(localStorage.getItem(`${type}s`) || '[]');
    const title = i18n.t(`contracts.form.select${type.charAt(0).toUpperCase() + type.slice(1)}s`);

    // Create and show services modal
    const modal = document.createElement('div');
    modal.className = 'selection-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>${title}</h3>
        <div class="items-grid">
          ${items.map(item => `
            <div class="item-option" data-code="${item.data[0]}" data-name="${item.data[1]}">
              <span>${item.data[1]}</span>
              <small>${item.data[2]}</small>
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn-close">${i18n.t('common.close')}</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
      .selection-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
      }
      
      .items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
        margin: 20px 0;
      }
      
      .item-option {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .item-option:hover {
        border-color: #2ecc71;
        background: #f8f9fa;
      }
      
      .item-option span {
        display: block;
        font-weight: 500;
      }
      
      .item-option small {
        color: #666;
      }
    `;
    document.head.appendChild(style);
    
    // Handle item selection
    modal.querySelectorAll('.item-option').forEach(option => {
      option.addEventListener('click', () => {
        const code = option.dataset.code;
        const name = option.dataset.name;
        
        // Check if item is already added
        if (!container.querySelector(`[data-code="${code}"]`)) {
          const item = document.createElement('div');
          item.className = `${type}-item`;
          item.dataset.code = code;
          item.dataset.name = name;
          item.innerHTML = `
            <span>${name}</span>
            <button type="button" class="btn-remove">×</button>
          `;
          
          container.appendChild(item);
          
          // Add remove handler
          item.querySelector('.btn-remove').addEventListener('click', () => {
            item.remove();
          });
        }
        
        // Close modal
        modal.remove();
      });
    });
    
    // Close modal handler
    modal.querySelector('.btn-close').addEventListener('click', () => {
      modal.remove();
    });
  }

  addServiceBtn.addEventListener('click', () => showSelectionModal('service', servicesList));
  addLaborBtn.addEventListener('click', () => showSelectionModal('labor', laborsList));
  addPartBtn.addEventListener('click', () => showSelectionModal('part', partsList));

  return form;
}
