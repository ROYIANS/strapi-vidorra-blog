export default function(container: HTMLElement, inner: HTMLElement) {
  container.addEventListener('wheel', (event) => {
    event.preventDefault()
    debugger
    container.scrollLeft += event.deltaY || 0
    const scrollLeft = container.scrollLeft
    const scrollRight = scrollLeft + container.offsetWidth
    const scrollWidth = container.scrollWidth
    if (inner) {
      if (scrollLeft > 3) {
        // 左侧阴影
        inner.classList.add('left-shadow')
      } else {
        // 去除左侧阴影
        inner.classList.remove('left-shadow')
      }
      if ((scrollWidth - scrollRight) > 3) {
        // 右侧阴影
        inner.classList.add('right-shadow')
      } else {
        // 去除右侧阴影
        inner.classList.remove('right-shadow')
      }
    }
  }, { passive: true })
}
