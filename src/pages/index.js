import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StringPrinter from "../components/StringPrinter";
import Link from '@docusaurus/Link';

import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const contents = [
    "Hi, Welcome to Shiguangping."
  ]
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Link to='/docs/hello'><h1 className="hero__title">{siteConfig.title}</h1></Link>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
      <StringPrinter contents={contents}/>
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

