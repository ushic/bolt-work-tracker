import i18n from '../../i18n';

export function createContactForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base contact-form';
  
  const formFields = [
    { label: `${i18n.t('contacts.form.firstName')}<span class="required-asterisk">*</span>`, name: 'firstName', type: 'text', required: true },
    { label: `${i18n.t('contacts.form.lastName')}<span class="required-asterisk">*</span>`, name: 'lastName', type: 'text', required: true },
    { label: i18n.t('contacts.form.email'), name: 'email', type: 'email' },
    { label: i18n.t('contacts.form.phone'), name: 'phone', type: 'tel' },
    { label: i18n.t('contacts.form.company'), name: 'company', type: 'text' },
    { label: i18n.t('contacts.form.jobTitle'), name: 'jobTitle', type: 'text' }
  ];

  const addressFields = [
    { label: i18n.t('contacts.form.street'), name: 'street', type: 'text' },
    { label: i18n.t('contacts.form.city'), name: 'city', type: 'text' },
    { label: i18n.t('contacts.form.state'), name: 'state', type: 'text' },
    { label: i18n.t('contacts.form.postalCode'), name: 'postalCode', type: 'text' },
    { label: i18n.t('contacts.form.country'), name: 'country', type: 'text' }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.firstName ? i18n.t('contacts.form.titleEdit') : i18n.t('contacts.form.title')}</h2>
    </div>
    <div class="form-content">
      <div class="form-section">
        <h3>${i18n.t('contacts.form.title')}</h3>
        ${formFields.map(field => `
          <div class="form-field">
            <label for="${field.name}">${field.label}</label>
            <input type="${field.type}" id="${field.name}" name="${field.name}" 
              value="${initialData[field.name] || ''}"
              ${field.required ? 'required' : ''}>
          </div>
        `).join('')}
      </div>
      
      <div class="form-section">
        <h3>${i18n.t('contacts.form.address')}</h3>
        ${addressFields.map(field => `
          <div class="form-field">
            <label for="${field.name}">${field.label}</label>
            <input type="${field.type}" id="${field.name}" name="${field.name}"
              value="${initialData[field.name] || ''}">
          </div>
        `).join('')}
      </div>
    </div>
    <div class="form-actions">
      <button type="button" class="btn-cancel">${i18n.t('common.cancel')}</button>
      <button type="submit" class="btn-save">${initialData.firstName ? i18n.t('common.edit') : i18n.t('common.save')}</button>
    </div>
  `;

  // Add event listeners
  form.querySelector('.btn-cancel').addEventListener('click', onCancel);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    onSave(data);
  });

  return form;
}