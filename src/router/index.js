import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Rule from '../views/Rule.vue'
import God from '../views/God.vue'
import Player from '../views/Player.vue'
import Rank from '../views/Rank.vue'
import Result from '../views/Result.vue'
import Room from '../views/Room.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/rule',
        name: 'Rule',
        component: Rule
    },
    {
        path: '/god',
        name: 'God',
        component: God
    },
    {
        path: '/player',
        name: 'Player',
        component: Player
    },
    {
        path: '/rank',
        name: 'Rank',
        component: Rank
    },
    {
        path: '/result',
        name: 'Result',
        component: Result
    },
    {
        path: '/room',
        name: 'Room',
        component: Room
    },
]

const router = new VueRouter({
    routes
})

export default router