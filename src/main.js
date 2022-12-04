import { createApp } from 'vue'
import router from '@/router'
import './style/index.less'
import App from './App.vue'
import directives from './global/directives'

createApp(App).use(router).use(directives).mount('#app')
