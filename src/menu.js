import {
  mdiDesktopMac,
  mdiViewList
} from '@mdi/js';

export default [
  'General',
  [
    {
      to: '/',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    }
  ],
  'Shop Related',
  [
    {
      label: 'Categories',
      subLabel: 'Categories Sub Menu',
      icon: mdiViewList,
      menu: [
        {
          to: '/categories',
          label: 'Category List'
        },
        {
          to: '/create-category',
          label: 'Create Category'
        }
      ]
    },
    {
      label: 'Products',
      subLabel: 'Products Sub Menu',
      icon: mdiViewList,
      menu: [
        {
          to: '/products',
          label: 'Product List'
        },
        {
          to: '/create-product',
          label: 'Create Product'
        }
      ]
    }
  ],
  'Others',
  [
    {
      label: 'Services',
      subLabel: 'Services Sub Menu',
      icon: mdiViewList,
      menu: [
        {
          to: '/services',
          label: 'Service List'
        },
        {
          to: '/create-service',
          label: 'Create Service'
        }
      ]
    }
  ]
];
