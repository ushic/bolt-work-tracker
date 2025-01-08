import i18n from '../../i18n';
import { createAttachmentsSection } from '../Shared/AttachmentsSection';
import { createFormsSection } from '../Shared/FormsSection';

export function createServiceForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base service-form';
  
  const categories = [
    { value: 'maintenance', label: i18n.t('services.form.categories.maintenance') },
    { value: 'repair', label: i18n.t('services.form.categories.repair') },
    { value: 'installation', label: i18n.t('services.form.categories.installation') },
    { value: 'inspection', label: i18n.t('services.form.categories.inspection') },
    { value: 'consulting', label: i18n.t('services.form.categories.consulting') }
  ];
  
  const formFields = [
    { label: `${i18n.t('services.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true, readonly: true },
    { label: `${i18n.t('services.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: `${i18n.t('services.form.category')}<span class="required-asterisk">*</span>`, name: 'category', type: 'select', options: categories, required: true },
    { label: i18n.t('services.form.description'), name: 'description', type: 'textarea' },
    { label: i18n.t('services.form.active'), name: 'active', type: 'checkbox' }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('services.form.titleEdit') : i18n.t('services.form.title')}</h2>
    </div>
    <div class="form-content">
      ${formFields.map(field => {
        if (field.type === 'select') {
          return `
            <div class="form-field">
              <label for="${field.name}">${field.label}</label>
              <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                <option value="" ${field.required ? 'disabled' : ''}>${i18n.t('services.form.selectCategory')}</option>
                ${field.options.map(option => `
                  <option value="${option.value}" ${initialData[field.name] === option.value ? 'selected' : ''}>
                    ${option.label}
                  </option>
                `).join('')}
              </select>
            </div>
          `;
        } else if (field.type === 'textarea') {
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
      
      <!-- Attachments Section -->
      <div id="attachments-container"></div>
      
      <!-- Forms Section -->
      <div id="forms-container"></div>
      
    </div>
    <div class="form-actions">
      <button type="button" class="btn-cancel">${i18n.t('common.cancel')}</button>
      <button type="submit" class="btn-save">${i18n.t('common.save')}</button>
    </div>
  `;

  // Add attachments section
  const attachmentsContainer = form.querySelector('#attachments-container');
  attachmentsContainer.appendChild(createAttachmentsSection(form, initialData.attachments));
  
  // Add forms section
  const formsContainer = form.querySelector('#forms-container');
  formsContainer.appendChild(createFormsSection(form, initialData.forms));

  // Add event listeners
  form.querySelector('.btn-cancel').addEventListener('click', onCancel);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    // Get selected forms
    const selectedForms = Array.from(document.querySelectorAll('.selected-form'))
      .map(el => el.dataset.code);
    
    // Get file attachments
    const attachments = Array.from(document.querySelectorAll('.attachment-item'))
      .map(el => ({
        name: el.querySelector('.attachment-name').textContent,
        file: el.dataset.file
      }));
    
    const data = {
      code: formData.get('code'),
      name: formData.get('name'),
      category: formData.get('category'),
      description: formData.get('description'),
      active: formData.has('active'),
      forms: selectedForms,
      attachments: attachments
    };
    onSave(data);
  });

  return form;
}
