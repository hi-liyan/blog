import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StringPrinter from "../components/StringPrinter";
import Link from '@docusaurus/Link';
import Programmer from "../../static/img/programmer.svg";

import styles from './index.module.css';
import styled from "@emotion/styled";
import Button from "../components/Button";

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
        <Row>
          <div>
            <Programmer style={{width: '50vw',height: '50vh'}}>111</Programmer>
          </div>
          <Column>
            <div style={{marginBottom: '30px'}}>
              <Link to='/docs/hello'><Button>从这里开始.</Button></Link>
            </div>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            {/*<StringPrinter contents={contents}/>*/}
          </Column>
        </Row>
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
      <HomepageMain/>
      {/*<main>*/}
      {/*  <HomepageFeatures />*/}
      {/*</main>*/}
    </Layout>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50vh;
`;

