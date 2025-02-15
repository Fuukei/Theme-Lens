import type { ThemeConfig } from 'valaxy-theme-lens'
import { defineConfig } from 'valaxy'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineConfig<ThemeConfig>({
  theme: 'lens',

  themeConfig: {
    hero: {
      urls: [
        // 测试在线图片
        'https://w.wallhaven.cc/full/gp/wallhaven-gpokge.jpg',
        // 测试图床
        'https://api.maho.cc/asuhe-rand/index.php',
        // 测试视频
        'https://threejs.org/examples/textures/sintel.mp4',
      ],
      randomUrl: false,
    },
    // colors: {
    //   primary: 'red',
    // },

    nav: [
      {
        text: 'GitHub',
        link: 'https://github.com/YunYouJun/valaxy-theme-starter',
      },
      {
        text: 'RSS',
        link: 'https://starter.valaxy.site/atom.xml',
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/sGe4U4p4CK',
      },
      {
        text: 'Valaxy →',
        link: 'https://github.com/YunYouJun/valaxy',
      },
    ],

    footer: {
      since: 2016,
    },
  },
})
