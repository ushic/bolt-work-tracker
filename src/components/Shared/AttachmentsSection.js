import i18n from '../../i18n';

export function createAttachmentsSection(container, initialAttachments = []) {
  const template = `
    <div class="form-section attachments-section">
      <h3>${i18n.t('common.attachments')}</h3>
      <div class="attachments-list">
        ${initialAttachments.map(attachment => `
          <div class="attachment-item" data-file="${attachment.file}">
            <span class="attachment-name">${attachment.name}</span>
            <button type="button" class="btn-remove">×</button>
          </div>
        `).join('')}
      </div>
      <div class="attachment-actions">
        <input type="file" id="file-input" multiple style="display: none">
        <button type="button" class="btn-attach">
          <i class="fas fa-paperclip"></i> ${i18n.t('common.attach')}
        </button>
      </div>
    </div>
  `;

  // Create a temporary div to hold the template
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  const section = tempDiv.firstElementChild;
  
  // Add event listeners
  const fileInput = section.querySelector('#file-input');
  const attachButton = section.querySelector('.btn-attach');
  
  attachButton.addEventListener('click', () => {
    fileInput.click();
  });
  
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    const attachmentsList = section.querySelector('.attachments-list');
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const attachmentItem = document.createElement('div');
        attachmentItem.className = 'attachment-item';
        attachmentItem.dataset.file = event.target.result;
        attachmentItem.innerHTML = `
          <span class="attachment-name">${file.name}</span>
          <button type="button" class="btn-remove">×</button>
        `;
        attachmentsList.appendChild(attachmentItem);
      };
      reader.readAsDataURL(file);
    });
    
    // Clear input
    fileInput.value = '';
  });
  
  // Handle remove button clicks
  section.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
      e.target.closest('.attachment-item').remove();
    }
  });
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .attachments-section {
      margin-top: 20px;
    }
    
    .attachments-list {
      margin: 10px 0;
    }
    
    .attachment-item {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      padding: 8px;
      margin: 5px 0;
      border-radius: 4px;
    }
    
    .attachment-name {
      flex: 1;
    }
    
    .btn-attach {
      background: #3498db;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-attach i {
      margin-right: 5px;
    }
  `;
  document.head.appendChild(style);

  return section;
}
