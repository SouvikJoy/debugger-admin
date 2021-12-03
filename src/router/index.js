import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import Products from '@/views/Products.vue';
import CreateProduct from '@/views/CreateProduct.vue';
import EditProduct from '@/views/EditProduct.vue';
import Categories from '@/views/Categories.vue';
import EditCategory from '@/views/EditCategory.vue';
import CreateCategory from '@/views/CreateCategory.vue';
import Services from '@/views/Services.vue';
import EditService from '@/views/EditService.vue';
import CreateService from '@/views/CreateService.vue';
import SiteInfo from '@/views/SiteInfo.vue';

const routes = [
  {
    meta: {
      title: 'Dashboard'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    meta: {
      title: 'Site Informations'
    },
    path: '/site-info',
    name: 'SiteInfo',
    component: SiteInfo
  },
  {
    meta: {
      title: 'Categories'
    },
    path: '/categories',
    component: Categories
  },
  {
    meta: {
      title: 'Edit Category'
    },
    path: '/categories/:id',
    component: EditCategory,
    props: true
  },
  {
    meta: {
      title: 'Create Category'
    },
    path: '/create-category',
    component: CreateCategory
  },
  {
    meta: {
      title: 'Products'
    },
    path: '/products',
    component: Products
  },
  {
    meta: {
      title: 'Edit Product'
    },
    path: '/products/:id',
    component: EditProduct,
    props: true
  },
  {
    meta: {
      title: 'Create Product'
    },
    path: '/create-product',
    component: CreateProduct
  },
  {
    meta: {
      title: 'Services'
    },
    path: '/services',
    component: Services
  },
  {
    meta: {
      title: 'Edit Service'
    },
    path: '/services/:id',
    component: EditService,
    props: true
  },
  {
    meta: {
      title: 'Create Service'
    },
    path: '/create-service',
    component: CreateService
  },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

export default router;
