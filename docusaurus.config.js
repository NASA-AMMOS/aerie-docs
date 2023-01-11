// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const isDev = process.env.NODE_ENV === 'development';

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
      algolia: {
        appId: '6JHHKJXI6J',
        apiKey: 'c63a6f050345f86d5ccbc967ad793257',
        indexName: 'aerie-documentation',
        replaceSearchResultPathname: isDev ? { from: /^\/docs\/next/g, to: '/docs' } : undefined,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      navbar: {
        items: [
          // Left.
          {
            docId: 'introduction',
            label: 'Docs',
            position: 'left',
            type: 'doc',
          },
          {
            label: 'Upgrade Guides',
            position: 'left',
            sidebarId: 'upgradeGuides',
            type: 'docSidebar',
          },
          // Right.
          // TODO: Uncomment to enable version dropdown.
          // {
          //   dropdownActiveClassDisabled: true,
          //   dropdownItemsAfter: [
          //     {
          //       type: 'html',
          //       value: '<hr class="dropdown-separator">',
          //     },
          //     {
          //       type: 'html',
          //       className: 'dropdown-archived-versions',
          //       value: '<b>Archived versions</b>',
          //     },
          //     {
          //       href: 'https://nasa-ammos.github.io/aerie-docs/1.0.0',
          //       label: '1.0.0',
          //     },
          //   ],
          //   position: 'right',
          //   type: 'docsVersionDropdown',
          // },
          {
            'aria-label': 'GitHub repository',
            className: 'header-github-link',
            href: 'https://github.com/NASA-AMMOS/aerie',
            position: 'right',
          },
        ],
        logo: {
          alt: 'Aerie Documentation',
          src: 'img/aerie-wordmark-light.svg',
          srcDark: 'img/aerie-wordmark-dark.svg',
          width: 130,
        },
      },
      prism: {
        additionalLanguages: ['graphql', 'java'],
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
      },
    }),
  title: 'Aerie Documentation',
  trailingSlash: true,
  url: 'https://nasa-ammos.github.io/',
};

module.exports = config;
