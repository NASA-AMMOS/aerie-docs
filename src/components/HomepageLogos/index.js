import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const MissionPartners = [
  {
    name: 'Europa Clipper',
    Img: require('@site/static/img/missions/mission-europa-clipper-light.png').default,
    size: 'col--6',
  },
  {
    name: 'Mars Sample Return',

    Img: require('@site/static/img/missions/mission-msr-light.png').default,
    size: 'col--6',
  },
];

function Logo({ name, Img }) {
  return (
    <div className={clsx(`col ${styles.section}`)}>
      <img src={Img} className={styles.featureImg} alt={`${name} logo`} />
    </div>
  );
}

export function HomepageMissionPartners() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={clsx(`row ${styles.logoSection}`)}>
          <h3 className={styles.sectionHeader}>Trusted by NASA mission partners</h3>
          {MissionPartners.map((props, idx) => (
            <Logo key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
