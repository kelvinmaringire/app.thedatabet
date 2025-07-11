const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresGuest: true },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('pages/ForgotPasswordPage.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/ResetPasswordPage.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'predictions',
        component: () => import('pages/Dashboard/Tips/GamePredictionsPage.vue'),
      },
      {
        path: 'previews',
        name: 'previews',
        component: () => import('pages/Dashboard/Tips/PreviewsPage.vue'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('pages/Dashboard/Account/AccountPage.vue'),
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import('pages/Dashboard/Account/ChangePasswordPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
