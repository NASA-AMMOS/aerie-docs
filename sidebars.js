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
    {
      type: 'category',
      label: 'Mission Modeling',
      link: {
        id: 'mission-modeling/introduction',
        type: 'doc',
      },
      items: [
        {
          type: 'category',
          label: 'Activity Types',
          link: {
            id: 'mission-modeling/activity-types/introduction',
            type: 'doc',
          },
          items: ['mission-modeling/activity-types/parameters', 'mission-modeling/activity-types/effect-model'],
        },
        'mission-modeling/resources-and-models',
        'mission-modeling/configuration',
        'mission-modeling/advanced-parameters',
        'mission-modeling/advanced-value-schemas',
        'mission-modeling/advanced-activity-mappers',
        'mission-modeling/advanced-the-merlin-interface',
      ],
    },
    {
      type: 'category',
      label: 'Scheduling',
      link: {
        id: 'scheduling/introduction',
        type: 'doc',
      },
      items: [],
    },
  ],
  testReport: ['test-report/introduction'],
  upgradeGuides: ['upgrade-guides/1-0-0-to-1-0-1', 'upgrade-guides/0-13-2-to-1-0-0'],
};

module.exports = sidebars;
