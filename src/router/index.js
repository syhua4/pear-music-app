import Vue from 'vue';
import VueRouter from 'vue-router';

const Recommend = () => import('views/Recommend/Recommend');
const Playlist = () => import('views/Playlist/Playlist');

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    name: 'recommend'
  },
  {
    path: '/playlist/:id',
    component: Playlist,
    name: 'playlist'
  }
];

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? '' : 'history',
  base: process.env.NODE_ENV === 'production' ? 'https://autumnfish.cn' : '',
  routes
});

export default router;
