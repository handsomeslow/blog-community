import Vue from 'vue'
import Router from 'vue-router'
import topics from '../pages/topics/topics.vue'
import user from '../pages/user/user.vue'
import register from '../pages/register/register.vue'
import usertopics from '../pages/user/children/usertopics/usertopics.vue'
import message from '../pages/message/message.vue'
import news from '../pages/news/news.vue'

Vue.use(Router)

const routes = [
  {
    name: 'news',
    path: '/news/:title',
    component: news
  },
  {
    name: 'topics',
    path: '/topics/:title',
    component: topics
  },
  {
    name: 'user',
    path: '/user/:title',
    component: user,
    children: [
      {
        name: 'usertopics',
        path: 'usertopics/:title/:type',
        component: usertopics
      }
    ]
  },
  {
    name: 'register',
    path: '/register',
    component: register
  },
  {
    name: 'message',
    path: '/message/:title',
    component: message
  }
]

const router = new Router({
  routes
})

router.push({name: 'news', params: {title: '头条'}})

export default router