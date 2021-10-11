/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually

  tutorialSidebar: [
    {
      type: 'doc',
      id: 'hello',
      label: '你好'
    },

    // 后端
    {
      type: 'category',
      label: '后端开发 -Java开发',
      items: [
        'java/jdk-install',
        'java/javase-note',
        'java/java-reflect',
        'java/java-multi-thread',
        'java/java-io',
        'java/java-stream',
        'java/java-lambda',
        'java/springboot-application-context-initializer',
        'java/springboot-auto-configuration',
        'java/spring-xml-ioc',
        'java/jsr303',
        'java/redis-note',
        'java/rocketmq-quick-start',
        'java/dubbo-quick-start',
        'java/elasticsearch-quick-start',
        'java/spring-cloud-alibaba',
        'java/springboot-actuator',
        'java/services-register-and-discovery',
        'java/ribbon',
        'java/sentinel',
        'java/create-ssm-proj',
        'java/mybatis-plus-multi-tenant',
        'java/springboot-global-exception-handle',
        'java/springboot-custom-starter'
      ]
    },

    // 其它后端开发
    {
      type: 'category',
      label: '后端开发',
      items: [
        'backend/golang-note'
      ]
    },

    // 前端
    {
      type: 'category',
      label: '前端开发',
      items: [
        'frontend/css-note',
        'frontend/react-note',
        'frontend/vue-components-communication',
        'frontend/vue-responsive'
      ]
    },

    // Flutter
    {
      type: 'category',
      label: 'Flutter 开发',
      items: [
        'flutter/dart-lang-note',
        'flutter/flutter-note'
      ]
    },

    // 其它
    {
      type: 'category',
      label: '其它',
      items: [
        'skill/java-learning-path',
        'skill/java-learning-method',
        'skill/centos-install-docker',
        'skill/frp-install',
        'skill/github-ssh',
        'skill/springboot-jenkins-cicd',
        'skill/group-concat-max-length',
        'skill/harbor-install',
        'skill/netlify',
        'skill/spring-cross',
        'skill/stored-procedure-oracle',
        'skill/tcpip-birth-talk-talk',
        'skill/redis-story',
        'skill/redis-story-persistence',
        'skill/session-cookie-jwt',
        'skill/vim'
      ]
    },

    // 读书笔记
    {
      type: 'category',
      label: '读书笔记',
      items: [
        'reading/编程的原则：改善代码质量的101个方法',
        'reading/一切都是最好的安排'
      ]
    }
  ],

};
