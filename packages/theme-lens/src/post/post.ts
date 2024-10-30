export interface Post {
  /**
   * Path of post
   * route.path
   * @description 路径
   */
  path: string
  /**
   * Title
   * @description 文章标题
   */
  title: string
  date: string | number | Date
  /**
   * Updated Time
   */
  updated: string | number | Date
  /**
   * i18n
   */
  lang: string
  /**
   * @description Author
   * @description:zh-CN 作者
   */
  author: string
  /**
   * Display sponsor info
   * @description 是否开启赞助
   */
  sponsor: boolean
  /**
   * Copyright
   * @description 是否显示文章底部版权信息
   */
  copyright: boolean
  image: string
  /**
   * cover
   * @description 封面图片
   */
  cover: string
  /**
   * display toc
   * @description 是否显示目录
   */
  toc: boolean
  /**
   * display right sidebar
   * @description 是否显示右侧侧边栏
   */
  aside: boolean
  /**
   * @description:en-US Custom Markdown class
   * @description:zh-CN 自定义 Markdown 样式
   * @default 'markdown-body'
   */
  markdownClass: string
  /**
   * @description:en-US Post title class
   * @description:zh-CN 文章标题样式
   */
  pageTitleClass: string
  /**
   * icon before title
   * @description 标题前的图标
   */
  icon: string
  /**
   * title color
   * @deprecated Please use `pageTitleClass` | `postTitleClass` instead
   */
  color: string
  /**
   * display comment
   */
  comment: boolean
  /**
   * post is end
   * @description 是否完结，将在末尾添加衬线字体 Q.E.D.
   */
  end: boolean
  /**
   * @description:en-US Limit the height of the code block in px
   * @description:zh-CN 限制代码块的高度，单位是 px
   */
  codeHeightLimit?: number
}
