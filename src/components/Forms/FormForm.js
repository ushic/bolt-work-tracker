import i18n from '../../i18n';

export function createFormForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base catalog-form';
  
  const formFields = [
    { label: `${i18n.t('forms.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true, readonly: true },
    { label: `${i18n.t('forms.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: i18n.t('forms.form.description'), name: 'description', type: 'textarea' },
    { label: i18n.t('forms.form.active'), name: 'active', type: 'checkbox' }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('forms.form.titleEdit') : i18n.t('forms.form.title')}</h2>
    </div>
    <div class="form-content">
      ${formFields.map(field => {
        if (field.type === 'textarea') {
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
      description: formData.get('description'),
      active: formData.has('active')
    };
    onSave(data);
  });

  return form;
}
