// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: '/aerie-docs',
  favicon: 'img/favicon.ico',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'NASA-AMMOS',
  projectName: 'aerie-docs',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          editUrl: 'https://github.com/NASA-AMMOS/aerie-docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  tagline: 'A software framework for modeling spacecraft.',
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      navbar: {
        items: [
          {
            docId: 'introduction',
            label: 'Docs',
            position: 'left',
            type: 'doc',
          },
          {
            label: 'Test Report',
            position: 'left',
            sidebarId: 'testReport',
            type: 'docSidebar',
          },
          {
            'aria-label': 'GitHub repository',
            className: 'header-github-link',
            href: 'https://github.com/NASA-AMMOS/aerie',
            position: 'right',
          },
        ],
        logo: {
          alt: 'Aerie',
          src: 'img/aerie-wordmark-light.svg',
          srcDark: 'img/aerie-wordmark-dark.svg',
          width: 130,
        },
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
      },
    }),
  title: 'Aerie Documentation',
  url: 'https://nasa-ammos.github.io/',
};

module.exports = config;
