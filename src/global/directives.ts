import { App } from 'vue'
import lazyLoad from '@/utils/lazyLoad'

const directives = (app: App) => {
  const lazySrc = lazyLoad({
    lazyAttr: 'lazy'
  })

  app.directive('lazy', {
    beforeMount(el, binding) {
      el.setAttribute('lazy', binding.value) // 跟上面的对应
      lazySrc.observer.observe(el)
    },
    beforeUpdate(el, binding, vnode, prevVnode) {
      if (binding.value !== prevVnode) {
        el.setAttribute('lazy', binding.value)
        lazySrc.observer.observe(el)
      }
    }
  })
}

export default directives
