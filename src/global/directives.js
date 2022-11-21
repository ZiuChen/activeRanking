import lazyLoad from '@/utils/lazyLoad'

const directives = (app) => {
  /** 添加一个加载`src`的指令 */
  const lazySrc = lazyLoad({
    lazyAttr: 'lazy'
  })

  app.directive('lazy', {
    beforeMount(el, binding) {
      el.setAttribute('lazy', binding.value) // 跟上面的对应
      lazySrc.observer.observe(el)
    },
    beforeUpdate(el, binding, vnode, prevVnode) {
      if (binding.value !== prevVnode.value) {
        el.setAttribute('lazy', binding.value)
        lazySrc.observer.observe(el)
      }
    }
  })
}

export default directives
