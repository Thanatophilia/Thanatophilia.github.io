import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { formatDate } from '../src/utils/index.ts'

const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('the main interface and date formatting use simplified Chinese', () => {
  const expectations = {
    'src/pages/index.astro': ['>文章</h2>', '更多文章 →', '>技能</h2>'],
    'src/pages/blog/[...page].astro': ["isFirst ? '博客'", "title: '上一页'", "title: '下一页'"],
    'src/pages/archives/index.astro': ['title="归档"', "'zh-CN'"],
    'src/pages/tags/index.astro': ['title="标签"', '暂无标签'],
    'src/pages/links/index.astro': ['title="友链"', '申请'],
    'src/pages/404.astro': ['返回首页'],
    'src/utils/index.ts': ["locale = 'zh-CN'"],
    'src/components/Header.astro': ['aria-label="搜索"', 'title="切换配色"'],
    'src/components/PostCard.astro': ['阅读约 {minutesRead} 分钟']
  }
  for (const [path, strings] of Object.entries(expectations)) {
    const text = source(path)
    for (const value of strings) assert.ok(text.includes(value), `${path}: ${value}`)
  }
})

test('date formatting produces Chinese text with complete ICU locale data', () => {
  assert.deepEqual(Intl.DateTimeFormat.supportedLocalesOf(['zh-CN']), ['zh-CN'])
  assert.equal(formatDate(new Date(2026, 10, 22)), '2026年11月22日')
})

test('search, image, code and comment controls keep Chinese state labels', () => {
  const expectations = {
    'src/pages/search/index.astro': ['输入关键词开始搜索', '搜索索引加载失败', '正在加载搜索索引', '没有找到匹配的文章', '找到 ${hits.length} 篇文章'],
    'src/components/Lightbox.astro': ['图片预览', '关闭图片预览', '放大图片', '图片暂时无法显示'],
    'src/plugins/shiki-custom-transformers.ts': ["'aria-label': '复制代码'", "'aria-label': '展开或收起代码块'"],
    'src/assets/styles/global.css': ["content: '已复制！'", "content: '展开全部'"],
    'src/components/Comment.astro': ["lang: 'zh-CN'", "reaction0: '赞'"],
    'src/assets/styles/waline.css': ["content: '赞'"]
  }
  for (const [path, strings] of Object.entries(expectations)) {
    for (const value of strings) assert.ok(source(path).includes(value), `${path}: ${value}`)
  }
})

test('site metadata names the Chinese blog without changing its domain or avatar', () => {
  const manifest = JSON.parse(source('public/favicon/site.webmanifest'))
  assert.equal(manifest.name, '君子书')
  assert.equal(manifest.short_name, '君子书')
  assert.equal(manifest.lang, 'zh-CN')
  assert.ok(source('public/og-card.svg').includes('>君子书</text>'))
  assert.ok(source('src/site-config.ts').includes("avatar: '/avatar.webp'"))
  assert.ok(source('astro.config.ts').includes('https://thanatophilia.abc.sd'))
})
