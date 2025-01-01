import i18n from '../../i18n';

export function createLocationForm(onSave, onCancel, initialData = {}) {
  const form = document.createElement('form');
  form.className = 'form-base location-form';
  
  const formFields = [
    { label: `${i18n.t('locations.form.code')}<span class="required-asterisk">*</span>`, name: 'code', type: 'text', required: true, readonly: true },
    { label: `${i18n.t('locations.form.name')}<span class="required-asterisk">*</span>`, name: 'name', type: 'text', required: true },
    { label: i18n.t('locations.form.description'), name: 'description', type: 'textarea' },
    { label: i18n.t('locations.form.parentAsset'), name: 'parentAsset', type: 'select', options: JSON.parse(localStorage.getItem('assets') || '[]') },
    { label: `${i18n.t('locations.form.category')}<span class="required-asterisk">*</span>`, name: 'category', type: 'select', options: [
      { value: 'building', label: i18n.t('locations.form.categories.building') },
      { value: 'floor', label: i18n.t('locations.form.categories.floor') },
      { value: 'room', label: i18n.t('locations.form.categories.room') },
      { value: 'area', label: i18n.t('locations.form.categories.area') }
    ], required: true },
    { label: i18n.t('locations.form.warehouse'), name: 'warehouse', type: 'select', options: JSON.parse(localStorage.getItem('warehouses') || '[]') },
    { label: `${i18n.t('locations.form.status')}<span class="required-asterisk">*</span>`, name: 'status', type: 'select', options: [
      { value: 'online', label: i18n.t('locations.form.statuses.online') },
      { value: 'offline', label: i18n.t('locations.form.statuses.offline') }
    ], required: true }
  ];

  form.innerHTML = `
    <div class="form-header">
      <h2>${initialData.code ? i18n.t('locations.form.titleEdit') : i18n.t('locations.form.title')}</h2>
    </div>
    <div class="form-content">
      <div class="form-row">
        <div class="form-field" style="flex: 1;">
          <label for="name">${i18n.t('locations.form.name')}<span class="required-asterisk">*</span></label>
          <input type="text" id="name" name="name" value="${initialData.name || ''}" required>
        </div>
        <div class="form-field" style="flex: 1;">
          <label for="code">${i18n.t('locations.form.code')}<span class="required-asterisk">*</span></label>
          <input type="text" id="code" name="code" value="${initialData.code || ''}" required readonly>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field" style="flex: 1;">
          <label for="description">${i18n.t('locations.form.description')}</label>
          <textarea id="description" name="description" rows="4">${initialData.description || ''}</textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field" style="flex: 1;">
          <label for="parentAsset">${i18n.t('locations.form.parentAsset')}</label>
          <select id="parentAsset" name="parentAsset">
            <option value="">${i18n.t('locations.form.selectOption')}</option>
            ${JSON.parse(localStorage.getItem('assets') || '[]').map(asset => `
              <option value="${asset.code}" ${initialData.parentAsset === asset.code ? 'selected' : ''}>
                ${asset.name}
              </option>
            `).join('')}
          </select>
        </div>
        <div class="form-field" style="flex: 1;">
          <label for="category">${i18n.t('locations.form.category')}<span class="required-asterisk">*</span></label>
          <select id="category" name="category" required>
            <option value="">${i18n.t('locations.form.selectOption')}</option>
            ${[
              { value: 'building', label: i18n.t('locations.form.categories.building') },
              { value: 'floor', label: i18n.t('locations.form.categories.floor') },
              { value: 'room', label: i18n.t('locations.form.categories.room') },
              { value: 'area', label: i18n.t('locations.form.categories.area') }
            ].map(option => `
              <option value="${option.value}" ${initialData.category === option.value ? 'selected' : ''}>
                ${option.label}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field" style="flex: 1;">
          <label for="warehouse">${i18n.t('locations.form.warehouse')}</label>
          <select id="warehouse" name="warehouse">
            <option value="">${i18n.t('locations.form.selectOption')}</option>
            ${JSON.parse(localStorage.getItem('warehouses') || '[]').map(warehouse => `
              <option value="${warehouse.code}" ${initialData.warehouse === warehouse.code ? 'selected' : ''}>
                ${warehouse.name}
              </option>
            `).join('')}
          </select>
        </div>
        <div class="form-field" style="flex: 1;">
          <label for="status">${i18n.t('locations.form.status')}<span class="required-asterisk">*</span></label>
          <select id="status" name="status" required>
            <option value="">${i18n.t('locations.form.selectOption')}</option>
            ${[
              { value: 'online', label: i18n.t('locations.form.statuses.online') },
              { value: 'offline', label: i18n.t('locations.form.statuses.offline') }
            ].map(option => `
              <option value="${option.value}" ${initialData.status === option.value ? 'selected' : ''}>
                ${option.label}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Section Buttons -->
      <div class="form-sections-nav">
        <button type="button" class="section-btn active" data-section="location">
          <i class="fas fa-map-marker-alt" style="font-size: 1.1em;"></i>
          <span>${i18n.t('locations.form.sections.location')}</span>
        </button>
        <button type="button" class="section-btn" data-section="documents">
          <i class="fas fa-file-alt" style="font-size: 1.1em;"></i>
          <span>${i18n.t('locations.form.sections.documents')}</span>
        </button>
        <button type="button" class="section-btn" data-section="warehouses">
          <i class="fas fa-warehouse" style="font-size: 1.1em;"></i>
          <span>${i18n.t('locations.form.sections.warehouses')}</span>
        </button>
      </div>

      <!-- Location Section -->
      <div class="form-section" id="location-section">
        <div class="form-row">
          <div class="form-field" style="flex: 1;">
            <label>${i18n.t('locations.form.address')}</label>
            <input type="text" name="address" value="${initialData.address || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field" style="flex: 1;">
            <label>${i18n.t('locations.form.state')}</label>
            <select name="state" id="state-select">
              <option value="">${i18n.t('locations.form.selectState')}</option>
              ${getIranStates().map(state => `
                <option value="${state}" ${initialData.state === state ? 'selected' : ''}>${state}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-field" style="flex: 1;">
            <label>${i18n.t('locations.form.city')}</label>
            <select name="city" id="city-select">
              <option value="">${i18n.t('locations.form.selectCity')}</option>
              ${initialData.state ? getIranCities(initialData.state).map(city => `
                <option value="${city}" ${initialData.city === city ? 'selected' : ''}>${city}</option>
              `).join('') : ''}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field" style="flex: 1;">
            <label>${i18n.t('locations.form.postalCode')}</label>
            <input type="text" name="postalCode" value="${initialData.postalCode || ''}" pattern="[0-9]{10}" title="${i18n.t('locations.form.postalCodeFormat')}">
          </div>
        </div>
      </div>

      <!-- Documents Section -->
      <div class="form-section" id="documents-section" style="display: none;">
        <div class="documents-list"></div>
        <button type="button" class="btn-add-item" data-type="document">
          <i class="fas fa-plus"></i> ${i18n.t('locations.form.addDocument')}
        </button>
      </div>

      <!-- Warehouses Section -->
      <div class="form-section" id="warehouses-section" style="display: none;">
        <div class="warehouses-list"></div>
        <button type="button" class="btn-add-item" data-type="warehouse">
          <i class="fas fa-plus"></i> ${i18n.t('locations.form.addWarehouse')}
        </button>
      </div>
    </div>
    <div class="form-actions">
      <button type="button" class="btn-cancel">${i18n.t('common.cancel')}</button>
      <button type="submit" class="btn-save">${initialData.code ? i18n.t('common.edit') : i18n.t('common.save')}</button>
    </div>
  `;

  // Add event listeners
  form.querySelector('.btn-cancel').addEventListener('click', onCancel);
  
  // Handle state-city dependency
  const stateSelect = form.querySelector('#state-select');
  const citySelect = form.querySelector('#city-select');
  
  stateSelect.addEventListener('change', () => {
    const selectedState = stateSelect.value;
    const cities = selectedState ? getIranCities(selectedState) : [];
    
    citySelect.innerHTML = `
      <option value="">${i18n.t('locations.form.selectCity')}</option>
      ${cities.map(city => `<option value="${city}">${city}</option>`).join('')}
    `;
  });

  // Section toggle handlers
  const sectionBtns = form.querySelectorAll('.section-btn');
  sectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      
      // Toggle active state of buttons
      sectionBtns.forEach(b => {
        b.classList.remove('active');
      });
      
      btn.classList.add('active');
      
      // Show selected section, hide others
      form.querySelectorAll('.form-section').forEach(section => {
        section.style.display = section.id === `${sectionId}-section` ? 'block' : 'none';
      });
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      code: formData.get('code'),
      name: formData.get('name'),
      description: formData.get('description'),
      parentAsset: formData.get('parentAsset'),
      category: formData.get('category'),
      warehouse: formData.get('warehouse'),
      status: formData.get('status'),
      address: formData.get('address'),
      state: formData.get('state'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode')
    };
    onSave(data);
  });

  return form;
}

// Helper function to get Iran states
function getIranStates() {
  return [
    'تهران',
    'آذربایجان شرقی',
    'آذربایجان غربی',
    'اردبیل',
    'اصفهان',
    'البرز',
    'ایلام',
    'بوشهر',
    'چهارمحال و بختیاری',
    'خراسان جنوبی',
    'خراسان رضوی',
    'خراسان شمالی',
    'خوزستان',
    'زنجان',
    'سمنان',
    'سیستان و بلوچستان',
    'فارس',
    'قزوین',
    'قم',
    'کردستان',
    'کرمان',
    'کرمانشاه',
    'کهگیلویه و بویراحمد',
    'گیلان',
    'گلستان',
    'لرستان',
    'مازندران',
    'مرکزی',
    'هرمزگان',
    'همدان',
    'یزد'
  ];
}

// Helper function to get cities based on state
function getIranCities(state) {
  const citiesByState = {
    'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'اهر', 'جلفا', 'سراب', 'شبستر', 'کلیبر', 'هشترود', 'میانه', 'بناب', 'آذرشهر'],
    'آذربایجان غربی': ['ارومیه', 'خوی', 'مهاباد', 'سلماس', 'نقده', 'میاندوآب', 'بوکان', 'پیرانشهر', 'سردشت', 'چالدران', 'ماکو'],
    'اردبیل': ['اردبیل', 'پارس‌آباد', 'خلخال', 'مشگین‌شهر', 'گرمی', 'نمین', 'نیر', 'کوثر', 'بیله‌سوار'],
    'اصفهان': ['اصفهان', 'کاشان', 'نجف‌آباد', 'خمینی‌شهر', 'شهرضا', 'فولادشهر', 'گلپایگان', 'مبارکه', 'اردستان', 'زرین‌شهر', 'سمیرم', 'فریدن'],
    'البرز': ['کرج', 'فردیس', 'هشتگرد', 'محمدشهر', 'ماهدشت', 'مشکین‌دشت', 'کمال‌شهر', 'گرمدره', 'اشتهارد', 'چهارباغ', 'نظرآباد'],
    'ایلام': ['ایلام', 'مهران', 'دهلران', 'آبدانان', 'دره‌شهر', 'ایوان', 'سرابله', 'چوار', 'بدره'],
    'بوشهر': ['بوشهر', 'برازجان', 'گناوه', 'دیلم', 'کنگان', 'خورموج', 'جم', 'عسلویه', 'دیر', 'اهرم'],
    'تهران': ['تهران', 'شهریار', 'اسلامشهر', 'ورامین', 'رباط‌کریم', 'پاکدشت', 'قدس', 'دماوند', 'پردیس', 'فیروزکوه', 'پیشوا', 'قرچک', 'باقرشهر'],
    'چهارمحال و بختیاری': ['شهرکرد', 'بروجن', 'فارسان', 'لردگان', 'هفشجان', 'سامان', 'فرخ‌شهر', 'کیان', 'گندمان', 'اردل'],
    'خراسان جنوبی': ['بیرجند', 'قائن', 'فردوس', 'طبس', 'نهبندان', 'سربیشه', 'قاین', 'اسدیه', 'بشرویه', 'سرایان'],
    'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'کاشمر', 'قوچان', 'گناباد', 'چناران', 'درگز', 'سرخس', 'فریمان', 'تایباد'],
    'خراسان شمالی': ['بجنورد', 'شیروان', 'اسفراین', 'جاجرم', 'فاروج', 'گرمه', 'آشخانه', 'راز'],
    'خوزستان': ['اهواز', 'دزفول', 'آبادان', 'خرمشهر', 'بندر ماهشهر', 'اندیمشک', 'شوشتر', 'بهبهان', 'ایذه', 'مسجدسلیمان', 'شوش', 'رامهرمز'],
    'زنجان': ['زنجان', 'ابهر', 'خرمدره', 'قیدار', 'ماه‌نشان', 'صائین‌قلعه', 'سلطانیه', 'دندی', 'آب‌بر', 'ایجرود'],
    'سمنان': ['سمنان', 'شاهرود', 'دامغان', 'گرمسار', 'مهدی‌شهر', 'امیریه', 'ایوانکی', 'بسطام', 'سرخه'],
    'سیستان و بلوچستان': ['زاهدان', 'چابهار', 'ایرانشهر', 'زابل', 'سراوان', 'خاش', 'نیک‌شهر', 'کنارک', 'زهک', 'سرباز'],
    'فارس': ['شیراز', 'مرودشت', 'جهرم', 'فسا', 'کازرون', 'لار', 'آباده', 'داراب', 'نی‌ریز', 'اقلید', 'لامرد', 'استهبان'],
    'قزوین': ['قزوین', 'تاکستان', 'آبیک', 'بوئین‌زهرا', 'الوند', 'محمدیه', 'اقبالیه', 'شال', 'دانسفهان'],
    'قم': ['قم', 'پردیسان', 'قنوات', 'جعفریه', 'دستجرد', 'سلفچگان', 'کهک'],
    'کردستان': ['سنندج', 'سقز', 'مریوان', 'بانه', 'قروه', 'کامیاران', 'بیجار', 'دهگلان', 'دیواندره', 'سریش‌آباد'],
    'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'بم', 'جیرفت', 'زرند', 'کهنوج', 'شهربابک', 'بافت', 'راور', 'بردسیر', 'انار'],
    'کرمانشاه': ['کرمانشاه', 'اسلام‌آباد غرب', 'کنگاور', 'سنقر', 'پاوه', 'جوانرود', 'هرسین', 'صحنه', 'گیلانغرب', 'سرپل ذهاب'],
    'کهگیلویه و بویراحمد': ['یاسوج', 'دوگنبدان', 'دهدشت', 'سی‌سخت', 'لیکک', 'چرام', 'باشت', 'لنده', 'مارگون'],
    'گلستان': ['گرگان', 'گنبدکاووس', 'بندر ترکمن', 'علی‌آباد کتول', 'آق‌قلا', 'کردکوی', 'مینودشت', 'کلاله', 'آزادشهر', 'رامیان'],
    'گیلان': ['رشت', 'انزلی', 'لاهیجان', 'لنگرود', 'رودسر', 'تالش', 'آستارا', 'صومعه‌سرا', 'فومن', 'رودبار', 'ماسال', 'آستانه اشرفیه'],
    'لرستان': ['خرم‌آباد', 'بروجرد', 'دورود', 'الیگودرز', 'کوهدشت', 'ازنا', 'نورآباد', 'پلدختر', 'الشتر'],
    'مازندران': ['ساری', 'بابل', 'آمل', 'قائم‌شهر', 'بهشهر', 'تنکابن', 'نوشهر', 'چالوس', 'نکا', 'محمودآباد', 'فریدونکنار', 'رامسر'],
    'مرکزی': ['اراک', 'ساوه', 'خمین', 'محلات', 'دلیجان', 'شازند', 'آشتیان', 'تفرش', 'کمیجان', 'نراق'],
    'هرمزگان': ['بندرعباس', 'قشم', 'میناب', 'بندر لنگه', 'کیش', 'رودان', 'جاسک', 'حاجی‌آباد', 'بستک', 'پارسیان'],
    'همدان': ['همدان', 'ملایر', 'نهاوند', 'اسدآباد', 'تویسرکان', 'کبودرآهنگ', 'رزن', 'بهار', 'فامنین'],
    'یزد': ['یزد', 'میبد', 'اردکان', 'بافق', 'مهریز', 'ابرکوه', 'تفت', 'اشکذر', 'هرات', 'زارچ']
  };
  
  return citiesByState[state] || [];
}