import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Quick and Simple</>,
    imageUrl: 'img/undraw_task_list_6x9d.svg',
    description: (
      <>
        We allow you to build fullstack apps on Ethereum via Matic Network, without learning protocol specifics. Our <a href='/docs'>docs</a> cater to every developer, all the way from beginners to those already building dapps via web3, and provide examples to build upon.
      </>
    ),
  },
  {
    title: <>Lightning Fast</>,
    imageUrl: 'img/undraw_data_processing_yrrv.svg',
    description: (
      <>
        Smart contracts are quickly deployed through our system and the resulting Open API spec along with webhook and websockets are instantly available to start testing.
      </>
    ),
  },
  {
    title: <>Seamless Integrations</>,
    imageUrl: 'img/undraw_push_notifications_im0o.svg',
    description: (
      <>
        Supercharge and extend your blockchain apps with our integration services over Websockets, Webhooks, Zapier, Slack, IFTTT. The possibilities are endless.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Home`}
      description="Build scalable blockchain apps using BlockVigil's developer friendly API gateway for Matic Network">
      <div className={clsx('hero hero--primary', styles.hero)}>
          <div className={styles.heroInner}>
            <h1 className={styles.heroProjectTagline}>
              <img
                alt="Docusaurus with Keytar"
                className={styles.heroLogo}
                src={useBaseUrl('img/undraw_programmer_imem.svg')}
              />
              Build and deploy{' '}
              <span className={styles.heroProjectKeywords}>scalable</span>{' '}
              blockchain apps{' '}
              <span className={styles.heroProjectKeywords}>rapidly</span>{' '}with{' '}
              <span className={styles.heroProjectKeywords}>MaticVigil</span>
            </h1>
            <div className={styles.indexCtas}>
              <Link
                className={styles.indexCtasGetStartedButton}
                to={useBaseUrl('docs/web_onboarding')}>
                Get Started
              </Link>

              <Link
                className={styles.indexCtasGitHubButton}
                to={useBaseUrl('docs/')}>
                Read More
              </Link>
            </div>
          </div>
        </div>
      <main>
      <iframe width="100%" height="480" src="https://www.youtube.com/embed/8XaM4E6_B-I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
