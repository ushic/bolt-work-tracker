import i18n from '../../i18n';

export function createCompanyForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base company-form';
  
  const formFields = [
    { label: `${i18n.t('companies.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true },
    { label: `${i18n.t('companies.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: i18n.t('companies.form.type'), name: 'type', type: 'select', options: [
      i18n.t('companies.form.types.corporation'),
      i18n.t('companies.form.types.llc'),
      i18n.t('companies.form.types.partnership'),
      i18n.t('companies.form.types.soleProprietorship'),
      i18n.t('companies.form.types.nonProfit'),
      i18n.t('companies.form.types.other')
    ]},
    { label: i18n.t('companies.form.active'), name: 'active', type: 'checkbox' }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('companies.form.titleEdit') : i18n.t('companies.form.title')}</h2>
    </div>
    <div class="form-content">
      <div class="form-section">
        <h3>${i18n.t('companies.form.title')}</h3>
        ${formFields.map(field => {
          if (field.type === 'select') {
            return `
              <div class="form-field">
                <label for="${field.name}">${field.label}</label>
                <select id="${field.name}" name="${field.name}">
                  <option value="">${i18n.t('companies.table.selectType')}</option>
                  ${field.options.map(option => `
                    <option value="${option}" ${initialData[field.name] === option ? 'selected' : ''}>
                      ${option}
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
                  ${field.required ? 'required' : ''}>
              </div>
            `;
          }
        }).join('')}
      </div>
    </div>
    <div class="form-actions">
      <button type="button" class="btn-cancel">${i18n.t('common.cancel')}</button>
      <button type="submit" class="btn-save">${initialData.code ? i18n.t('common.edit') : i18n.t('common.save')}</button>
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
      active: formData.has('active')
    };
    onSave(data);
  });

  return form;
}