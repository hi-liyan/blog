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
    // tutorialSidebar: [{type: "autogenerated", dirName: "."}],

    // But you can create a sidebar manually

    tutorialSidebar: [
        {
            type: "doc",
            id: "hello",
            label: "你好"
        },
        "Java/javase",
        "Java/修改final常量的值",
        "Java/关于byte b+=1和b=b+1的问题",
        "kotlin/浅学 Kotlin",
        {
            JavaSE: [
                {
                    "1. 搭建开发环境": [
                        "javase/开发环境安装",
                        "javase/jdk",
                        "javase/集成开发环境",
                        "javase/helloworld"
                    ]
                },
                "javase/Java注释的格式",
                "javase/Java中的关键字",
                "javase/Java中的标识符",
                "javase/变量",
                "javase/常量",
                {
                    "7. 数据类型": [
                        "javase/数据类型",
                        "javase/数据类型转换"
                    ]
                },
                "javase/进制",
                "javase/运算符",
                {
                    "10. 流程控制": [
                        "javase/条件语句",
                        "javase/循环语句",
                        "javase/算n以内的质数",
                    ]
                },
                {
                    "11. 数组": [
                        "javase/数组",
                        "javase/数组元素排序",
                        "javase/二维数组",
                    ]
                },
                {
                    "12. 面向对象": [
                        "javase/Java面向对象",
                        "javase/类和对象",
                        "javase/构造方法",
                        "javase/成员方法",
                        "javase/Java封装",
                        "javase/static关键字",
                        "javase/Java继承",
                        "javase/final关键字",
                        "javase/单例模式",
                        "javase/Java多态",
                        "javase/Java接口",
                        "javase/Java抽象类",
                        "javase/Java内部类",
                        "javase/static关键字和final关键字小结",
                        "javase/Java中的访问修饰符",
                    ]
                },
                {
                    "14. Java异常处理": [
                        "javase/Java异常处理",
                        "javase/try-catch-finally",
                        "javase/throws抛出异常",
                        "javase/throw抛出异常",
                        "javase/自定义异常",
                        "javase/异常类",
                    ]
                },
                "javase/Java包装类",
                {
                    "16. Java字符串": [
                        "javase/Java字符串",
                        "javase/StringBuilder",
                    ]
                },
                {
                    "17. Java集合框架": [
                        "javase/Java集合框架",
                        "javase/List集合",
                        "javase/Set集合",
                        "javase/Map集合"
                    ]
                },
                "javase/Java泛型",
                "javase/Java多线程",
                "javase/java-io",
                {
                    "21. Java反射和注解": [
                        "javase/Java反射",
                        "javase/Java反射常用API",
                        "javase/Java类加载器",
                        "javase/Java注解",
                        "javase/Java元注解",
                        "javase/自定义注解",
                    ]
                },
                "javase/javase",
                "javase/java-proxy",
                "javase/java-synchronized",
                "javase/java-threadlocal",
                "javase/java-nio",
                "javase/java-stream",
                "javase/java-lambda"
            ]
        },
        {
            JavaEE: [
                "javaee/tomcat",
                "javaee/Servlet",
                "javaee/使用STS创建Web项目",
                "javaee/HTTP协议",
                "javaee/Request",
                "javaee/Response",
                {
                    "会话技术": [
                        "javaee/会话技术",
                        "javaee/Cookie",
                        "javaee/Session",
                    ]
                },
                {
                    "JSP": [
                        "javaee/JSP",
                        "javaee/MVC",
                        "javaee/EL表达式",
                        "javaee/JSTL",
                    ]
                },
                "javaee/Filter",
                "javaee/Listener"
            ]
        },
        {
            Spring: [
                "spring/Spring",
                "spring/IoC理论推导",
                "spring/HelloSpring",
                "spring/IoC创建对象的方式",
                "spring/spring-xml-ioc",
                "spring/Spring配置",
                "spring/依赖注入",
                "spring/Bean的作用域",
                "spring/Bean的自动装配",
                "spring/Spring注解开发",
                "spring/使用JavaConfig实现配置",
                "spring/spring-test",
                "spring/静态代理",
                "spring/动态代理",
                "spring/AOP实现方式",
                "spring/AOP实现方式二",
                "spring/注解实现AOP",
                "spring/整合Mybatis",
                "spring/Spring声明式事务",
                "spring/create-ssm-proj",
            ]
        },
        {
            Mybatis: [
                "mybatis/Mybatis框架",
                "mybatis/第一个Mybatis程序",
                "mybatis/Mybatis增删改查",
                "mybatis/Map和模糊查询",
                "mybatis/配置之属性优化",
                "mybatis/配置之别名优化",
                "mybatis/配置之映射器",
                "mybatis/生命周期和作用域",
                "mybatis/结果集映射",
                "mybatis/日志工厂",
                "mybatis/log4j",
                "mybatis/Limit实现分页",
                "mybatis/RowBounds分页",
                "mybatis/使用注解开发",
                "mybatis/Mybatis执行流程剖析",
                "mybatis/使用注解增删改查",
                "mybatis/动态SQL的使用",
                "mybatis/一对一查询",
                "mybatis/一对多查询",
                "mybatis/多对多查询",
            ]
        },
        {
            SpringMVC: [
                "springmvc/SpringMVC",
                "springmvc/SpringMVC执行流程",
                "springmvc/Controller控制器",
                "springmvc/RequestMapping",
                "springmvc/RestFul风格",
                "springmvc/重定向和转发",
                "springmvc/接收请求参数及数据回显",
                "springmvc/整合MyBatis",
                "springmvc/整合Spring",
                "springmvc/整合SpringMVC",
                "springmvc/SpringMVC的编码过滤器",
                "springmvc/拦截器",
                "springmvc/拦截器实现登录验证",
                "springmvc/文件上传和下载",
                "springmvc/扩展：Spring中使用thymeleaf",
                "springmvc/扩展：SSM整合SpringSecurity-环境搭建",
                "springmvc/扩展：SSM整合SpringSecurity-开始整合",
                "springmvc/扩展：Shiro基础",
                "springmvc/扩展：JavaConfig配置Bean",
                "springmvc/扩展：Shiro中的注解",
                "springmvc/扩展：Thymeleaf整合Shiro",
            ]
        },
        {
            SpringBoot: [
                "springboot/springboot-application-context-initializer",
                "springboot/springboot-application-event-listener",
                "springboot/springboot-auto-configuration",
                "springboot/springboot-custom-starter",
                "springboot/springboot-actuator",
                "springboot/springboot-global-exception-handle",
                "springboot/jsr303",
            ]
        },
        {
            微服务相关: [
                "微服务/spring-cloud-alibaba",
                "微服务/nacos-services-register-and-discovery",
                "微服务/nacos-configuration-center",
                "微服务/ribbon",
                "微服务/sentinel",
                "微服务/dubbo-quick-start"
            ]
        },
        {
            中间件: [
                "middleware/redis-note",
                "middleware/distributed-lock",
                "middleware/rocketmq-quick-start",
                "middleware/elasticsearch-quick-start"
            ]
        },
        {
            数据库: [
                "database/MySQL数据库",
                "database/JDBC",
                "database/SpringJDBC",
                "database/DBUtils",
                "database/transaction",
                "database/数据库连接池",
                "database/mybatis-plus-multi-tenant"
            ]
        },
        {
            "😃JavaScript": [
                "javascript/prototype",
                "javascript/JS数组遍历",
                "javascript/Promise"
            ]
        },
        {
            "🎊React": [
                "react/react-hooks",
                "react/use_reducer",
                "react/react-redux",
                "react/context"
            ]
        },
        "设计模式",
        "Golang",
        "Rust",
        {
            CSS: [
                "css/CSS",
                "css/Flex",
            ]
        },
        {
            Vue: [
                "vue/vue-components-communication",
                "vue/vue-responsive"
            ]
        },
        "Docker",
        {
            flutter: [
                "flutter/Dart",
                "flutter/Flutter"
            ]
        },
        "apps/rpush",
        {
            type: "category",
            label: "其它",
            items: [
                "others/CentOS安装Docker",
                "others/harbor-install",
                "others/portainer-standalone",
                "others/macos-arm-jdk",
                "others/macos-install-maven",
                "others/idea-view-openjdk-source-code",
                "others/java-learning-path",
                "others/java-learning-method",
                "others/git-memo",
                "others/frp-install",
                "others/github-ssh",
                "others/springboot-jenkins-cicd",
                "others/group-concat-max-length",
                "others/netlify",
                "others/spring-cross",
                "others/stored-procedure-oracle",
                "others/tcpip-birth-talk-talk",
                "others/redis-story",
                "others/redis-story-persistence",
                "others/session-cookie-jwt",
                "others/ssh-login",
                "others/vim",
            ]
        }
    ],

};
