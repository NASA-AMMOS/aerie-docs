import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const TestimonialList = [
  {
    name: 'First Last',
    title: 'Job Title, Mission Name',

    Img: require('@site/static/img/aerie-feature-planning-commanding-light.png').default,
    size: 'col--6',
    description: (
      <>
        Aerie supports multiple modes of collaboration that enable highly distributed planning and allow it to be
        tailored.
      </>
    ),
  },
  {
    name: 'First Last',
    title: 'Job Title, Mission Name',

    Img: require('@site/static/img/aerie-feature-planning-commanding-light.png').default,
    size: 'col--6',
    description: (
      <>
        Aerie supports multiple modes of collaboration that enable highly distributed planning and allow it to be
        tailored.
      </>
    ),
  },
];

function Testimonial({ name, title, description, Img }) {
  return (
    <div className={clsx(`col ${styles.featureSection}`)}>
      <div>
        <div className="card__header">
          <p>{description}</p>
        </div>
        <div className={clsx(`card__body ${styles.testimonialsFooter}`)}>
          {/* <img src={Img} className={styles.testimonialsImg} alt={name} /> */}
          <div className={styles.testimonialsFooterText}>
            <p className={styles.name}>{name}</p>
            <p className={styles.position}>{title}</p>
            {/* <img src={Img} className={styles.featureImg} alt={title} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageTestimonials() {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className="row">
          {TestimonialList.map((props, idx) => (
            <Testimonial key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
