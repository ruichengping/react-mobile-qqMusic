import Loadable from 'react-loadable';
import createHistory from 'history/createBrowserHistory';
import MainLayout from '@/layouts/MainLayout';
import Loading from '@/components/Loading';


const Discovery = Loadable({loader: () => import('@/pages/Discovery'),loading: Loading});
const MusicClub = Loadable({loader: () => import('@/pages/MusicClub'),loading: Loading});
const MyCenter = Loadable({loader: () => import('@/pages/MyCenter'),loading: Loading});

export const history = createHistory();

export const routes = [
  {
    path:'/',
    redirect:'/myCenter'
  },
  {
    path:'/myCenter',
    layout:MainLayout,
    component:MyCenter
  },
  {
    path:'/musicClub',
    layout:MainLayout,
    component:MusicClub
  },
  {
    path:'/discovery',
    layout:MainLayout,
    component:Discovery
  },
]