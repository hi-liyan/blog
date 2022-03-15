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
    {
      type: 'category',
      label: 'Java',
      items: [
        'java/jdk-install',
        'java/javase',
        'java/java-classloader',
        'java/java-reflect',
        'java/java-proxy',
        'java/java-multi-thread',
        'java/java-synchronized',
        'java/java-threadlocal',
        'java/java-io',
        'java/java-nio',
        'java/java-stream',
        'java/java-lambda'
      ]
    },
    {
      type: 'category',
      label: 'Spring Framework',
      items: [
        'spring/create-ssm-proj',
        'spring/springboot-application-context-initializer',
        'spring/springboot-application-event-listener',
        'spring/springboot-auto-configuration',
        'spring/spring-xml-ioc',
        'spring/springboot-custom-starter',
        'spring/springboot-actuator',
        'spring/jsr303',
        'spring/springboot-global-exception-handle'
      ]
    },
    {
      type: 'category',
      label: '微服务',
      items: [
        'micro-service/spring-cloud-alibaba',
        'micro-service/nacos-services-register-and-discovery',
        'micro-service/nacos-configuration-center',
        'micro-service/ribbon',
        'micro-service/sentinel',
        'micro-service/dubbo-quick-start',
      ]
    },
    {
      type: "category",
      label: "中间件",
      items: [
        'middleware/redis-note',
        'middleware/distributed-lock',
        'middleware/rocketmq-quick-start',
        'middleware/elasticsearch-quick-start',
      ]
    },
    {
      type: "category",
      label: "数据库",
      items: [
        'database/transaction',
        'database/mybatis-plus-multi-tenant'
      ]
    },
    {
      type: "category",
      label: "设计模式",
      items: [
        'design-pattern/uml',
        'design-pattern/design-pattern'
      ]
    },
    {
      type: "category",
      label: "Golang",
      items: [
        'golang/golang-note'
      ]
    },
    // 前端
    {
      type: 'category',
      label: '前端开发',
      items: [
        {
          'HTML/CSS/JS': [
            'frontend/css-note',
            'frontend/flex-layout'
          ]
        },
        {
          React: [
            'frontend/react-note',
          ]
        },
        {
          Vue: [
            'frontend/vue-components-communication',
            'frontend/vue-responsive'
          ]
        },
        {
          Flutter: [
            'frontend/dart-lang-note',
            'frontend/flutter-note'
          ]
        }
      ]
    },

    // 其它
    {
      type: 'category',
      label: '其它',
      items: [
        {
          Docker: [
            'others/docker-doc',
            'others/docker-install',
            'others/harbor-install',
            'others/portainer-standalone',
          ]
        },
        'others/macos-arm-jdk',
        'others/macos-install-maven',
        'others/idea-view-openjdk-source-code',
        'others/java-learning-path',
        'others/java-learning-method',
        'others/git-memo',
        'others/frp-install',
        'others/github-ssh',
        'others/springboot-jenkins-cicd',
        'others/group-concat-max-length',
        'others/netlify',
        'others/spring-cross',
        'others/stored-procedure-oracle',
        'others/tcpip-birth-talk-talk',
        'others/redis-story',
        'others/redis-story-persistence',
        'others/session-cookie-jwt',
        'others/ssh-login',
        'others/vim',
      ]
    }
  ],

};
