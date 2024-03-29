import { createRouter, createWebHistory } from 'vue-router'
import Store from '../store/index'
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
    beforeEnter(to, from, next) {
      if (Store.state.status === 'private' && Store.state.user.role !== 'None') {
        next('/account')
      } else {
        next()
      }
    },
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
  },
  {
    path: '/account',
    name: 'personnal',
    component: () => import('../views/User.vue'),
    meta: {
      title: "Choeur Sacré Bel Canto | Page d'informations personnelles",
      metaTags: [
        {
          name: "personnal",
          content: "Informations personnelles du compte avec lequel vous êtes connectés."
        }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function redirectToLoginPage(to, from, next) {
  if (to.name == ("board" || "search") || to.path == ("/account")) {
    if (Store.state.status !== "private") {
      next('/connexion')
    } else {
      next()
    }
  } else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  redirectToLoginPage(to, from, next)
})

export default router
