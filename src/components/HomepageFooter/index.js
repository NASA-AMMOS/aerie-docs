import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';

const Resources = [
  {
    url: 'www.example.com',
    label: 'Quick Start',
  },
];

export function HomepageFooter() {
  const { colorMode } = useColorMode();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <img className="logo" src={`./img/aerie-wordmark-${colorMode}.svg`} />
          <div>
            <h3>Resources</h3>
          </div>
          <div>
            <h3>Learn more</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
