import Index from '../views/index/index.vue'
import All from '../views/index/all.vue'
import Ask from '../views/index/ask.vue'
import Dev from '../views/index/dev.vue'
import Good from '../views/index/good.vue'
import Job from '../views/index/job.vue'
import Share from '../views/index/share.vue'

import Topic from '../views/topic.vue'

import Login from '../views/login.vue'

export default [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index,
        redirect: '/index/all',
        children: [
            {
                path: 'all',
                component: All
            },
            {
                path: 'ask',
                component: Ask
            },
            {
                path: 'dev',
                component: Dev
            },
            {
                path: 'good',
                component: Good
            },
            {
                path: 'job',
                component: Job
            },
            {
                path: 'share',
                component: Share
               
            }
        ]
    },
    {
        path: '/topic/:id',
        component: Topic
    },
    {
        path: '/login',
        component: Login
    }
]