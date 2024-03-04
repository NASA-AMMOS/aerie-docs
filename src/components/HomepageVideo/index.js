import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import PromoVideo from '@site/static/video/aerie-video-subtitles.mp4';
import PromoStill from '@site/static/video/aerie-video-still.png';

export function HomepageVideo() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={clsx(`row ${styles.videoSection}`)}>
          <video width="100%" height="auto" controls poster={PromoStill}>
            <source src={PromoVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
