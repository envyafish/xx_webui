import {createRouter, createWebHistory} from 'vue-router'

import Course from '../page/Course.vue'
import Teacher from '../page/Teacher.vue'
import Rank from '../page/Rank.vue'
import Subscribe from '../page/Subscribe.vue'
import Home from '../page/Home.vue'
import Options from '../page/Options.vue'
import Index from '../page/Index.vue'


const routes = [
    {
        path: '/api/plugins/xx',
        component: Home,
        directives: '/api/plugins/xx/course',
        children: [
            {path: 'course', component: Course},
            {path: 'teacher', component: Teacher},
            {path: 'rank', component: Rank},
            {path: 'subscribe', component: Subscribe},
            {path: 'options', component: Options}
        ]
    },
    {
        path: '/api/plugins/xx/index',
        component: Index
    }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router