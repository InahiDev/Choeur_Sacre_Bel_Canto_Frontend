import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/Public.vue'

const routes = [
  {
    path: '/',
    name: 'public',
    component: PublicView,
    meta: {
      title: "Choeur Sacré Bel Canto | Page d'accueil",
      metaTags: [
        {
          name: "description",
          content: "Bienvenue sur la page d'accueil du Choeur Sacré Bel Canto. Choeur dirigé par XXXX XXXX et se produisant sur la région toulousaine."
        }
      ]
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Research.vue'),
    meta: {
      title: "Choeur Sacré Bel Canto | Recherche",
      metaTags: [
        {
          name: "description",
          content: "Recherchez dans la base de données les documents / concerts et autres informations stockées (certaines nécessitent un compte accrédité par les administrateurs pour être consultées)"
        }
      ]
    }
  },
  {
    path: '/admin',
    name: 'board',
    component: () => import('../views/Admin.vue'),
    meta: {
      title: "Choeur Sacré Bel Canto | Dashboard Administrateur",
      metaTags: [
        {
          name: "description",
          content: "Bienvenue sur le Tableau de bord pour la gestion du site. N'hésitez pas à contacter Gabriel Delaigue si un problème survient!"
        }
      ]
    }
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/Connexion.vue'),
    meta: {
      title: "Choeur Sacré Bel Canto | Connexion au compte",
      metaTags: [
        {
          name: "description",
          content: "Connectez-vous à votre compte CSBC afin de consulter et télécharger plus de ressources disponibles uniquement pour les membres reconnus du choeur!"
        }
      ]
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/passwordReset',
    name: 'passwordReseting',
    component: () => import('../views/Reseting.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
