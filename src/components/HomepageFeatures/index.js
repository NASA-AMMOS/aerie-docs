import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Extensible mission modeling and simulation',
    Svg: require('@site/static/img/aerie-feature-mission-modeling-light.svg').default,
    size: 'col--4',
    description: (
      <>
        Model your system with access to the entire Java ecosystem. Validate plans against your models using Aerie's
        discrete event simulator using the user interface or Aerie API.
      </>
    ),
  },
  {
    title: 'Seamless workflow from planning to commanding',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    size: 'col--8',
    description: (
      <>
        Build sequences and commands that execute on-board a spacecraft directly from activities in your plans. Author
        and refine sequences derived from your command dictionary.
      </>
    ),
  },
  {
    title: 'Real-time collaboration and versioning',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    size: 'col--8',
    description: (
      <>
        Create, modify, and test out plans together in real time from across the world. Or make branches, edit them
        asynchronously, and merge them together when you're ready.
      </>
    ),
  },
  {
    title: 'Low-code scheduling and rule checking',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    size: 'col--4',
    description: (
      <>
        Automate plan creation with prioritized scheduling goals. Author constraints, evaluate them against a simulation
        of your plan, and visualize violations on the plan timeline.
      </>
    ),
  },
];

function Feature({ Svg, title, description, size }) {
  return (
    <div className={clsx(`col ${styles.featureSection}`, size)}>
      <div className={styles.featureCard}>
        <div className="card__header">
          <h3>{title}</h3>
        </div>
        <div className="card__body">
          <p>{description}</p>

          <Svg className={styles.featureSvg} role="img" />
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
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
