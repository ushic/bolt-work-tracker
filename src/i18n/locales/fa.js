export const fa = {
  app: {
    title: 'تی‌ال.ورک.ترک'
  },
  user: {
    name: 'جان دو',
    role: 'مدیر سیستم'
  },
  common: {
    new: 'افزودن',
    export: 'دریافت خروجی',
    edit: 'ویرایش اطلاعات',
    delete: 'حذف کردن',
    save: 'ذخیره‌سازی',
    cancel: 'لغو عملیات',
    actions: 'عملیات‌ها',
    confirmDelete: 'آیا از حذف این {{item}} اطمینان دارید؟ این عملیات قابل ��ازگشت نیست.',
    attachments: 'پیوست‌ها',
    attach: 'افزودن فایل',
    forms: 'فرم‌ها',
    selectForm: 'انتخاب فرم',
    yes: 'بله، حذف شود',
    no: 'خیر، منصرف شدم',
    search: 'جستجو...',
    noResults: 'نتیجه‌ای یافت نشد',
    loading: 'در حال بارگذاری...'
  },
  navigation: {
    overallWork: 'کارهای کلی',
    myWork: 'کارهای من',
    overallAssets: 'دارایی‌های کلی',
    myAssets: 'دارایی‌های من',
    dashboard: 'داشبورد',
    myDashboard: 'داشبورد من',
    myActions: 'فعالیت‌های من',
    myAssets: 'دارایی‌های من',
    calendar: 'تقویم',
    work: 'کار',
    requests: 'درخواست‌ها',
    tasks: 'وظایف',
    workOrders: 'دستور کارها',
    projects: 'پروژه‌ها',
    assets: 'دارایی‌ها',
    locations: 'مکان‌ها',
    equipment: 'تجهیزات',
    tools: 'ابزارها',
    groups: 'گروه‌ها',
    supplies: 'موجودی',
    stock: 'انبار',
    warehouses: 'انبارها',
    catalog: 'کاتالوگ',
    services: 'خدمات',
    norms: 'نورم‌ها',
    parts: 'قطعات',
    labors: 'نیروی کار',
    forms: 'فرم‌ها',
    businesses: 'کسب و کارها',
    contacts: 'مخاطبین',
    companies: 'شرکت‌ها',
    contracts: 'قراردادها',
    reports: 'گزارش‌ها',
    administration: 'مدیریت',
    settings: 'تنظیمات',
    users: 'کاربران',
    roles: 'نقش‌ها'
  },
  services: {
    title: 'لیست خدمات',
    form: {
      title: 'خدمت جدید',
      titleEdit: 'ویرایش خدمت',
      code: 'کد',
      name: 'نام',
      category: 'دسته‌بندی',
      description: 'توضیحات',
      active: 'وضعیت فعالیت',
      selectCategory: 'انتخاب دسته‌بندی',
      categories: {
        maintenance: 'نگهداری',
        repair: 'تعمیرات',
        installation: 'نصب و راه‌اندازی',
        inspection: 'بازرسی',
        consulting: 'مشاوره'
      }
    },
    table: {
      code: 'کد',
      name: 'نام',
      category: 'دسته‌بندی',
      description: 'توضیحات',
      active: 'وضعیت',
      activeStatus: {
        true: 'فعال',
        false: 'غیرفعال'
      }
    }
  },
  contacts: {
    title: 'لیست مخاطبین',
    form: {
      title: 'مخاطب جدید',
      titleEdit: 'ویرایش مخاطب',
      firstName: 'نام کوچک',
      lastName: 'نام خانوادگی',
      email: 'آدرس ایمیل',
      phone: 'شماره تلفن',
      company: 'نام شرکت',
      jobTitle: 'عنوان شغلی',
      address: 'جزئیات آدرس',
      street: 'آدرس خیابان',
      city: 'شهر',
      state: 'استان',
      postalCode: 'کد‌پستی',
      required: 'پر کردن این فیلد الزامی است',
      country: 'کشور'
    },
    table: {
      fullName: 'نام کامل',
      jobTitle: 'عنوان شغلی',
      company: 'شرکت',
      organization: 'سازمان',
      email: 'پست الکترونیک',
      mobile: 'تلفن همراه'
    }
  },
  companies: {
    title: 'لیست شرکت‌ها',
    form: {
      title: 'شرکت جدید',
      titleEdit: 'ویرایش شرکت',
      code: 'کد شرکت',
      name: 'نام شرکت',
      type: 'نوع شرکت',
      active: 'وضعیت فعالیت',
      types: {
        corporation: 'شرکت سهامی',
        llc: 'مسئولیت محدود',
        partnership: 'شراکتی',
        soleProprietorship: 'تک مالکیتی',
        nonProfit: 'غیر انتفاعی',
        other: 'سایر'
      }
    },
    table: {
      code: 'کد شرکت',
      name: 'نام شرکت',
      type: 'نوع شرکت',
      active: 'وضعیت',
      selectType: 'انتخاب',
      activeStatus: {
        true: 'فعال',
        false: 'غیرفعال'
      }
    }
  },
  labors: {
    title: 'لیست نیروی کار',
    form: {
      title: 'نیروی کار جدید',
      titleEdit: 'ویرایش نیروی کار',
      code: 'کد',
      name: 'نام',
      category: 'دسته‌بندی',
      active: 'وضعیت فعالیت',
      selectCategory: 'انتخاب دسته‌بندی',
      categories: {
        technician: 'تکنسین',
        engineer: 'مهندس',
        specialist: 'متخصص',
        helper: 'کمکی'
      }
    },
    table: {
      code: 'کد',
      name: 'نام',
      category: 'دسته‌بندی',
      active: 'وضعیت',
      activeStatus: {
        true: 'فعال',
        false: 'غیرفعال'
      }
    }
  },
  forms: {
    title: 'لیست فرم‌ها',
    form: {
      title: 'فرم جدید',
      titleEdit: 'ویرایش فرم',
      code: 'کد',
      name: 'نام',
      description: 'توضیحات',
      active: 'وضعیت فعالیت'
    },
    table: {
      code: 'کد',
      name: 'نام',
      description: 'توضیحات',
      active: 'وضعیت',
      activeStatus: {
        true: 'فعال',
        false: 'غیرفعال'
      }
    }
  },
  norms: {
    title: 'لیست نورم‌ها',
    form: {
      title: 'نورم جدید',
      titleEdit: 'ویرایش نورم',
      code: 'کد',
      name: 'نام',
      service: 'خدمت',
      description: 'توضیحات',
      active: 'وضعیت فعالیت',
      selectService: 'انتخاب خدمت',
      labors: 'نیروی کار',
      parts: 'قطعات',
      quantity: 'تعداد',
      addLabor: 'افزودن نیروی کار',
      addPart: 'افزودن قطعه',
      noLaborsSelected: 'نیروی کاری انتخاب نشده است',
      noPartsSelected: 'قطعه‌ای انتخاب نشده است'
    },
    table: {
      code: 'کد',
      name: 'نام',
      service: 'خدمت',
      active: 'وضعیت',
      activeStatus: {
        true: 'فعال',
        false: 'غیرفعال'
      }
    }
  },
  contracts: {
    title: 'لیست قراردادها',
    form: {
      title: 'قرارداد جدید',
      titleEdit: 'ویرایش قرارداد',
      code: 'کد',
      name: 'نام',
      contractNumber: 'شماره قرارداد',
      type: 'نوع',
      partyOrganization: 'سازمان طرف قرارداد',
      partyContact: 'شخص رابط',
      endDate: 'تاریخ پایان',
      status: 'وضعیت',
      selectOption: 'انتخاب کنید',
      sections: {
        general: 'عمومی',
        services: 'خدمات',
        labors: 'نیروی کار',
        parts: 'قطعات'
      },
      amount: 'مبلغ',
      frequency: 'دوره',
      startDate: 'تاریخ شروع',
      generalEndDate: 'تاریخ پایان',
      frequencies: {
        monthly: 'ماهانه',
        quarterly: 'سه‌ماهه',
        yearly: 'سالانه'
      },
      addService: 'افزودن خدمت',
      selectServices: 'انتخاب خدمات',
      addLabor: 'افزودن نیروی کار',
      selectLabors: 'انتخاب نیروی کار',
      addPart: 'افزودن قطعه',
      selectParts: 'انتخاب قطعات',
      types: {
        client: 'کارفرما',
        serviceProvider: 'پیمانکار'
      },
      statuses: {
        active: 'فعال',
        draft: 'پیش‌نویس',
        expired: 'منقضی شده',
        suspended: 'معلق'
      }
    },
    table: {
      code: 'کد',
      name: 'نام',
      contractNumber: 'شماره قرارداد',
      type: 'نوع',
      partyOrganization: 'سازمان طرف قرارداد',
      partyContact: 'شخص رابط',
      endDate: 'تاریخ پایان',
      status: 'وضعیت'
    }
  },
  parts: {
    title: 'لیست قطعات',
    form: {
      title: 'قطعه جدید',
      titleEdit: 'ویرایش قطعه',
      code: 'کد',
      name: 'نام',
      type: 'نوع',
      category: 'دسته‌بندی',
      warranty: 'گارانتی (ماه)',
      active: 'وضعیت فعالیت',
      selectOption: 'انتخاب کنید',
      types: {
        mechanical: 'مکانیکی',
        electrical: 'الکتریکی',
        electronic: 'الکترونیکی',
        hydraulic: 'هیدرولیکی',
        pneumatic: 'پنوماتیکی'
      },
      categories: {
        spare: 'قطعه یدکی',
        wear: 'قطعه مصرفی',
        consumable: 'مصرفی',
        assembly: 'مجموعه'
      }
    },
    table: {
      code: 'کد',
      name: 'نام',
      type: 'نوع',
      category: 'دسته‌بندی',
      warranty: 'گارانتی',
      active: 'وضعیت',
      activeStatus: {
        true: 'فعال',
        false: 'غیرفعال'
      }
    }
  },
  locations: {
    title: 'لیست مکان‌ها',
    form: {
      title: 'مکان جدید',
      titleEdit: 'ویرایش مکان',
      code: 'کد',
      name: 'نام',
      description: 'توضیحات',
      parentAsset: 'دارایی والد',
      category: 'دسته‌بندی',
      warehouse: 'انبار',
      status: 'وضعیت',
      address: 'آدرس',
      state: 'استان',
      city: 'شهر',
      postalCode: 'کد پستی',
      selectOption: 'انتخاب کنید',
      selectState: 'انتخاب استان',
      selectCity: 'انتخاب شهر',
      postalCodeFormat: 'لطفاً یک کد پستی ۱۰ رقمی معتبر وارد کنید',
      sections: {
        location: 'مکان',
        documents: 'اسناد',
        warehouses: 'انبارها'
      },
      categories: {
        building: 'ساختمان',
        floor: 'طبقه',
        room: 'اتاق',
        area: 'منطقه'
      },
      statuses: {
        online: 'فعال',
        offline: 'غیرفعال'
      },
      addDocument: 'افزودن سند',
      addWarehouse: 'افزودن انبار'
    },
    table: {
      code: 'کد',
      name: 'نام',
      parentAsset: 'دارایی والد',
      category: 'دسته‌بندی',
      status: 'وضعیت'
    }
  },
  warehouses: {
    title: 'لیست انبارها',
    form: {
      title: 'انبار جدید',
      titleEdit: 'ویرایش انبار',
      code: 'کد',
      name: 'نام',
      type: 'نوع',
      organization: 'سازمان',
      status: 'وضعیت',
      description: 'توضیحات',
      selectOption: 'انتخاب کنید',
      types: {
        main: 'انبار اصلی',
        regional: 'انبار منطقه‌ای',
        local: 'انبار محلی'
      },
      statuses: {
        active: 'فعال',
        inactive: 'غیرفعال'
      }
    },
    table: {
      code: 'کد',
      name: 'نام',
      type: 'نوع',
      organization: 'سازمان',
      status: 'وضعیت'
    }
  }
};
