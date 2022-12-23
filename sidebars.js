// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: ['getting-started/installation', 'getting-started/configuration'],
    },
  ],
  testReport: ['test-report/introduction'],
  upgradeGuides: ['upgrade-guides/1-0-0-to-1-0-1', 'upgrade-guides/0-13-2-to-1-0-0'],
};

module.exports = sidebars;
