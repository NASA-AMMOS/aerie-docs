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
          items: [
            'api/examples/planning/collaboration',
            'api/examples/planning/anchors',
            'api/examples/planning/snapshots',
          ],
        },
        'api/examples/simulation',
        'api/examples/constraints',
        'api/examples/scheduling',
        'api/examples/activity-presets',
        'api/examples/advanced-extensions',
        'api/examples/tags',
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
      label: 'Tutorials',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'category',
          label: 'Mission Modeling',
          link: {
            id: 'tutorials/mission-modeling/introduction',
            type: 'doc',
          },
          items: [
            'tutorials/mission-modeling/first-build',
            'tutorials/mission-modeling/first-resource',
            'tutorials/mission-modeling/first-activity',
            'tutorials/mission-modeling/first-model-test',
            'tutorials/mission-modeling/enum-derived-resource',
            'tutorials/mission-modeling/current-value',
            'tutorials/mission-modeling/second-look',
            'tutorials/mission-modeling/integrating-rate',
            'tutorials/mission-modeling/integration-comparison',
            'tutorials/mission-modeling/simulation-config',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      link: {
        id: 'deployment/introduction',
        type: 'doc',
      },
      items: [
        {
          label: 'Fast Track ⏱️',
          type: 'link',
          href: '/introduction/#fast-track',
        },
        'deployment/advanced-ui-custom-base-path',
        'deployment/advanced-kubernetes',
        'deployment/advanced-database-migrations',
        'deployment/advanced-authentication',
        'deployment/advanced-permissions',
        'deployment/advanced-reverse-proxy',
        'deployment/advanced-sso',
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
          items: [
            'mission-modeling/activity-types/parameters',
            'mission-modeling/activity-types/effect-model',
            'mission-modeling/activity-types/durations',
          ],
        },
        'mission-modeling/resources-and-models',
        'mission-modeling/configuration',
        'mission-modeling/parameters',
        'mission-modeling/activity-mappers',
        'mission-modeling/value-schemas',
        'mission-modeling/advanced-incons',
        'mission-modeling/advanced-the-merlin-interface',
        'mission-modeling/activity-types/durations',
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
        'planning/snapshots',
        'planning/anchors',
        'planning/ui-views',
        'planning/timeline-editing',
        'planning/timeline-controls',
        'planning/plan-import-export',
        'planning/advanced-incons',
        'planning/advanced-extensions',
        {
          type: 'category',
          label: 'Advanced - UI Plugins',
          link: {
            id: 'planning/plugins/introduction',
            type: 'doc',
          },
          items: ['planning/plugins/time'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Scheduling & Constraints',
      link: {
        id: 'scheduling-and-constraints/introduction',
        type: 'doc'
      },
      items: [
        'scheduling-and-constraints/management',
        {
          type: 'category',
          label: 'Procedural',
          link: {
            id: 'scheduling-and-constraints/procedural/introduction',
            type: 'doc'
          },
          items: [
            'scheduling-and-constraints/procedural/getting-started',
            {
              type: 'category',
              label: 'Timelines',
              link: {
                id: 'scheduling-and-constraints/procedural/timelines/introduction',
                type: 'doc'
              },
              items: [
                {
                  type: 'category',
                  label: "Basics",
                  link: {
                    id: 'scheduling-and-constraints/procedural/timelines/basics/introduction',
                    type: 'doc'
                  },
                  items: [
                    'scheduling-and-constraints/procedural/timelines/basics/profiles',
                    'scheduling-and-constraints/procedural/timelines/basics/sampling-and-caching',
                    'scheduling-and-constraints/procedural/timelines/basics/activities',
                    'scheduling-and-constraints/procedural/timelines/basics/windows',
                    'scheduling-and-constraints/procedural/timelines/basics/common-operations'
                  ]
                },
                {
                  type: 'category',
                  label: "Advanced",
                  link: {
                    id: 'scheduling-and-constraints/procedural/timelines/advanced/introduction',
                    type: 'doc'
                  },
                  items: [
                    'scheduling-and-constraints/procedural/timelines/advanced/parallel-profiles',
                    'scheduling-and-constraints/procedural/timelines/advanced/custom-operations',
                    'scheduling-and-constraints/procedural/timelines/advanced/custom-timelines'

                  ]
                }
              ]
            },
            'scheduling-and-constraints/procedural/plan-and-sim-results',
            'scheduling-and-constraints/procedural/constraints',
            'scheduling-and-constraints/procedural/scheduling',
            'scheduling-and-constraints/procedural/parameters-and-invocations',
            'scheduling-and-constraints/procedural/running-externally'
          ]
        },
        {
          type: 'category',
          label: 'Declarative',
          link: {
            id: 'scheduling-and-constraints/declarative/introduction',
            type: 'doc'
          },
          items: [
            {
              type: 'category',
              label: 'Constraints',
              link: {
                id: 'scheduling-and-constraints/declarative/constraints/introduction',
                type: 'doc',
              },
              items: [
                'scheduling-and-constraints/declarative/constraints/concepts',
                'scheduling-and-constraints/declarative/constraints/examples',
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
                id: 'scheduling-and-constraints/declarative/scheduling/introduction',
                type: 'doc',
              },
              items: [
                'scheduling-and-constraints/declarative/scheduling/goals',
                'scheduling-and-constraints/declarative/scheduling/global-conditions',
                'scheduling-and-constraints/declarative/scheduling/modelling-temporal-relations',
                'scheduling-and-constraints/declarative/scheduling/temporal-subset',
                {
                  label: 'EDSL Docs',
                  type: 'link',
                  href: 'https://nasa-ammos.github.io/aerie/scheduling-edsl-api/modules/Scheduling_eDSL.html',
                },
              ],
            },
          ]
        },
        'scheduling-and-constraints/execution'
      ]
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
        'sequencing/editor',
        'sequencing/adaptation',
        {
          label: 'Seq JSON Schema',
          type: 'link',
          href: 'https://github.com/NASA-AMMOS/seq-json-schema',
        },
      ],
    },
    {
      type: 'category',
      label: 'Java Docs',
      link: {
        id: 'java-docs/introduction',
        type: 'doc',
      },
      items: [
        {
          label: 'Constraints eDSL Backend',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/constraints/',
        },
        {
          label: 'Contrib',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/contrib/',
        },
        {
          label: 'Examples - Banananation',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/examples/banananation/',
        },
        {
          label: 'Examples - Config With Defaults',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/examples/config-with-defaults/',
        },
        {
          label: 'Examples - Config Without Defaults',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/examples/config-without-defaults/',
        },
        {
          label: 'Examples - Foo Mission Model',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/examples/foo-missionmodel/',
        },
        {
          label: 'Merlin Driver',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/merlin-driver/',
        },
        {
          label: 'Merlin Framework',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/merlin-framework/',
        },
        {
          label: 'Merlin Framework JUnit',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/merlin-framework-junit/',
        },
        {
          label: 'Merlin Framework Processor',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/merlin-framework-processor/',
        },
        {
          label: 'Merlin SDK',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/merlin-sdk/',
        },
        {
          label: 'Merlin Server',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/merlin-server/',
        },
        {
          label: 'Merlin Worker',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/merlin-worker/',
        },
        {
          label: 'Parsing Utilities',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/parsing-utilities/',
        },
        {
          label: 'Procedural APIs',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/procedural-apis',
        },
        {
          label: 'Scheduler Driver',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/scheduler-driver/',
        },
        {
          label: 'Scheduler Server',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/scheduler-server/',
        },
        {
          label: 'Scheduler Worker',
          type: 'link',
          href: 'https://nasa-ammos.github.io/aerie/javadoc/scheduler-worker/',
        },
      ],
    },
    'glossary',
    {
      label: 'Keyboard Shortcuts',
      type: 'doc',
      id: 'keyboard-shortcuts',
    },
  ],
  upgradeGuides: [
    'upgrade-guides/2-17-0-to-2-18-0',
    'upgrade-guides/2-16-0-to-2-17-0',
    'upgrade-guides/2-15-0-to-2-16-0',
    'upgrade-guides/2-14-0-to-2-15-0',
    'upgrade-guides/2-13-0-to-2-14-0',
    'upgrade-guides/2-11-0-to-2-11-1',
    'upgrade-guides/2-12-0-to-2-13-0',
    'upgrade-guides/2-11-0-to-2-12-0',
    'upgrade-guides/2-10-0-to-2-11-0',
    'upgrade-guides/2-9-0-to-2-10-0',
    'upgrade-guides/2-8-0-to-2-9-0',
    'upgrade-guides/2-7-1-to-2-8-0',
    'upgrade-guides/2-7-0-to-2-7-1',
    'upgrade-guides/2-6-2-to-2-7-0',
    'upgrade-guides/2-6-1-to-2-6-2',
    'upgrade-guides/2-6-0-to-2-6-1',
    'upgrade-guides/2-5-0-to-2-6-0',
    'upgrade-guides/2-4-0-to-2-5-0',
    'upgrade-guides/2-3-0-to-2-4-0',
    'upgrade-guides/2-2-0-to-2-3-0',
    'upgrade-guides/2-1-0-to-2-2-0',
    'upgrade-guides/2-0-0-to-2-1-0',
    'upgrade-guides/1-14-0-to-2-0-0',
    'upgrade-guides/1-13-0-to-1-14-0',
    'upgrade-guides/1-12-0-to-1-13-0',
    'upgrade-guides/1-11-0-to-1-12-0',
    'upgrade-guides/1-10-0-to-1-11-0',
    'upgrade-guides/1-9-0-to-1-10-0',
    'upgrade-guides/1-8-0-to-1-9-0',
    'upgrade-guides/1-7-0-to-1-8-0',
    'upgrade-guides/1-6-0-to-1-7-0',
    'upgrade-guides/1-5-0-to-1-6-0',
    'upgrade-guides/1-4-0-to-1-5-0',
    'upgrade-guides/1-3-0-to-1-4-0',
    'upgrade-guides/1-2-0-to-1-3-0',
    'upgrade-guides/1-1-0-to-1-2-0',
    'upgrade-guides/1-0-2-to-1-1-0',
    'upgrade-guides/1-0-1-to-1-0-2',
    'upgrade-guides/1-0-0-to-1-0-1',
    'upgrade-guides/0-13-2-to-1-0-0',
  ],
};

module.exports = sidebars;
