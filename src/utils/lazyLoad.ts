export interface LazyLoadParams {
  lazyAttr?: string // 自定义加载的属性名
  loadType?: 'src' | 'background' // 加载的类型
  errorPath?: string // 加载失败时显示的资源路径 (仅在loadType为src时可用)
}

export default function lazyLoad(params: LazyLoadParams) {
  const attr = params?.lazyAttr || 'lazy'
  const type = params?.loadType || 'src'

  /** 更新整个文档的懒加载节点 */
  function update() {
    const els = document.querySelectorAll(`[${attr}]`)
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      observer.observe(el)
    }
  }

  /**
   * 加载图片
   */
  function loadImage(el: HTMLImageElement) {
    const cache = el.src // 缓存当前`src`加载失败时候用
    el.src = el.getAttribute(attr)!
    el.onerror = function () {
      el.src = params.errorPath || cache
    }
  }

  /**
   * 加载单个节点
   */
  function loadElement(el: HTMLImageElement) {
    switch (type) {
      case 'src':
        loadImage(el)
        break
      case 'background':
        el.style.backgroundImage = `url(${el.getAttribute(attr)})`
        break
    }
    el.removeAttribute(attr)
    observer.unobserve(el)
  }

  const observer = new IntersectionObserver(function (entries) {
    for (let i = 0; i < entries.length; i++) {
      const item = entries[i]
      if (item.isIntersecting) {
        loadElement(item.target as HTMLImageElement)
      }
    }
  })

  update()

  return { observer, update }
}
