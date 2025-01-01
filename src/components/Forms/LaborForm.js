import i18n from '../../i18n';

export function createLaborForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base labor-form';
  
  const formFields = [
    { label: `${i18n.t('labors.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true, readonly: true },
    { label: `${i18n.t('labors.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: `${i18n.t('labors.form.category')}<span class="required-asterisk">*</span>`, name: 'category', type: 'select', options: [
      { value: 'technician', label: i18n.t('labors.form.categories.technician') },
      { value: 'engineer', label: i18n.t('labors.form.categories.engineer') },
      { value: 'specialist', label: i18n.t('labors.form.categories.specialist') },
      { value: 'helper', label: i18n.t('labors.form.categories.helper') }
    ], required: true },
    { label: i18n.t('labors.form.active'), name: 'active', type: 'checkbox' }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('labors.form.titleEdit') : i18n.t('labors.form.title')}</h2>
    </div>
    <div class="form-content">
      ${formFields.map(field => {
        if (field.type === 'select') {
          return `
            <div class="form-field">
              <label for="${field.name}">${field.label}</label>
              <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                <option value="">${i18n.t('labors.form.selectCategory')}</option>
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
      category: formData.get('category'),
      active: formData.has('active')
    };
    onSave(data);
  });

  return form;
}