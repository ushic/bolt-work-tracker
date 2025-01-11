import i18n from '../../i18n';

export function createWarehouseForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base warehouse-form';
  
  const types = [
    { value: 'main', label: i18n.t('warehouses.form.types.main') },
    { value: 'regional', label: i18n.t('warehouses.form.types.regional') },
    { value: 'local', label: i18n.t('warehouses.form.types.local') }
  ];
  
  const statuses = [
    { value: 'active', label: i18n.t('warehouses.form.statuses.active') },
    { value: 'inactive', label: i18n.t('warehouses.form.statuses.inactive') }
  ];
  
  const formFields = [
    { label: `${i18n.t('warehouses.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true, readonly: true },
    { label: `${i18n.t('warehouses.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: `${i18n.t('warehouses.form.type')}<span class="required-asterisk">*</span>`, name: 'type', type: 'select', options: types, required: true },
    { label: i18n.t('warehouses.form.organization'), name: 'organization', type: 'text' },
    { label: `${i18n.t('warehouses.form.status')}<span class="required-asterisk">*</span>`, name: 'status', type: 'select', options: statuses, required: true },
    { label: i18n.t('warehouses.form.description'), name: 'description', type: 'textarea' }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('warehouses.form.titleEdit') : i18n.t('warehouses.form.title')}</h2>
    </div>
    <div class="form-content">
      ${formFields.map(field => {
        if (field.type === 'select') {
          return `
            <div class="form-field">
              <label for="${field.name}">${field.label}</label>
              <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                <option value="">${i18n.t('warehouses.form.selectOption')}</option>
                ${field.options.map(option => `
                  <option value="${option.value}" ${initialData[field.name] === option.value ? 'selected' : ''}>
                    ${option.label}
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
      code: formData.get('code'),
      name: formData.get('name'),
      type: formData.get('type'),
      organization: formData.get('organization'),
      status: formData.get('status'),
      description: formData.get('description')
    };
    onSave(data);
  });

  return form;
}
