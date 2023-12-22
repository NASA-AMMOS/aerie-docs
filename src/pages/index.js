import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

import { HomepageFeatures, HomepageGetStarted, HomepageLearnMore } from '@site/src/components/HomepageCards';
import HomepageTestimonials from '@site/src/components/HomepageTestimonials';
import { HomepageMissionPartners, HomepageSponsors } from '@site/src/components/HomepageLogos';
import { HomepageVideo } from '@site/src/components/HomepageVideo';
import { HomepageFooter } from '../components/HomepageFooter';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.tagline}>Open source from NASA's Jet Propulsion Laboratory</div>
        <h1 className={clsx('hero__title', styles.heroTitle)}>
          Planning, sequencing, and scheduling tools for modern space missions.
        </h1>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)}
            to="/aerie-docs/introduction/#fast-track"
          >
            Get started
          </Link>
          <div>
            Want to chat or schedule a demo?{' '}
            <Link href="mailto:aerie-support@googlegroups.com" className="button--secondary">
              Get in touch →
            </Link>
          </div>
        </div>
        <img
          className={styles.imgFullscreen}
          src={require('@site/static/img/aerie-ui-light.png').default}
          alt="Aerie UI"
        />
        <HomepageMissionPartners />
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main className={styles.siteBackground}>
        {/* <HomepageVideo /> */}
        <h2 className={styles.sectionHeader}>Features</h2>
        <HomepageFeatures />
        <HomepageTestimonials />
        <h2 className={styles.sectionHeader}>Get Started</h2>
        <HomepageGetStarted />
        <h2 className={styles.sectionHeader}>Learn More</h2>
        <HomepageLearnMore />
        <HomepageSponsors />
        <HomepageFooter />
      </main>
    </Layout>
  );
}
