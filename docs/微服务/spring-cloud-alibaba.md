---
id: spring-cloud-alibaba
title: 微服务架构 -Spring Cloud Alibaba
---

## 1.1 微服务是一种应用架构

微服务是一种用于构建应用的架构方案。微服务架构有别于更为传统的单体式方案，可将应用拆分成多个核心功能。每个功能都被称为一项服务，可以单独构建和部署，这意味着各项服务在工作（和出现故障）时不会相互影响。

![image-20210523205453083](https://upyun.shiguangping.com/imgs/20210523205453.png)

微服务相比于传统单体项目的优势：

- 服务拆分，单个服务可以实现敏捷开发，缩短开发周期，后期更易维护；
- 单个微服务启动快；
- 单个微服务体量小，容易维护和部署；
- 技术栈不受限，因为每个微服务间通过HTTP协议通信，服务A可以使用Java开发，服务B可以使用Python开发；
- ...



尽管微服务有这么多优点，但凡事都有两面性：

- 服务众多，运维要求较高，要考虑到自动化构建部署；
- 分布式应用固有的复杂性，考虑服务间通信的延迟、分布式事务等；
- ...



微服务架构适用的场景：

- 大型、复杂的项目；
- 有快速迭代的需求；
- 访问压力大；



因为微服务以及分布式固有的复杂性，小型项目不适用于微服务架构，杀鸡焉用牛刀。



## 1.2 认识 Spring Cloud

`Spring Cloud`是用于构建Java微服务项目的解决方案之一，是*快速构建分布式系统的工具集*，提供了快速构建分布式系统中一些常见模式的工具，如：

- 配置管理
- 服务注册与发现
- 断路器
- 智能路由
- 服务间调用
- 负载均衡
- 微代理
- 控制总线
- 一次性令牌
- 全局锁
- 领导选举
- 分布式会话
- 集群状态
- 分布式消息
- ...

开发人员可以选择使用这些工具来快速构建自己的微服务项目。



## 1.3 Spring Cloud 主要功能

| 功能                                  | 翻译                    | 工具                                               |
| ------------------------------------- | ----------------------- | -------------------------------------------------- |
| Distributed/versioned Configuration   | 分布式/版本化的配置管理 | Spring Cloud Config、Consul、Nacos、Zookeeper      |
| Service registration and discovery    | 服务注册与发现          | Eureka、Consul、Nacos、Zookeeper                   |
| Routing                               | 路由                    | Zuul、Spring Cloud Gateway                         |
| Service-to-service calls              | 端到端的调用            | RestTemplate、Feign                                |
| Load balancing                        | 负载均衡                | Ribbon                                             |
| Circuit Breakers                      | 断路器                  | Hystrix、Sentinel、Resilience4j                    |
| Global locks                          | 全局锁                  | Spring Cloud Cluster（已迁移到Spring Integration） |
| Leadership election and cluster state | 选举与集群状态管理      | Spring Cloud Cluster（已迁移到Spring Integration） |
| Distributed messaging                 | 分布式消息              | Spring Cloud Stream + kafka、RabbitMQ、RocketMQ    |





## 1.4 认识 Spring Cloud Alibaba

`Spring Cloud Alibaba`是阿里巴巴开源的一套遵循`Spring Cloud`标准的微服务解决方案，包含开发分布式应用服务的必需组件：

- 服务注册与发现-Nacos
- 配置管理-Nacos
- 熔断器-Sentinel
- 分布式消息-RocketMQ



## 1.5 为项目引入 Spring Cloud Alibaba

修改pom文件，在`<dependencyManagement>`中添加如下内容：

```xml
<dependencyManagement>
  <dependencies>
    <!-- Spring Cloud -->
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-dependencies</artifactId>
      <version>Greenwich.SR1</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    <!-- Spring Cloud Alibaba -->
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-alibaba-dependencies</artifactId>
      <version>0.9.0.RELEASE</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

引入 Spring Cloud Alibaba 的同时还有引入 Spring Cloud 的依赖。

*要注意Spring Cloud、Spring Cloud Alibaba、Spring Boot之间的版本兼容性，可以在Spring Cloud Alibaba 官方仓库 Wiki中查看组件版本关系，链接在下方（1.6 参考和扩展）中。*



## 1.6 参考和扩展

- [Martin Fowler提出的“微服务”架构原文](https://martinfowler.com/articles/microservices.html)
- [Spring Cloud Alibaba 官方仓库Wiki](https://github.com/alibaba/spring-cloud-alibaba/wiki)
- [Spring Cloud Alibaba 中文文档](https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html)



---

P.S. 内容问题请在下方评论区留言指正，欢迎交流学习。
