import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
// @ts-ignore
import logo from '@site/static/img/头像.jpg';

import styles from './index.module.css';
import HomepageFeatures from "@site/src/components/HomepageFeatures";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
      <header className={clsx(styles.heroBanner)}>
        <div className="container">
          <img className="homepageLogo" src={logo} />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
                className="button button--secondary button--lg"
                to="/docs/hello">
              从这里开始 →
            </Link>
          </div>
        </div>
      </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  console.log('欢迎访问我的博客，我的QQ是: 721748889，欢迎交流。')
  return (
    <Layout
      title={siteConfig.title}
      description="李炎的博客。">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
