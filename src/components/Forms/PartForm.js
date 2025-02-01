import i18n from '../../i18n';

export function createPartForm(onSubmit, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base';

  // Form Header
  const header = document.createElement('div');
  header.className = 'form-header';
  header.innerHTML = `<h2>${initialData.code ? i18n.t('parts.form.titleEdit') : i18n.t('parts.form.title')}</h2>`;
  form.appendChild(header);

  // Basic Info Row
  const basicRow = document.createElement('div');
  basicRow.className = 'form-row';

  // Code
  const codeField = document.createElement('div');
  codeField.className = 'form-field';
  codeField.innerHTML = `
    <label>${i18n.t('parts.form.code')}</label>
    <input type="text" id="code" value="${initialData.code || ''}" ${initialData.code ? 'readonly' : 'required'}>
  `;
  basicRow.appendChild(codeField);

  // Name
  const nameField = document.createElement('div');
  nameField.className = 'form-field';
  nameField.innerHTML = `
    <label>${i18n.t('parts.form.name')}</label>
    <input type="text" id="name" value="${initialData.name || ''}" required>
  `;
  basicRow.appendChild(nameField);

  form.appendChild(basicRow);

  // Type and Category Row
  const typeCatRow = document.createElement('div');
  typeCatRow.className = 'form-row';

  // Type
  const typeField = document.createElement('div');
  typeField.className = 'form-field';
  typeField.innerHTML = `
    <label>${i18n.t('parts.form.type')}</label>
    <select id="type">
      ${Object.entries(i18n.t('parts.form.types', { returnObjects: true }))
        .map(([key, value]) => `
          <option value="${key}" ${initialData.type === key ? 'selected' : ''}>
            ${value}
          </option>
        `).join('')}
    </select>
  `;
  typeCatRow.appendChild(typeField);

  // Category
  const categoryField = document.createElement('div');
  categoryField.className = 'form-field';
  categoryField.innerHTML = `
    <label>${i18n.t('parts.form.category')}</label>
    <select id="category">
      ${Object.entries(i18n.t('parts.form.categories', { returnObjects: true }))
        .map(([key, value]) => `
          <option value="${key}" ${initialData.category === key ? 'selected' : ''}>
            ${value}
          </option>
        `).join('')}
    </select>
  `;
  typeCatRow.appendChild(categoryField);

  form.appendChild(typeCatRow);

  // Warranty Field
  const warrantyField = document.createElement('div');
  warrantyField.className = 'form-field';
  warrantyField.innerHTML = `
    <label>${i18n.t('parts.form.warranty')}</label>
    <input type="number" id="warranty" value="${initialData.warranty || 0}">
  `;
  form.appendChild(warrantyField);

  // Active Field
  const activeField = document.createElement('div');
  activeField.className = 'form-field';
  activeField.innerHTML = `
    <label>
      <input type="checkbox" id="active" ${initialData.active ? 'checked' : ''}>
      ${i18n.t('parts.form.active')}
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
      category: form.querySelector('#category').value,
      warranty: form.querySelector('#warranty').value,
      active: form.querySelector('#active').checked
    };
    onSubmit(formData);
  });

  actions.querySelector('.btn-cancel').addEventListener('click', onCancel);

  return form;
}
