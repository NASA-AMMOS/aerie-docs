import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { HomepageFeatures, HomepageGetStarted } from '@site/src/components/HomepageCards';
import HomepageTestimonials from '@site/src/components/HomepageTestimonials';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">A modern approach to planning, sequencing, and scheduling your space mission.</h1>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)}
            to="/aerie-docs/introduction/#fast-track"
          >
            Get started
          </Link>
          <div>
            Want to chat or schedule a demo? <Link className="button--secondary">Get in touch →</Link>
          </div>
        </div>
        <img
          className={styles.imgFullscreen}
          src={require('@site/static/img/aerie-ui-light.png').default}
          alt="Aerie UI"
        />
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <h2 className={styles.sectionHeader}>Features</h2>
        <HomepageFeatures />
        <HomepageTestimonials />
        <h2 className={styles.sectionHeader}>Get Started</h2>
        <HomepageGetStarted />
      </main>
    </Layout>
  );
}
