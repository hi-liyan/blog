// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Surcode',
  tagline: 'Never stop.',
  url: 'https://www.surcode.cn',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/头像.jpg',
  organizationName: 'liyan', // Usually your GitHub org/user name.
  projectName: 'shiguangping-blog', // Usually your repo name.
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn'],
  },

  plugins: [
    'docusaurus-plugin-sass',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // When applying `zh` in language, please install `nodejieba` in your project.
        language: ["en", "zh"],
        indexPages: false
      },
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarCollapsible: true, //默认折叠
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/hi-liyan/blog/blob/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/hi-liyan/blog/blob/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true
        }
      },
      announcementBar: {
        id: 'support_us',
        content: '⭐️ 欢迎访问我的博客，在此相遇是我们的缘分~',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      navbar: {
        title: 'Surcode',
        items: [
          {
            type: 'doc',
            docId: 'hello',
            position: 'left',
            label: '手记',
          },
          {to: '/blog', label: '博客', position: 'left'},
          {
            href: 'https://gitee.com/ennriaaa',
            label: '码云',
            position: 'right',
          },
          {
            href: 'https://github.com/hi-liyan',
            label: 'Github',
            position: 'right'
          }
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['dart', 'java', 'groovy', 'rust', 'kotlin'],
      },
      colorMode: {
        respectPrefersColorScheme: true
      },
      metadata: [{name: "keywords", content: "Java开发, Java学习, 编程, springboot, 李炎"}]
    }),
};

module.exports = config;
