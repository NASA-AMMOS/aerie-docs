import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Seamless workflow from planning to commanding',
    // Svg: require('@site/static/img/aerie-feature-planning-commanding-light.svg').default,
    Img: require('@site/static/img/aerie-feature-planning-commanding-light.png').default,
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
    // Svg: require('@site/static/img/aerie-feature-mission-modeling-light.svg').default,
    Img: require('@site/static/img/aerie-feature-mission-modeling-light.png').default,
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
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/aerie-feature-collaboration-light.png').default,
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
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    Img: require('@site/static/img/aerie-feature-rule-checking-light.png').default,
    size: 'col--8',
    description: (
      <>
        Automate plan creation with prioritized scheduling goals. Author constraints, evaluate them against a simulation
        of your plan, and visualize violations on the plan timeline.
      </>
    ),
  },
];

function Feature({ Img, title, description, size }) {
  return (
    <div className={clsx(`col ${styles.featureSection}`, size)}>
      <div className={styles.featureCard}>
        <div className="card__header">
          <h3>{title}</h3>
        </div>
        <div className={clsx(`card__body ${styles.cardBody}`)}>
          <p>{description}</p>
          <img src={Img} className={styles.featureImg} alt={title} />
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
