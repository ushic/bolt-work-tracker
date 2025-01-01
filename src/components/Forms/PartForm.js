import i18n from '../../i18n';

export function createPartForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base part-form';
  
  const types = [
    { value: 'mechanical', label: i18n.t('parts.form.types.mechanical') },
    { value: 'electrical', label: i18n.t('parts.form.types.electrical') },
    { value: 'electronic', label: i18n.t('parts.form.types.electronic') },
    { value: 'hydraulic', label: i18n.t('parts.form.types.hydraulic') },
    { value: 'pneumatic', label: i18n.t('parts.form.types.pneumatic') }
  ];
  
  const categories = [
    { value: 'spare', label: i18n.t('parts.form.categories.spare') },
    { value: 'wear', label: i18n.t('parts.form.categories.wear') },
    { value: 'consumable', label: i18n.t('parts.form.categories.consumable') },
    { value: 'assembly', label: i18n.t('parts.form.categories.assembly') }
  ];
  
  const formFields = [
    { label: `${i18n.t('parts.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true, readonly: true },
    { label: `${i18n.t('parts.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: `${i18n.t('parts.form.type')}<span class="required-asterisk">*</span>`, name: 'type', type: 'select', options: types, required: true },
    { label: `${i18n.t('parts.form.category')}<span class="required-asterisk">*</span>`, name: 'category', type: 'select', options: categories, required: true },
    { label: i18n.t('parts.form.warranty'), name: 'warranty', type: 'number', min: 0 },
    { label: i18n.t('parts.form.active'), name: 'active', type: 'checkbox' }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('parts.form.titleEdit') : i18n.t('parts.form.title')}</h2>
    </div>
    <div class="form-content">
      ${formFields.map(field => {
        if (field.type === 'select') {
          return `
            <div class="form-field">
              <label for="${field.name}">${field.label}</label>
              <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                <option value="">${i18n.t('parts.form.selectOption')}</option>
                ${field.options.map(option => `
                  <option value="${option.value}" ${initialData[field.name] === option.value ? 'selected' : ''}>
                    ${option.label}
                  </option>
                `).join('')}
              </select>
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
                ${field.readonly ? 'readonly' : ''}
                ${field.min !== undefined ? `min="${field.min}"` : ''}>
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
      category: formData.get('category'),
      warranty: formData.get('warranty'),
      active: formData.has('active')
    };
    onSave(data);
  });

  return form;
}