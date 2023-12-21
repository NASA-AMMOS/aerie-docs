import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';

const MissionPartners = [
  {
    name: 'Europa Clipper',
    Img: require('@site/static/img/missions/europa-logo-light.png').default,
    ImgDark: require('@site/static/img/missions/europa-logo-dark.png').default,
    size: 'col--6',
  },
  {
    name: 'Mars Sample Return',
    Img: require('@site/static/img/missions/msr-light.png').default,
    ImgDark: require('@site/static/img/missions/msr-dark.png').default,
    size: 'col--6',
  },
];

function Logo({ name, Img, ImgDark }) {
  const { colorMode } = useColorMode();

  return (
    <div className={clsx(`col ${styles.section}`)}>
      <img src={colorMode === 'light' ? Img : ImgDark} className={styles.featureImg} alt={`${name} logo`} />
    </div>
  );
}

export function HomepageMissionPartners() {
  return (
    <section className={styles.section}>
      <div>
        <div className={clsx(`${styles.logoSection}`)}>
          <h3 className={styles.sectionHeader}>Trusted by NASA mission partners</h3>
          {MissionPartners.map((props, idx) => (
            <Logo key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomepageSponsors() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={clsx(`${styles.logoSection}`)}>
          <h3 className={styles.sectionHeader}>Thank you to our sponsors</h3>
          {MissionPartners.map((props, idx) => (
            <Logo key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
