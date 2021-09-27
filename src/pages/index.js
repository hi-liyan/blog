import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import StringPrinter from "../components/StringPrinter";


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
      <StringPrinter/>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  console.log('欢迎访问我的博客，我的QQ是: 721748889，欢迎交流。')
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader/>
      {/*<main>*/}
      {/*  <HomepageFeatures />*/}
      {/*</main>*/}
    </Layout>
  );
}

