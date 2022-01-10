import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StringPrinter from "../components/StringPrinter";
import Link from '@docusaurus/Link';

import styles from './index.module.css';

const HomepageMain = () => {
  const {siteConfig} = useDocusaurusContext();
  // 首页自动打字效果文案
  const contents = [
    "Hi, Welcome to Shiguangping.",
    "请 把 我 流 放 到 最 美 的 时 光 里 。"
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
      description="李炎的博客。">
      <HomepageMain/>
      {/*<main>*/}
      {/*  <HomepageFeatures />*/}
      {/*</main>*/}
    </Layout>
  );
}

