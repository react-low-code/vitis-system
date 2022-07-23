import { IRouterConfig, lazy } from 'ice';
import Layout from '@/Layouts/BasicLayout';

const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/components/NotFound'));
const Login = lazy(() => import('@/pages/Login'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      exact: true,
      component: Home,
    }, {
      component: NotFound,
    }],
  },
];

export default routerConfig;
