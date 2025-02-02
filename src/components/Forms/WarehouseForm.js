import i18n from '../../i18n';

export function createWarehouseForm(onSubmit, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base';

  // Form Header
  const header = document.createElement('div');
  header.className = 'form-header';
  header.innerHTML = `<h2>${i18n.t('warehouses.form.title')}</h2>`;
  form.appendChild(header);

  // Description Field
  const descriptionField = document.createElement('div');
  descriptionField.className = 'form-field';
  descriptionField.innerHTML = `
    <label>${i18n.t('warehouses.form.description')}</label>
    <textarea id="description">${initialData.description || ''}</textarea>
  `;
  form.appendChild(descriptionField);

  // Name and Code Row
  const nameCodeRow = document.createElement('div');
  nameCodeRow.className = 'form-row';

  // Name Field
  const nameField = document.createElement('div');
  nameField.className = 'form-field';
  nameField.innerHTML = `
    <label>${i18n.t('warehouses.form.name')}</label>
    <input type="text" id="name" value="${initialData.name || ''}" required>
  `;
  nameCodeRow.appendChild(nameField);

  // Code Field
  const codeField = document.createElement('div');
  codeField.className = 'form-field';
  codeField.innerHTML = `
    <label>${i18n.t('warehouses.form.code')}</label>
    <input type="text" id="code" value="${initialData.code || ''}" required>
  `;
  nameCodeRow.appendChild(codeField);

  form.appendChild(nameCodeRow);

  // Type and Organization Row
  const typeOrgRow = document.createElement('div');
  typeOrgRow.className = 'form-row';

  // Type Field
  const typeField = document.createElement('div');
  typeField.className = 'form-field';
  typeField.innerHTML = `
    <label>${i18n.t('warehouses.form.type')}</label>
    <select id="type">
      ${Object.entries(i18n.t('warehouses.form.types', { returnObjects: true }))
        .map(([key, value]) => `
          <option value="${key}" ${initialData.type === key ? 'selected' : ''}>
            ${value}
          </option>
        `).join('')}
    </select>
  `;
  typeOrgRow.appendChild(typeField);

  // Organization Field
  const orgField = document.createElement('div');
  orgField.className = 'form-field';
  orgField.innerHTML = `
    <label>${i18n.t('warehouses.form.organization')}</label>
    <input type="text" id="organization" value="${initialData.organization || ''}">
  `;
  typeOrgRow.appendChild(orgField);

  form.appendChild(typeOrgRow);

  // Active Status Field
  const activeField = document.createElement('div');
  activeField.className = 'form-field';
  activeField.innerHTML = `
    <label>
      <input type="checkbox" id="active" ${initialData.active ? 'checked' : ''}>
      ${i18n.t('warehouses.form.active')}
    </label>
  `;
  form.appendChild(activeField);

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
      organization: form.querySelector('#organization').value,
      description: form.querySelector('#description').value,
      active: form.querySelector('#active').checked
    };
    onSubmit(formData);
  });

  actions.querySelector('.btn-cancel').addEventListener('click', onCancel);

  return form;
}
