import { createApp } from 'vue'
import './style/index.less'
import App from './App.vue'
import directives from './global/directives'

createApp(App).use(directives).mount('#app')
