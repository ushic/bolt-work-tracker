import i18n from '../../i18n';

export function createCompanyForm(onSubmit, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base';

  // Form Header
  const header = document.createElement('div');
  header.className = 'form-header';
  header.innerHTML = `<h2>${initialData.code ? i18n.t('companies.form.titleEdit') : i18n.t('companies.form.title')}</h2>`;
  form.appendChild(header);

  // Name and Code Row
  const nameCodeRow = document.createElement('div');
  nameCodeRow.className = 'form-row';

  // Name Field
  const nameField = document.createElement('div');
  nameField.className = 'form-field';
  nameField.innerHTML = `
    <label>${i18n.t('companies.form.name')}</label>
    <input type="text" id="name" value="${initialData.name || ''}" required>
  `;
  nameCodeRow.appendChild(nameField);

  // Code Field
  const codeField = document.createElement('div');
  codeField.className = 'form-field';
  codeField.innerHTML = `
    <label>${i18n.t('companies.form.code')}</label>
    <input type="text" id="code" value="${initialData.code || ''}" ${initialData.code ? 'readonly' : 'required'}>
  `;
  nameCodeRow.appendChild(codeField);

  form.appendChild(nameCodeRow);

  // Type and Active Row
  const typeActiveRow = document.createElement('div');
  typeActiveRow.className = 'form-row';

  // Type Field
  const typeField = document.createElement('div');
  typeField.className = 'form-field';
  typeField.innerHTML = `
    <label>${i18n.t('companies.form.type')}</label>
    <select id="type">
      ${Object.entries(i18n.t('companies.form.types', { returnObjects: true }))
        .map(([key, value]) => `
          <option value="${key}" ${initialData.type === key ? 'selected' : ''}>
            ${value}
          </option>
        `).join('')}
    </select>
  `;
  typeActiveRow.appendChild(typeField);

  // Active Field
  const activeField = document.createElement('div');
  activeField.className = 'form-field';
  activeField.innerHTML = `
    <label>
      <input type="checkbox" id="active" ${initialData.active ? 'checked' : ''}>
      ${i18n.t('companies.form.active')}
    </label>
  `;
  typeActiveRow.appendChild(activeField);

  form.appendChild(typeActiveRow);

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
      code: form.querySelector('#code').value,
      name: form.querySelector('#name').value,
      type: form.querySelector('#type').value,
      active: form.querySelector('#active').checked
    };
    onSubmit(formData);
  });

  actions.querySelector('.btn-cancel').addEventListener('click', onCancel);

  return form;
}
