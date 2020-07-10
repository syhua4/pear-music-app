import Vue from 'vue';
import VueRouter from 'vue-router';

const Recommend = () => import('views/Recommend/Recommend');
const RecommendSong = () => import('views/Recommend/ChildComp/RecommendDaily');
const Playlist = () => import('views/Playlist/Playlist');
const PlaylistSquare = () => import('views/PlaylistSquare/PlaylistSquare');
const Search = () => import('views/Search/Search');
const SearchResult = () => import('views/SearchResult/SearchResult');
const Login = () => import('views/Login/Login');

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    name: 'recommend',
    meta: { index: 0 },
    children: [
      {
        path: 'songs',
        component: RecommendSong,
        meta: { index: 1 }
      }
    ]
  },
  { path: '/playlists', component: PlaylistSquare, name: 'playlist-square', meta: { index: 1 } },
  {
    path: '/playlist/:id',
    component: Playlist,
    name: 'playlist',
    meta: { index: 2 }
  },
  {
    path: '/search',
    component: Search,
    name: 'search',
    meta: { index: 1, prevPath: 'recommend' }
  },
  {
    path: '/search',
    component: SearchResult,
    name: 'searchResult',
    props: true,
    meta: { index: 2 }
  },
  {
    path: '/account',
    component: Login,
    name: 'login',
    meta: { index: 0 }
  }
];

const router = new VueRouter({
  mode: 'hash',
  // base: '/pear-music-app/',
  routes
});

export default router;
