const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/LoginPage.vue') },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
      {
        path: 'password-reset',
        name: 'password_reset',
        component: () => import('pages/ForgotPasswordPage.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    //meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'predictions',
        component: () => import('pages/Dashboard/Tips/GamePredictionsPage.vue'),
      },
      {
        path: '',
        name: 'previews',
        component: () => import('pages/Dashboard/Tips/PreviewsPage.vue'),
      },
      {
        path: '/account',
        name: 'account',
        component: () => import('pages/Dashboard/Account/AccountPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
