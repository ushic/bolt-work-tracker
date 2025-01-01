import i18n from '../../i18n';

export function createFormsSection(container, initialForms = []) {
  // Get forms from localStorage
  const forms = JSON.parse(localStorage.getItem('forms') || '[]')
    .map(form => ({
      code: form.data[0],
      name: form.data[1]
    }));

  const section = document.createElement('div');
  section.className = 'form-section forms-section';
  section.innerHTML = `
    <h3>${i18n.t('common.forms')}</h3>
    <div class="selected-forms">
      ${initialForms.map(formCode => {
        const form = forms.find(f => f.code === formCode);
        return form ? `
          <div class="selected-form" data-code="${form.code}">
            <span class="form-name">${form.name}</span>
            <button type="button" class="btn-remove">×</button>
          </div>
        ` : '';
      }).join('')}
    </div>
    <div class="form-selection">
      <select id="form-select" style="flex-grow: 1;">
        <option value="">${i18n.t('common.selectForm')}</option>
        ${forms.map(form => `
          <option value="${form.code}">${form.name}</option>
        `).join('')}
      </select>
      <button type="button" class="btn-add-form">+</button>
    </div>
  `;

  // Add event listeners
  const addFormButton = section.querySelector('.btn-add-form');
  const formSelect = section.querySelector('#form-select');
  const selectedForms = section.querySelector('.selected-forms');

  addFormButton.addEventListener('click', () => {
    const selectedCode = formSelect.value;
    if (!selectedCode) return;

    const form = forms.find(f => f.code === selectedCode);
    if (!form) return;

    // Check if form is already selected
    if (section.querySelector(`.selected-form[data-code="${selectedCode}"]`)) {
      return;
    }

    const formElement = document.createElement('div');
    formElement.className = 'selected-form';
    formElement.dataset.code = form.code;
    formElement.innerHTML = `
      <span class="form-name">${form.name}</span>
      <button type="button" class="btn-remove">×</button>
    `;

    selectedForms.appendChild(formElement);
    formSelect.value = '';
  });

  // Handle remove button clicks
  section.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
      e.target.closest('.selected-form').remove();
    }
  });

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .forms-section {
      margin-top: 20px;
    }
    
    .selected-forms {
      margin: 10px 0;
    }
    
    .selected-form {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      padding: 8px;
      margin: 5px 0;
      border-radius: 4px;
    }
    
    .form-name {
      flex: 1;
    }
    
    .form-selection {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    .btn-add-form {
      background: #2ecc71;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  return section;
}
