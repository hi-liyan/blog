import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import styled from "@emotion/styled";
import Footer from "@site/src/components/Footer";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FeatureList = [
    {
        title: 'Docs',
        // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                <Column>
                    <div><a href="/docs/hello">手记</a></div>
                    <div><a href="/blog">博客</a></div>
                </Column>
            </>
        ),
    },
    {
        title: 'Community',
        // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                <Column>
                    <div><a href="https://gitee.com/ennriaaa">Gitee</a></div>
                    <div><a href="https://www.zhihu.com/people/shiguangping">知乎</a></div>
                </Column>
            </>
        ),
    },
    {
        title: 'More',
        // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                <Column>
                    <div><a href="/about">About Me</a></div>
                    <div><a href="https://www.docusaurus.cn/">docusaurus</a></div>
                    <div><a href="https://infima.dev/">infima</a></div>
                    <div><a href="https://rebassjs.org/">rebassjs</a></div>
                </Column>
            </>
        ),
    },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/*<Svg className={styles.featureSvg} alt={title} />*/}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
          <Footer />
      </div>
    </section>
  );
}
