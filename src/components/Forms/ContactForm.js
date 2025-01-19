import i18n from '../../i18n';

export function createContactForm(onSubmit, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base';

  // Form Header
  const header = document.createElement('div');
  header.className = 'form-header';
  header.innerHTML = `<h2>${initialData.code ? i18n.t('contacts.form.titleEdit') : i18n.t('contacts.form.title')}</h2>`;
  form.appendChild(header);

  // Name Row
  const nameRow = document.createElement('div');
  nameRow.className = 'form-row';

  // First Name
  const firstNameField = document.createElement('div');
  firstNameField.className = 'form-field';
  firstNameField.innerHTML = `
    <label>${i18n.t('contacts.form.firstName')}</label>
    <input type="text" id="firstName" value="${initialData.firstName || ''}" required>
  `;
  nameRow.appendChild(firstNameField);

  // Last Name
  const lastNameField = document.createElement('div');
  lastNameField.className = 'form-field';
  lastNameField.innerHTML = `
    <label>${i18n.t('contacts.form.lastName')}</label>
    <input type="text" id="lastName" value="${initialData.lastName || ''}" required>
  `;
  nameRow.appendChild(lastNameField);

  form.appendChild(nameRow);

  // Contact Info Row
  const contactRow = document.createElement('div');
  contactRow.className = 'form-row';

  // Email
  const emailField = document.createElement('div');
  emailField.className = 'form-field';
  emailField.innerHTML = `
    <label>${i18n.t('contacts.form.email')}</label>
    <input type="email" id="email" value="${initialData.email || ''}">
  `;
  contactRow.appendChild(emailField);

  // Phone
  const phoneField = document.createElement('div');
  phoneField.className = 'form-field';
  phoneField.innerHTML = `
    <label>${i18n.t('contacts.form.phone')}</label>
    <input type="tel" id="phone" value="${initialData.phone || ''}">
  `;
  contactRow.appendChild(phoneField);

  form.appendChild(contactRow);

  // Company Info Row
  const companyRow = document.createElement('div');
  companyRow.className = 'form-row';

  // Company
  const companyField = document.createElement('div');
  companyField.className = 'form-field';
  companyField.innerHTML = `
    <label>${i18n.t('contacts.form.company')}</label>
    <input type="text" id="company" value="${initialData.company || ''}">
  `;
  companyRow.appendChild(companyField);

  // Job Title
  const jobTitleField = document.createElement('div');
  jobTitleField.className = 'form-field';
  jobTitleField.innerHTML = `
    <label>${i18n.t('contacts.form.jobTitle')}</label>
    <input type="text" id="jobTitle" value="${initialData.jobTitle || ''}">
  `;
  companyRow.appendChild(jobTitleField);

  form.appendChild(companyRow);

  // Form Actions
  const actions = document.createElement('div');
  actions.className = 'form-actions';
  actions.innerHTML = `
    <button type="button" class="btn-cancel">${i18n.t('common.cancel')}</button>
    <button type="submit" class="btn-save">${i18n.t('common.save')}</button>
  `;
  form.appendChild(actions);

  // Event Listeners
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      firstName: form.querySelector('#firstName').value,
      lastName: form.querySelector('#lastName').value,
      email: form.querySelector('#email').value,
      phone: form.querySelector('#phone').value,
      company: form.querySelector('#company').value,
      jobTitle: form.querySelector('#jobTitle').value
    };
    onSubmit(formData);
  });

  actions.querySelector('.btn-cancel').addEventListener('click', onCancel);

  return form;
}
