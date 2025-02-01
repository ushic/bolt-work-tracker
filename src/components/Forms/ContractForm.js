import i18n from '../../i18n';

export function createContractForm(onSubmit, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base';

  // Form Header
  const header = document.createElement('div');
  header.className = 'form-header';
  header.innerHTML = `<h2>${initialData.code ? i18n.t('contracts.form.titleEdit') : i18n.t('contracts.form.title')}</h2>`;
  form.appendChild(header);

  // Basic Info Row
  const basicRow = document.createElement('div');
  basicRow.className = 'form-row';

  // Code
  const codeField = document.createElement('div');
  codeField.className = 'form-field';
  codeField.innerHTML = `
    <label>${i18n.t('contracts.form.code')}</label>
    <input type="text" id="code" value="${initialData.code || ''}" ${initialData.code ? 'readonly' : 'required'}>
  `;
  basicRow.appendChild(codeField);

  // Name
  const nameField = document.createElement('div');
  nameField.className = 'form-field';
  nameField.innerHTML = `
    <label>${i18n.t('contracts.form.name')}</label>
    <input type="text" id="name" value="${initialData.name || ''}" required>
  `;
  basicRow.appendChild(nameField);

  form.appendChild(basicRow);

  // Contract Details Row
  const detailsRow = document.createElement('div');
  detailsRow.className = 'form-row';

  // Contract Number
  const contractNumberField = document.createElement('div');
  contractNumberField.className = 'form-field';
  contractNumberField.innerHTML = `
    <label>${i18n.t('contracts.form.contractNumber')}</label>
    <input type="text" id="contractNumber" value="${initialData.contractNumber || ''}">
  `;
  detailsRow.appendChild(contractNumberField);

  // Type
  const typeField = document.createElement('div');
  typeField.className = 'form-field';
  typeField.innerHTML = `
    <label>${i18n.t('contracts.form.type')}</label>
    <select id="type">
      ${Object.entries(i18n.t('contracts.form.types', { returnObjects: true }))
        .map(([key, value]) => `
          <option value="${key}" ${initialData.type === key ? 'selected' : ''}>
            ${value}
          </option>
        `).join('')}
    </select>
  `;
  detailsRow.appendChild(typeField);

  form.appendChild(detailsRow);

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
      contractNumber: form.querySelector('#contractNumber').value,
      type: form.querySelector('#type').value
    };
    onSubmit(formData);
  });

  actions.querySelector('.btn-cancel').addEventListener('click', onCancel);

  return form;
}
