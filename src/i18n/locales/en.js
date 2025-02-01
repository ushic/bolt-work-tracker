export const en = {
  app: {
    title: 'TL.Work.Track'
  },
  user: {
    name: 'John Doe',
    role: 'Administrator'
  },
  common: {
    new: 'New',
    export: 'Export',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    actions: 'Actions',
    confirmDelete: 'Are you sure you want to delete this {{item}}?',
    attachments: 'Attachments',
    attach: 'Attach Files',
    forms: 'Forms',
    selectForm: 'Select a form',
    yes: 'Yes',
    no: 'No'
  },
  navigation: {
    overallWork: 'Overall Work',
    myWork: 'My Work',
    overallAssets: 'Overall Assets',
    myAssets: 'My Assets',
    dashboard: 'Dashboard',
    myDashboard: 'My Dashboard',
    myActions: 'My Actions',
    myAssets: 'My Assets',
    calendar: 'Calendar',
    work: 'Work',
    requests: 'Requests',
    tasks: 'Tasks',
    workOrders: 'Work Orders',
    projects: 'Projects',
    assets: 'Assets',
    locations: 'Locations',
    equipment: 'Equipment',
    tools: 'Tools',
    groups: 'Groups',
    supplies: 'Supplies',
    stock: 'Stock',
    warehouses: 'Warehouses',
    catalog: 'Catalog',
    services: 'Services',
    norms: 'Norms',
    parts: 'Parts',
    labors: 'Labors',
    forms: 'Forms',
    businesses: 'Businesses',
    contacts: 'Contacts',
    companies: 'Companies',
    contracts: 'Contracts',
    reports: 'Reports',
    administration: 'Administration',
    settings: 'Settings',
    users: 'Users',
    roles: 'Roles'
  },
  services: {
    title: 'Service List',
    form: {
      title: 'New Service',
      titleEdit: 'Edit Service',
      code: 'Code',
      name: 'Name',
      category: 'Category',
      description: 'Description',
      active: 'Active',
      selectCategory: 'Select Category',
      categories: {
        maintenance: 'Maintenance',
        repair: 'Repair',
        installation: 'Installation',
        inspection: 'Inspection',
        consulting: 'Consulting'
      }
    },
    table: {
      code: 'Code',
      name: 'Name',
      category: 'Category',
      description: 'Description',
      active: 'Status',
      activeStatus: {
        true: 'Active',
        false: 'Inactive'
      }
    }
  },
	labors: {
    title: 'Labor List',
    form: {
      title: 'New Labor',
      titleEdit: 'Edit Labor',
      code: 'Code',
      name: 'Name',
      category: 'Category',
      active: 'Active',
      selectCategory: 'Select Category',
      categories: {
        technician: 'Technician',
        engineer: 'Engineer',
        specialist: 'Specialist',
        helper: 'Helper'
      }
    },
    table: {
      code: 'Code',
      name: 'Name',
      category: 'Category',
      active: 'Status',
      activeStatus: {
        true: 'Active',
        false: 'Inactive'
      }
    }
  },
  contacts: {
    title: 'Contact List',
    form: {
      title: 'New Contact',
      titleEdit: 'Edit Contact',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      company: 'Company Name',
      jobTitle: 'Job Title',
      address: 'Address Details',
      street: 'Street Address',
      city: 'City',
      state: 'State/Province',
      postalCode: 'Postal Code',
      country: 'Country'
    },
    table: {
      fullName: 'Full Name',
      jobTitle: 'Job Title',
      company: 'Company',
      organization: 'Organization',
      email: 'Email',
      mobile: 'Mobile'
    }
  },
  companies: {
    title: 'Company List',
    form: {
      title: 'New Company',
      titleEdit: 'Edit Company',
      code: 'Code',
      name: 'Name',
      type: 'Type',
      active: 'Active',
      types: {
        corporation: 'Corporation',
        llc: 'LLC',
        partnership: 'Partnership',
        soleProprietorship: 'Sole Proprietorship',
        nonProfit: 'Non-Profit',
        other: 'Other'
      }
    },
    table: {
      code: 'Code',
      name: 'Name',
      type: 'Type',
      active: 'Active'
    }
  },
  forms: {
    title: 'Form List',
    form: {
      title: 'New Form',
      titleEdit: 'Edit Form',
      code: 'Code',
      name: 'Name',
      description: 'Description',
      active: 'Active'
    },
    table: {
      code: 'Code',
      name: 'Name',
      description: 'Description',
      active: 'Status',
      activeStatus: {
        true: 'Active',
        false: 'Inactive'
      }
    }
  },
  norms: {
    title: 'Norm List',
    form: {
      title: 'New Norm',
      titleEdit: 'Edit Norm',
      code: 'Code',
      name: 'Name',
      service: 'Service',
      description: 'Description',
      active: 'Active',
      selectService: 'Select Service',
      labors: 'Labors',
      parts: 'Parts',
      quantity: 'Quantity',
      addLabor: 'Add Labor',
      addPart: 'Add Part',
      noLaborsSelected: 'No labors selected',
      noPartsSelected: 'No parts selected'
    },
    table: {
      code: 'Code',
      name: 'Name',
      service: 'Service',
      active: 'Status',
      activeStatus: {
        true: 'Active',
        false: 'Inactive'
      }
    }
  },
  contracts: {
    title: 'Contract List',
    form: {
      title: 'New Contract',
      titleEdit: 'Edit Contract',
      code: 'Code',
      name: 'Name',
      contractNumber: 'Contract Number',
      type: 'Type',
      partyOrganization: 'Party Organization',
      partyContact: 'Party Contact',
      endDate: 'End Date',
      status: 'Status',
      selectOption: 'Select an option',
      sections: {
        general: 'General',
        services: 'Services',
        labors: 'Labors',
        parts: 'Parts'
      },
      amount: 'Amount',
      frequency: 'Frequency',
      startDate: 'Start Date',
      generalEndDate: 'End Date',
      frequencies: {
        monthly: 'Monthly',
        quarterly: 'Quarterly',
        yearly: 'Yearly'
      },
      addService: 'Add Service',
      selectServices: 'Select Services',
      addLabor: 'Add Labor',
      selectLabors: 'Select Labors',
      addPart: 'Add Part',
      selectParts: 'Select Parts',
      types: {
        client: 'Client',
        serviceProvider: 'Service Provider'
      },
      statuses: {
        active: 'Active',
        draft: 'Draft',
        expired: 'Expired',
        suspended: 'Suspended'
      }
    },
    table: {
      code: 'Code',
      name: 'Name',
      contractNumber: 'Contract Number',
      type: 'Type',
      partyOrganization: 'Party Organization',
      partyContact: 'Party Contact',
      endDate: 'End Date',
      status: 'Status'
    }
  },
  parts: {
    title: 'Part List',
    form: {
      title: 'New Part',
      titleEdit: 'Edit Part',
      code: 'Code',
      name: 'Name',
      type: 'Type',
      category: 'Category',
      warranty: 'Warranty (Months)',
      active: 'Active',
      selectOption: 'Select an option',
      types: {
        mechanical: 'Mechanical',
        electrical: 'Electrical',
        electronic: 'Electronic',
        hydraulic: 'Hydraulic',
        pneumatic: 'Pneumatic'
      },
      categories: {
        spare: 'Spare Part',
        wear: 'Wear Part',
        consumable: 'Consumable',
        assembly: 'Assembly'
      }
    },
    table: {
      code: 'Code',
      name: 'Name',
      type: 'Type',
      category: 'Category',
      warranty: 'Warranty',
      active: 'Status',
      activeStatus: {
        true: 'Active',
        false: 'Inactive'
      }
    }
  },
	locations: {
    title: 'Location List',
    form: {
      title: 'New Location',
      titleEdit: 'Edit Location',
      code: 'Code',
      name: 'Name',
      description: 'Description',
      parentAsset: 'Parent Asset',
      category: 'Category',
      warehouse: 'Warehouse',
      status: 'Status',
      address: 'Address',
      state: 'State',
      city: 'City',
      postalCode: 'Postal Code',
      selectOption: 'Select an option',
      selectState: 'Select State',
      selectCity: 'Select City',
      postalCodeFormat: 'Please enter a valid 10-digit postal code',
      sections: {
        location: 'Location',
        documents: 'Documents',
        warehouses: 'Warehouses'
      },
      categories: {
        building: 'Building',
        floor: 'Floor',
        room: 'Room',
        area: 'Area'
      },
      statuses: {
        online: 'Online',
        offline: 'Offline'
      },
      addDocument: 'Add Document',
      addWarehouse: 'Add Warehouse'
    },
    table: {
      code: 'Code',
      name: 'Name',
      parentAsset: 'Parent Asset',
      category: 'Category',
      status: 'Status'
    }
  },
  warehouses: {
    title: 'Warehouse List',
    form: {
      title: 'New Warehouse',
      titleEdit: 'Edit Warehouse',
      code: 'Code',
      name: 'Name',
      type: 'Type',
      organization: 'Organization',
      status: 'Status',
      description: 'Description',
      selectOption: 'Select an option',
      types: {
        main: 'Main Warehouse',
        regional: 'Regional Warehouse',
        local: 'Local Warehouse'
      },
      statuses: {
        active: 'Active',
        inactive: 'Inactive'
      }
    },
    table: {
      code: 'Code',
      name: 'Name',
      type: 'Type',
      organization: 'Organization',
      status: 'Status'
    }
  }
};
