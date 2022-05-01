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
      label: 'JavaSE',
      items: [
        {
          '1. 搭建开发环境': [
            'JavaSE/开发环境安装',
            'JavaSE/集成开发环境',
            'JavaSE/helloworld'
          ]
        },
        'JavaSE/Java注释的格式',
        'JavaSE/Java中的关键字',
        'JavaSE/Java中的标识符',
        {
          '5. 变量': [
            'JavaSE/变量',
            'JavaSE/创建变量',
            'JavaSE/使用变量',
            'JavaSE/变量的作用域',
            'JavaSE/变量的初始值',
            'JavaSE/变量的分类',
          ]
        },
        'JavaSE/常量',
        {
          '7. 数据类型': [
            'JavaSE/数据类型',
            'JavaSE/数据类型转换',
            'JavaSE/关于byte b+=1和b=b+1的问题'
          ]
        },
        'JavaSE/进制',
        'JavaSE/运算符',
        {
          '10. 流程控制': [
            'JavaSE/顺序结构',
            'JavaSE/条件语句',
            'JavaSE/循环语句',
            'JavaSE/算n以内的质数',
          ]
        },
        {
          '11. 数组': [
            'JavaSE/数组',
            'JavaSE/一维数组的应用',
            'JavaSE/增强型for循环',
            'JavaSE/冒泡排序',
            'JavaSE/二维数组',
          ]
        },
        'JavaSE/Java方法',
        {
          '13. 面向对象': [
            'JavaSE/Java面向对象',
            'JavaSE/构造方法',
            'JavaSE/Java封装',
            'JavaSE/static关键字',
            'JavaSE/Java继承',
            'JavaSE/final关键字',
            'JavaSE/单例模式',
            'JavaSE/Java多态',
            'JavaSE/instanceof关键字',
            'JavaSE/Java抽象类',
            'JavaSE/Java接口',
            'JavaSE/Java内部类',
            'JavaSE/static关键字和final关键字小结',
            'JavaSE/Java中的访问修饰符',
          ]
        },
        {
          '14. Java异常处理': [
            'JavaSE/Java异常处理',
            'JavaSE/try-catch-finally',
            'JavaSE/throws抛出异常',
            'JavaSE/throw抛出异常',
            'JavaSE/自定义异常',
            'JavaSE/异常类',
          ]
        },
        'JavaSE/Java包装类',
        {
          '16. Java字符串': [
            'JavaSE/Java字符串',
            'JavaSE/StringBuilder',
          ]
        },
        {
          '17. Java集合框架': [
            'JavaSE/Java集合框架',
            'JavaSE/List集合',
            'JavaSE/Set集合',
            'JavaSE/Map集合'
          ]
        },
        'JavaSE/Java泛型',
        'JavaSE/Java多线程',
        'JavaSE/java-io',
        {
          '21. Java反射和注解': [
            'JavaSE/Java反射',
            'JavaSE/Java反射常用API',
            'JavaSE/Java类加载器',
            'JavaSE/Java注解',
            'JavaSE/Java元注解',
            'JavaSE/自定义注解',
          ]
        },
        'JavaSE/javase',
        'JavaSE/java-proxy',
        'JavaSE/java-synchronized',
        'JavaSE/java-threadlocal',
        'JavaSE/java-nio',
        'JavaSE/java-stream',
        'JavaSE/java-lambda'
      ]
    },
    {
      type: 'category',
      label: 'JavaEE',
      items: [
        'JavaEE/tomcat',
        'JavaEE/Servlet',
        'JavaEE/使用STS创建Web项目',
        'JavaEE/HTTP协议',
        'JavaEE/Request',
        'JavaEE/Response',
        {
          '会话技术': [
            'JavaEE/会话技术',
            'JavaEE/Cookie',
            'JavaEE/Session',
          ]
        },
        {
          'JSP': [
            'JavaEE/JSP',
            'JavaEE/MVC',
            'JavaEE/EL表达式',
            'JavaEE/JSTL',
          ]
        },
        'JavaEE/Filter',
        'JavaEE/Listener'
      ]
    },
    {
      type: 'category',
      label: '常用框架',
      items: [
        {
          'Mybatis': [
            'Framework/Mybatis/Mybatis框架',
            'Framework/Mybatis/第一个Mybatis程序',
            'Framework/Mybatis/Mybatis增删改查',
            'Framework/Mybatis/Map和模糊查询',
            'Framework/Mybatis/配置之属性优化',
            'Framework/Mybatis/配置之别名优化',
            'Framework/Mybatis/配置之映射器',
            'Framework/Mybatis/生命周期和作用域',
            'Framework/Mybatis/结果集映射',
            'Framework/Mybatis/日志工厂',
            'Framework/Mybatis/log4j',
            'Framework/Mybatis/Limit实现分页',
            'Framework/Mybatis/RowBounds分页',
            'Framework/Mybatis/使用注解开发',
            'Framework/Mybatis/Mybatis执行流程剖析',
            'Framework/Mybatis/使用注解增删改查',
            'Framework/Mybatis/动态SQL的使用',
            'Framework/Mybatis/一对一查询',
            'Framework/Mybatis/一对多查询',
            'Framework/Mybatis/多对多查询',
          ]
        },
        {
          'Spring': [
            'Framework/Spring/Spring',
            'Framework/Spring/IoC理论推导',
            'Framework/Spring/HelloSpring',
            'Framework/Spring/IoC创建对象的方式',
            'Framework/Spring/spring-xml-ioc',
            'Framework/Spring/Spring配置',
            'Framework/Spring/依赖注入',
            'Framework/Spring/Bean的作用域',
            'Framework/Spring/Bean的自动装配',
            'Framework/Spring/Spring注解开发',
            'Framework/Spring/使用JavaConfig实现配置',
            'Framework/Spring/spring-test',
            'Framework/Spring/静态代理',
            'Framework/Spring/动态代理',
            'Framework/Spring/AOP实现方式',
            'Framework/Spring/AOP实现方式二',
            'Framework/Spring/注解实现AOP',
            'Framework/Spring/整合Mybatis',
            'Framework/Spring/Spring声明式事务',
            'Framework/Spring/create-ssm-proj',
          ]
        },
        {
          'SpringMVC': [
            'Framework/SpringMVC/SpringMVC',
            'Framework/SpringMVC/SpringMVC执行流程',
            'Framework/SpringMVC/Controller控制器',
            'Framework/SpringMVC/RequestMapping',
            'Framework/SpringMVC/RestFul风格',
            'Framework/SpringMVC/重定向和转发',
            'Framework/SpringMVC/接收请求参数及数据回显',
            'Framework/SpringMVC/整合MyBatis',
            'Framework/SpringMVC/整合Spring',
            'Framework/SpringMVC/整合SpringMVC',
            'Framework/SpringMVC/SpringMVC的编码过滤器',
            'Framework/SpringMVC/拦截器',
            'Framework/SpringMVC/拦截器实现登录验证',
            'Framework/SpringMVC/文件上传和下载',
            'Framework/SpringMVC/扩展：Spring中使用thymeleaf',
            'Framework/SpringMVC/扩展：SSM整合SpringSecurity-环境搭建',
            'Framework/SpringMVC/扩展：SSM整合SpringSecurity-开始整合',
            'Framework/SpringMVC/扩展：Shiro基础',
            'Framework/SpringMVC/扩展：JavaConfig配置Bean',
            'Framework/SpringMVC/扩展：Shiro中的注解',
            'Framework/SpringMVC/扩展：Thymeleaf整合Shiro',
          ]
        },
        {
          'SpringBoot': [
            'Framework/SpringBoot/springboot-application-context-initializer',
            'Framework/SpringBoot/springboot-application-event-listener',
            'Framework/SpringBoot/springboot-auto-configuration',
            'Framework/SpringBoot/springboot-custom-starter',
            'Framework/SpringBoot/springboot-actuator',
            'Framework/SpringBoot/springboot-global-exception-handle',
            'Framework/SpringBoot/jsr303',
          ]
        }
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
        'database/JDBC',
        'database/数据库连接池',
        'database/SpringJDBC',
        'database/DBUtils',
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

    // Rust
    {
      type: 'category',
      label: 'Rust',
      items: [
        'rust/rust-note'
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
