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
};

module.exports = sidebars;
