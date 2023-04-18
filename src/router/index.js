import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SongView from '../views/SongView.vue'
import RecordingView from '../views/RecordingView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:song',
    name: 'SongView',
    component: SongView
  },
  {
    path: '/:song/:file',
    name: 'RecordingView',
    component: RecordingView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
