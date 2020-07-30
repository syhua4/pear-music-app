import Vue from 'vue';
import VueRouter from 'vue-router';

const Recommend = () => import('views/Recommend/Recommend');
const RecommendSong = () => import('views/Recommend/ChildComp/RecommendDaily');

const Radio = () => import('views/Radio/Radio');
const RadioCategory = () => import('views/Radio/ChildComp/RadioCategory');
const RadioToplist = () => import('views/Radio/ChildComp/RadioToplist');
const RadioProgram = () => import('views/Radio/ChildComp/RadioProgram');

const Playlist = () => import('views/Playlist/Playlist');
const PlaylistSquare = () => import('views/PlaylistSquare/PlaylistSquare');
const PlaylistCategory = () => import('views/PlaylistSquare/ChildComp/PlaylistCategory');

const Toplist = () => import('views/Toplist/Toplist');

const Search = () => import('views/Search/Search');

const Account = () => import('views/Account/Account');
const Mine = () => import('views/MyMusic/Mine');

const Album = () => import('views/Album/Album');

const Artist = () => import('views/Artist/Artist');
const ArtistInfo = () => import('views/Artist/ChildComp/ArtistInfo');

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
  { path: '/toplist', component: Toplist, name: 'toplist', meta: { index: 1 } },
  {
    path: '/radio',
    component: Radio,
    name: 'radio',
    meta: { index: 0 },
    children: [
      {
        name: 'radio-category',
        path: 'category',
        component: RadioCategory,
        meta: { index: 1 }
      },
      {
        path: 'toplist',
        component: RadioToplist,
        meta: { index: 1 }
      },
      {
        path: 'program/:id',
        component: RadioProgram,
        meta: { index: 1 }
      }
    ]
  },
  {
    path: '/artist',
    name: 'artist',
    component: Artist,
    meta: { index: 1 },
    children: [
      {
        path: ':id',
        component: ArtistInfo,
        name: 'artist-info',
        meta: { index: 2 }
      }
    ]
  },
  {
    path: '/playlists',
    component: PlaylistSquare,
    name: 'playlist-square',
    meta: { index: 1 },
    children: [
      {
        name: 'playlist-category',
        path: 'category',
        meta: { index: 2 },
        component: PlaylistCategory
      }
    ]
  },
  {
    path: '/playlists/:id',
    component: Playlist,
    name: 'playlist',
    meta: { index: 2 }
  },
  {
    path: '/album/:id',
    component: Album,
    meta: { index: 1 },
    name: 'album'
  },
  {
    path: '/search',
    component: Search,
    name: 'search',
    meta: { index: 1 }
  },
  {
    path: '/account',
    component: Account,
    name: 'account',
    meta: { index: 0 }
  },
  {
    path: '/user',
    component: Mine,
    name: 'my-music',
    meta: { index: 0 }
  }
];

const router = new VueRouter({
  mode: 'hash',
  // base: '/pear-music-app/',
  routes
});

export default router;
