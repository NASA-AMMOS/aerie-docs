import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';

function getImage(theme, imageName) {
  return require(`@site/static/img/cards/${imageName}-${theme}.png`).default;
}

const FeatureList = [
  {
    title: 'Seamless workflow from planning to commanding',
    // Svg: require('@site/static/img/aerie-feature-planning-commanding-light.svg').default,
    Img: require('@site/static/img/cards/aerie-feature-planning-commanding-light.png').default,
    size: 'col--8',
    description: (
      <>
        Build sequences and commands that execute on-board a spacecraft directly from activities in your plans. Author
        and refine sequences derived from your command dictionary.
      </>
    ),
  },
  {
    title: 'Extensible mission modeling and simulation',
    // Svg: require('@site/static/img/cards/aerie-feature-mission-modeling-light.svg').default,
    Img: require('@site/static/img/cards/aerie-feature-mission-modeling-light.png').default,
    size: 'col--4',
    description: (
      <>
        Model your system with access to the entire Java ecosystem. Validate plans against your models using Aerie's
        discrete event simulator using the user interface or Aerie API.
      </>
    ),
  },
  {
    title: 'Real-time collaboration and versioning',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-feature-collaboration-light.png').default,
    size: 'col--4',
    description: (
      <>
        Create, modify, and test out plans together in real time from across the world. Or make branches, edit them
        asynchronously, and merge them together when you're ready.
      </>
    ),
  },
  {
    title: 'Low-code scheduling and rule checking',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-feature-rule-checking-light.png').default,
    size: 'col--8',
    description: (
      <>
        Automate plan creation with prioritized scheduling goals. Author constraints, evaluate them against a simulation
        of your plan, and visualize violations on the plan timeline.
      </>
    ),
  },
];

const GetStartedList = [
  {
    title: 'For Mission Planners',
    Img: require('@site/static/img/cards/aerie-getstarted-mission-planners-light.png').default,
    size: 'col--4',
    link: '/aerie-docs/category/planning/',
    linkTitle: 'Planning docs',
    description: (
      <>
        Create a viable plan that meets mission objectives while adhering to all constraints throughout the project
        lifecycle.
      </>
    ),
  },
  {
    title: 'For Systems Engineers',
    Img: require('@site/static/img/cards/aerie-getstarted-systems-engineers-light.png').default,
    size: 'col--4',
    link: '/aerie-docs/category/planning/',
    linkTitle: 'Planning docs',
    description: <>Analyze and inform spacecraft design and architecture during development.</>,
  },
  {
    title: 'For Spacecraft Operators',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-getstarted-spacecraftops-light.png').default,
    size: 'col--4',
    link: '/aerie-docs/category/planning/',
    linkTitle: 'Planning docs',
    description: (
      <>
        Build and collaboratively iterate on an integrated plan and set of commands that meets plan goals and
        constraints.
      </>
    ),
  },
  {
    title: 'Open source and zero cost',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-getstarted-opensource-light.png').default,
    size: 'col--4',
    link: 'https://opensource.org/license/mit/',
    linkTitle: 'MIT License',
    description: (
      <>Community driven flexible workspace designed to support flagship missions to exploratory proposals.</>
    ),
  },
  {
    title: 'Quick set up and customization',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-getstarted-customize-light.png').default,
    size: 'col--8',
    link: '/aerie-docs/introduction/#fast-track',
    linkTitle: 'Aerie quick start',
    description: (
      <>
        Aerie was designed from the ground up to be easily installed and used to get your mission up and running
        quickly. Aerie lets you focus on your mission, and we'll do the chores.
      </>
    ),
  },
];

const LearnMoreList = [
  {
    title: 'Ask a question on Slack',
    Img: require('@site/static/img/cards/aerie-learn-slack.png').default,
    size: 'col--4',
    link: '/aerie-docs/category/planning/',
    linkTitle: 'Planning docs',
    description: (
      <>Say hi or get help by joining our Slack conversations or posting a question in our GitHub discussions.</>
    ),
  },
  {
    title: 'Discuss or contribute on Github',
    Img: require('@site/static/img/cards/aerie-learn-github.png').default,
    size: 'col--4',
    link: '/aerie-docs/category/planning/',
    linkTitle: 'Planning docs',
    description: (
      <>Post a question in GitHub discussions, or contribute back and help make Aerie even better than it is today.</>
    ),
  },
  {
    title: 'Sign up for news and updates',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-learn-googlegroup.png').default,
    size: 'col--4',
    link: '/aerie-docs/category/planning/',
    linkTitle: 'Planning docs',
    description: <>Stay up-to-date on the latest news and releases by joining the Aerie Users Google Group.</>,
  },
  {
    title: 'Dive into the docs',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-getstarted-opensource-light.png').default,
    size: 'col--4',
    link: 'https://opensource.org/license/mit/',
    linkTitle: 'MIT License',
    description: <>See the details of how different components work in Aerie.</>,
  },
  {
    title: 'Explore a universe of extensions',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-learn-extensions.png').default,
    size: 'col--4',
    link: '/aerie-docs/introduction/#fast-track',
    linkTitle: 'Coming soon',
    description: (
      <>
        Project and community members have begun to build a marketplace of extensions you can use to jump start your
        modeling and ground system integration efforts.
      </>
    ),
  },
  {
    title: 'Something else?',
    // Svg: require('@site/static/img/cards/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/cards/aerie-getstarted-customize-light.png').default,
    size: 'col--4',
    link: 'support@aerie.ammos.nasa.gov',
    linkTitle: 'support@aerie.ammos.nasa.gov',
    description: <>...</>,
  },
];

function Feature({ Img, title, description, size, link, linkTitle }) {
  const { colorMode, setColorMode } = useColorMode();

  console.log(colorMode);

  return (
    <div className={clsx(`col ${styles.featureSection}`, size)}>
      <div className={styles.card}>
        <div className="card__header">
          <h3>{title}</h3>
        </div>
        <div className={clsx(`card__body ${styles.cardBody}`)}>
          <div className={styles.cardDescription}>
            <p>{description}</p>
          </div>
          <img src={Img} className={styles.cardImg} alt={title} />
          {link && (
            <div className={styles.cardFooter}>
              <a href={link}>
                {linkTitle}
                <span className={styles.linkArrow}>→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HomepageFeatures() {
  return (
    <section className={styles.cardSection}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomepageGetStarted() {
  return (
    <section className={styles.cardSection}>
      <div className="container">
        <div className="row">
          {GetStartedList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomepageLearnMore() {
  return (
    <section className={styles.cardSection}>
      <div className="container">
        <div className="row">
          {LearnMoreList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
