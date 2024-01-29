import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// TODO update this to our actual promo video when it clears review
import PromoVideo from '@site/static/video/earth.mp4';


export function HomepageVideo() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={clsx(`row ${styles.videoSection}`)}>
          <video width="100%" height="auto" controls>
            <source src={PromoVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
