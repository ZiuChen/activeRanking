import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import directives from './global/directives'
import '@/style/index.less'

createApp(App).use(router).use(directives).mount('#app')
