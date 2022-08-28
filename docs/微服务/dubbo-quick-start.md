---
id: dubbo-quick-start
title: Dubbo 快速开始
---

## 简介

:::tip
Apache Dubbo 是一款高性能的面向接口代理的RPC框架。
本文介绍Spring Boot项目整合Apache Dubbo完成跨服务调用，Dubbo可以使用Zookeeper、Nacos等服务发现组件作为服务注册中心。本文使用Nacos作为服务注册中心。
:::




## 仓库

示例代码托管在Gitee：[spring-boot-dubbo-demo 项目地址](https://gitee.com/ENNRIAAA/spring-boot-dubbo-demo.git)



## Quick Start

1. 创建服务提供者项目`dubbo-provider`，并添加Dubbo依赖。

   ```xml
   <!-- dubbo starter -->
   <dependency>
     <groupId>org.apache.dubbo</groupId>
     <artifactId>dubbo-spring-boot-starter</artifactId>
   </dependency>
   <!-- dubbo-registry-nacos -->
   <dependency>
     <groupId>org.apache.dubbo</groupId>
     <artifactId>dubbo-registry-nacos</artifactId>
   </dependency>
   ```

2. 启动类添加`@EnableDubbo`注解。

   ```java
   @EnableDubbo
   @SpringBootApplication
   public class DubboProviderApplication {
       public static void main(String[] args) {
           SpringApplication.run(DubboProviderApplication.class, args);
       }
   }
   ```

3. 写配置 `application.yml`。

   ```yaml
   # 服务端口号
   server:
     port: 8081
   # 服务名称
   spring:
     application:
       name: dubbo-provider
   
   dubbo:
     application:
       # 当前应用名称
       name: dubbo-provider
       # 当前应用的版本
       version: 1.0.0
       # 应用负责人，用于服务治理，请填写负责人公司邮箱前缀
       owner: liyan
       # 日志输出方式，可选：slf4j,jcl,log4j,log4j2,jdk
       logger: slf4j
     registry:
       # 注册中心服务器地址
       address: nacos://121.196.189.156:8848
   ```

4. 写代码。

   Dubbo是面向接口的跨服务调用模式，所以新建一个Maven项目`dubbo-api`，该项目用来定义rpc接口，服务提供者和消费者引用该项目。

   ```java
   public interface ITestService {
   		// 写一个测试方法
       String test(String s);
   }
   ```

   在`dubbo-provider`的Pom中引入`dubbo-api`，之后实现该接口。实现类添加`@DubboService`注解，说明这是一个Dubbo服务，将服务注册到注册中心。

   ```java
   @DubboService(group = "test", version = "1.0.0")
   public class TestServiceImpl implements ITestService {
       @Override
       public String test(String s) {
           return "调用成功，我是服务提供者：" + s;
       }
   }
   ```

   启动`dubbo-provider`项目，并打开Nacos控制台，可以看到服务已经注册到Nacos中。

   ![image-20210629230357591](https://upyun.shiguangping.com/imgs/20210629230358.png)

5. 创建服务消费者项目`dubbo-consumer`，并添加如上依赖。

6. 启动类添加`@EnableDubbo`注解。

7. 写配置，`application.yml`。

   ```yaml
   server:
     port: 8082
   
   spring:
     application:
       name: dubbo-consumer
   
   dubbo:
     application:
       name: dubbo-consumer
     registry:
       address: nacos://121.196.189.156:8848
     consumer:
       # 负载均衡策略
       loadbalance: roundrobin
   ```

8. 写代码。

   同样，在`dubbo-consumer`的Pom中引入`dubbo-api`。在rpc接口上添加`@DubboReference`注解，在调用时Dubbo向注册中心获取可用的服务实例，然后通过负载均衡策略（默认是随机）调用目标实例。

   ```java
   @RestController
   @RequestMapping("test")
   public class TestController {
   
       @DubboReference(group = "test", version = "1.0.0", timeout = 6000)
       private ITestService iTestService;
   
       @GetMapping("test")
       public String test(String str){
           String test = iTestService.test(str);
           return test;
       }
   }
   ```

   使用Postman测试`dubbo-consumer`的test接口。观察返回值，说明已经成功调用了`dubbo-provider`服务。

   ![image-20210629231928172](https://upyun.shiguangping.com/imgs/20210629231928.png)







## 参考

### Dubbo 配置参考

- [Dubbo v2.7 配置文档](https://dubbo.apache.org/zh/docs/v2.7/user/references/xml/)

