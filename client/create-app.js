import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'

import 'muse-ui/lib/styles/base.less';
import 'muse-ui/lib/styles/theme.less';


import { List, Divider,AppBar, Button, Icon, Tabs, Grid, Card, Paper, Avatar, Breadcrumbs, TextField,snackbar,Pagination, Toast } from 'muse-ui'
import Helpers from 'muse-ui/lib/Helpers';
import 'typeface-roboto'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

Vue.use(AppBar)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(Grid)
Vue.use(Card)
Vue.use(List)
Vue.use(Helpers);
Vue.use(Paper)
Vue.use(Avatar)
Vue.use(Breadcrumbs)
Vue.use(TextField)
Vue.use(snackbar)
Vue.use(Pagination)
Vue.use(Divider)

export default () => {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store }

}