import i18n from '../../i18n';

export function createLaborForm(onSubmit, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base';

  // Form Header
  const header = document.createElement('div');
  header.className = 'form-header';
  header.innerHTML = `<h2>${initialData.code ? i18n.t('labors.form.titleEdit') : i18n.t('labors.form.title')}</h2>`;
  form.appendChild(header);

  // Basic Info Row
  const basicRow = document.createElement('div');
  basicRow.className = 'form-row';

  // Code
  const codeField = document.createElement('div');
  codeField.className = 'form-field';
  codeField.innerHTML = `
    <label>${i18n.t('labors.form.code')}</label>
    <input type="text" id="code" value="${initialData.code || ''}" ${initialData.code ? 'readonly' : 'required'}>
  `;
  basicRow.appendChild(codeField);

  // Name
  const nameField = document.createElement('div');
  nameField.className = 'form-field';
  nameField.innerHTML = `
    <label>${i18n.t('labors.form.name')}</label>
    <input type="text" id="name" value="${initialData.name || ''}" required>
  `;
  basicRow.appendChild(nameField);

  form.appendChild(basicRow);

  // Category Field
  const categoryField = document.createElement('div');
  categoryField.className = 'form-field';
  categoryField.innerHTML = `
    <label>${i18n.t('labors.form.category')}</label>
    <select id="category">
      ${Object.entries(i18n.t('labors.form.categories', { returnObjects: true }))
        .map(([key, value]) => `
          <option value="${key}" ${initialData.category === key ? 'selected' : ''}>
            ${value}
          </option>
        `).join('')}
    </select>
  `;
  form.appendChild(categoryField);

  // Active Field
  const activeField = document.createElement('div');
  activeField.className = 'form-field';
  activeField.innerHTML = `
    <label>
      <input type="checkbox" id="active" ${initialData.active ? 'checked' : ''}>
      ${i18n.t('labors.form.active')}
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
      category: form.querySelector('#category').value,
      active: form.querySelector('#active').checked
    };
    onSubmit(formData);
  });

  actions.querySelector('.btn-cancel').addEventListener('click', onCancel);

  return form;
}
