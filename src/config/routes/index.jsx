import { lazy } from 'react';

const AppRoutes = [
  {
    id: 1,
    path: '/',
    component: lazy(() => import('container/pages/Dashboard')),
    exact: true
  },
  {
    id: 5,
    path: '/form-survey',
    component: lazy(() => import('container/pages/FormSurvey')),
    exact: true
  },
  {
    id: 6,
    path: '/umkm-smart',
    component: lazy(() => import('container/pages/UmkmSmart')),
    exact: true
  },
  {
    id: 8,
    path: '/profil',
    component: lazy(() => import('container/pages/Profile')),
    exact: true
  },
  {
    id: 9,
    path: ['/riwayat-survey', '/riwayat-survey-kompetensi'],
    component: lazy(() => import('container/pages/RiwayatSurveyKompetensi')),
    exact: true
  },
  {
    id: 10,
    path: '/class',
    component: lazy(() => import('container/pages/UmkmClass')),
    exact: true
  },
  {
    id: 11,
    path: '/umkm-smart/kelas/:classId',
    component: lazy(() => import('container/pages/UmkmDetailClass')),
    exact: true
  },
  {
    id: 11,
    path: '/umkm-smart/riwayat-kelas',
    component: lazy(() => import('container/pages/UmkmClassHistory')),
    exact: true
  },
  {
    id: 12,
    path: '/i-umkm',
    component: lazy(() => import('container/pages/IUmkm')),
    exact: true
  }
];

const UnauthorizedRoutes = [
  {
    id: 2,
    path: '/login',
    component: lazy(() => import('container/pages/Login')),
    exact: true
  },
  {
    id: 3,
    path: '/register-nasabah',
    component: lazy(() => import('container/pages/RegisterNasabah')),
    exact: true
  },
  {
    id: 4,
    path: '/forgot-pin',
    component: lazy(() => import('container/pages/LupaPin')),
    exact: true
  },
  {
    id: 5,
    path: '/payment',
    component: lazy(() => import('container/pages/Payment')),
    exact: true
  }
];

const PublicRoutes = [
  {
    id: 0,
    path: '/error-404',
    component: lazy(() => import('container/pages/Error-404')),
    exact: true
  },
  {
    id: 10,
    path: '/profil/:nik',
    component: lazy(() => import('container/pages/ProfilePublic')),
    exact: true
  },
  {
    id: 1,
    path: '/coming-soon',
    component: lazy(() => import('container/pages/Comingsoon')),
    exact: true
  }
];

export { AppRoutes, PublicRoutes, UnauthorizedRoutes };
