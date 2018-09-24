import Vue from 'vue';
import App from './app.vue'
import '../client/assets/less/global.less'
import VueRouter from 'vue-router'
import createRouter from './config/router'
import createStore from './store/store'
import Vuex from "vuex";

Vue.use(VueRouter);
Vue.use(Vuex);

const router = createRouter()
const store = createStore()

const root = document.createElement('div')

// document.body.appendChild(root)

new Vue({
    router,
    store,
    render: (h) => h(App),
    el:"#root"
})