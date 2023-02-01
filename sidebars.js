// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  api: [
    'api/introduction',
    {
      type: 'category',
      label: 'Examples',
      link: {
        type: 'doc',
        id: 'api/examples/introduction',
      },
      items: [
        {
          type: 'category',
          label: 'Planning',
          link: {
            type: 'doc',
            id: 'api/examples/planning/introduction',
          },
          items: ['api/examples/planning/collaboration'],
        },
        'api/examples/constraints',
        'api/examples/scheduling',
      ],
    },
  ],
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Overview',
      link: {
        type: 'generated-index',
      },
      items: ['overview/concept-of-operations', 'overview/software-design-document'],
    },
    {
      type: 'category',
      label: 'Deployment',
      link: {
        type: 'generated-index',
      },
      items: [
        'deployment/advanced-ui-custom-base-path',
        'deployment/advanced-kubernetes',
        {
          label: 'Environment Variables',
          type: 'link',
          href: 'https://github.com/NASA-AMMOS/aerie/blob/develop/deployment/Environment.md',
        },
      ],
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
      label: 'Planning',
      link: {
        type: 'generated-index',
      },
      items: [
        'planning/upload-mission-model',
        'planning/create-plan-and-simulate',
        'planning/external-datasets',
        'planning/activity-directive-metadata',
        {
          type: 'category',
          label: 'Collaboration',
          link: {
            id: 'planning/collaboration/introduction',
            type: 'doc',
          },
          items: ['planning/collaboration/merging-plans'],
        },
        'planning/ui-views',
      ],
    },
    {
      type: 'category',
      label: 'Constraints',
      link: {
        id: 'constraints/introduction',
        type: 'doc',
      },
      items: [
        'constraints/concepts',
        'constraints/examples',
        {
          label: 'EDSL Docs',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/constraints-edsl-api/',
        },
      ],
    },
    {
      type: 'category',
      label: 'Scheduling',
      link: {
        id: 'scheduling/introduction',
        type: 'doc',
      },
      items: [
        'scheduling/goals',
        'scheduling/run-scheduling',
        'scheduling/global-conditions',
        'scheduling/temporal-subset',
        {
          label: 'EDSL Docs',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/scheduling-edsl-api/modules/Scheduling_eDSL.html',
        },
      ],
    },
    {
      type: 'category',
      label: 'Command Expansion',
      link: {
        id: 'command-expansion/introduction',
        type: 'doc',
      },
      items: [
        'command-expansion/upload-command-dictionary',
        'command-expansion/expansion-rules',
        'command-expansion/expansion-sets',
        'command-expansion/sequences',
        'command-expansion/run-expansion',
      ],
    },
    {
      type: 'category',
      label: 'Sequencing',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          label: 'Seq JSON Schema',
          type: 'link',
          href: 'https://github.com/NASA-AMMOS/seq-json-schema',
        },
      ],
    },
    'glossary',
  ],
  upgradeGuides: ['upgrade-guides/1-0-1-to-1-0-2', 'upgrade-guides/1-0-0-to-1-0-1', 'upgrade-guides/0-13-2-to-1-0-0'],
};

module.exports = sidebars;
