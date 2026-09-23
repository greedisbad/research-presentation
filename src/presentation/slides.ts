export interface Slide {
  id: string
  section: string
  title: string
  layout?: string
  html: string
  demo?: { label: string; path: string }
}

export const slides: Slide[] = [
  {
    id: 'opening',
    section: '开场',
    title: 'AI 过上了打工人梦想中的生活',
    layout: 'opening',
    html: '<p class="hero-line">搜索资料、判断证据，再把有用的东西留下来。</p>',
  },
]
