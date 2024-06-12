import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';

const links = [
  {
    category: 'Resources',
    label: 'Quick Start',
    href: '/aerie-docs/introduction/#fast-track',
    type: 'link',
  },
  {
    category: 'Resources',
    label: 'Documentation',
    href: '/aerie-docs/introduction/',
    type: 'link',
  },
  {
    category: 'Resources',
    label: 'Github',
    href: 'https://github.com/NASA-AMMOS/aerie',
    type: 'link',
  },
  {
    category: 'Learn more',
    label: 'NASA-AMMOS Slack',
    href: 'https://join.slack.com/t/nasa-ammos/shared_invite/zt-1mlgmk5c2-MgqVSyKzVRUWrXy87FNqPw',
    type: 'link',
  },
  {
    category: 'Learn more',
    label: 'Aerie Users Group',
    href: 'https://groups.google.com/u/3/g/aerie-users',
    type: 'link',
  },
  {
    category: 'Learn more',
    label: 'aerie-support@googlegroups.com',
    href: 'mailto:aerie-support@googlegroups.com',
    type: 'link',
  },
];

export function HomepageFooter() {
  const { colorMode } = useColorMode();
  // linksByCategory = groupByCategory(links);

  // console.log(linksByCategory);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <img className={styles.logo} src={`./img/aerie-wordmark-${colorMode}.svg`} />
            <ul className={styles.footerList}>
              <li>
                <span className={styles.footerLink}>AMMOS | Advanced Multi-Mission Operations System</span>
              </li>
              <li>
                <span className={styles.footerLink}>Multimission Ground System Services (MGSS)</span>
              </li>
            </ul>
          </div>

          <div className={styles.gridItem}>
            <h3 className={styles.footerHeader}>Resources</h3>
            <ul className={styles.footerList}>
              {links
                .filter(link => link.category === 'Resources')
                .map(link => (
                  <li key={link.label}>
                    <a className={styles.footerLink} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.gridItem}>
            <h3 className={styles.footerHeader}>Contact</h3>
            <ul className={styles.footerList}>
              {links
                .filter(link => link.category === 'Learn more')
                .map(link => (
                  <li key={link.label}>
                    <a className={styles.footerLink} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
