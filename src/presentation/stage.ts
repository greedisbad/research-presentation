import type { Slide } from './slides'

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] ?? char)

export function createStage(slides: Slide[], mode: 'full' | 'single'): void {
  const root = document.querySelector<HTMLDivElement>('#app')
  if (!root) throw new Error('Missing #app')
  root.innerHTML = `
    <div class="deck-viewport"><main class="deck-stage" id="deckStage">
      ${slides.map((slide, index) => `
        <section class="slide slide--${slide.layout ?? 'standard'}" id="slide-${slide.id}" aria-label="${escapeHtml(slide.title)}">
          <div class="paper-grain"></div>
          <div class="slide-topline"><span>AI / RESEARCH PRACTICE</span><span>${escapeHtml(slide.section)}</span><span>${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}</span></div>
          <div class="slide-content"><h1>${escapeHtml(slide.title)}</h1>${slide.html}</div>
          ${slide.demo ? `<div class="slide-demo">${mode === 'full'
            ? `<a href="${escapeHtml(slide.demo.path)}" target="_blank" rel="noopener">${escapeHtml(slide.demo.label)} <span aria-hidden="true">↗</span></a>`
            : '<span>单文件版未包含现场演示 · 静态画面可继续讲解</span>'}</div>` : ''}
          <div class="slide-footer"><span>找 · 读 · 试 · 验</span><span>${escapeHtml(slide.id)}</span></div>
        </section>`).join('')}
    </main></div>
    <nav class="deck-controls" aria-label="演讲导航">
      <button type="button" id="prev" aria-label="上一页">←</button>
      <span id="counter"></span>
      <button type="button" id="next" aria-label="下一页">→</button>
      <button type="button" id="contents" aria-label="目录">目录</button>
    </nav>
    <div class="progress" id="progress"></div>
    <div class="toc" id="toc" hidden></div>`

  const stage = document.querySelector<HTMLElement>('#deckStage')!
  const slideEls = [...document.querySelectorAll<HTMLElement>('.slide')]
  const counter = document.querySelector<HTMLElement>('#counter')!
  const progress = document.querySelector<HTMLElement>('#progress')!
  const toc = document.querySelector<HTMLElement>('#toc')!
  let current = 0

  const scale = () => {
    const factor = Math.min(innerWidth / 1920, innerHeight / 1080)
    stage.style.transform = `translate(${(innerWidth - 1920 * factor) / 2}px, ${(innerHeight - 1080 * factor) / 2}px) scale(${factor})`
  }
  const show = (index: number) => {
    current = Math.max(0, Math.min(index, slides.length - 1))
    slideEls.forEach((slide, i) => {
      slide.classList.toggle('active', i === current)
      slide.classList.toggle('visible', i === current)
      slide.setAttribute('aria-hidden', String(i !== current))
    })
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`
    progress.style.width = `${(current + 1) / slides.length * 100}%`
    location.hash = `p${current + 1}`
  }
  const toggleContents = () => { toc.hidden = !toc.hidden }
  toc.innerHTML = `<div class="toc-head"><strong>章节导航</strong><button type="button" id="toc-close" aria-label="关闭目录">×</button></div>${slides.map((slide, i) => `<button type="button" data-index="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${escapeHtml(slide.title)}</button>`).join('')}`
  toc.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (target.closest('#toc-close')) { toc.hidden = true; return }
    const button = target.closest<HTMLButtonElement>('[data-index]')
    if (button) { show(Number(button.dataset.index)); toc.hidden = true }
  })
  document.querySelector('#prev')!.addEventListener('click', () => show(current - 1))
  document.querySelector('#next')!.addEventListener('click', () => show(current + 1))
  document.querySelector('#contents')!.addEventListener('click', toggleContents)
  addEventListener('resize', scale)
  addEventListener('hashchange', () => {
    const page = Number(location.hash.match(/^#p(\d+)$/)?.[1] ?? 1)
    if (Number.isFinite(page) && page - 1 !== current) show(page - 1)
  })
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { toc.hidden = true; return }
    if (!toc.hidden) return
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); show(current + 1) }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); show(current - 1) }
    if (event.key === 'Home') show(0)
    if (event.key === 'End') show(slides.length - 1)
  })
  let touchX = 0
  addEventListener('touchstart', (event) => { touchX = event.touches[0].clientX }, { passive: true })
  addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - touchX
    if (Math.abs(delta) > 70) show(current + (delta < 0 ? 1 : -1))
  }, { passive: true })
  scale()
  const hashPage = Number(location.hash.match(/^#p(\d+)$/)?.[1] ?? 1)
  show(Number.isFinite(hashPage) ? hashPage - 1 : 0)
}
