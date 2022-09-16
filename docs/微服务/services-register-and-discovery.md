---
id: nacos-services-register-and-discovery
title: Nacos 服务发现注册与发现组件
---

## 1.1 了解服务注册与发现


![image-20210523224838862](https://upyun1.surcode.cn/imgs/20210523224839.png)

假设没有引入服务发现组件，服务A想调用服务B，需要直接调用`http://192.168.0.1:8002/xxx`。如果服务B的地址或者端口变动了，或者服务B宕机了，服务A是不知情的，即便知道了还需要手动去修改调用的地址，这种做法效率非常低，如果服务众多，维护起来相当麻烦。

如上图，在架构中引入了服务发现组件，服务A和服务B都注册到了服务发现组件中，服务A想调用服务B，服务A只需根据要调用的服务名称在服务发现组件中找到可用的、健康的服务B实例并获取IP:Port，再调用。即便服务B的地址或端口修改了，服务B在启动时注册进来的也永远是最新的。并且服务发现组件会检查每个实例的健康状态，保证服务的可用性。



## 1.2 服务发现组件-Nacos

`Nacos`是阿里开源的服务发现组件，同时也是微服务的配置管理组件。它提供了服务注册发现以及服务健康检查等特性。



## 1.3 安装Nacos

Nacos本身是一个服务器应用，需要先搭建再使用。

- [使用Docker搭建Nacos单机版](https://www.shiguangping.com/docker-nacos-standalone.html)



# 二、代码示例

>本文示例中使用的依赖版本是：
>
>- Spring Boot：2.3.2.RELEASE
>- Spring Cloud：Hoxton.SR8
>- Spring Cloud Alibaba：2.2.5.RELEASE



## 2.1 在项目中引入nacos-discovery

创建两个项目，`服务提供者Provider`和`服务消费者Consumer`，引入`nacos-discovery`starter。

遵循Spring Boot的三板斧，首先是*加依赖。*在Pom文件中添加如下内容：

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```



然后，*写注解*。在启动类中添加`@EnableDiscoveryClient`注解：

```java
@EnableDiscoveryClient
@SpringBootApplication
public class NacosProviderDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ContentCenterApplication.class, args);
    }

}
```



第三步，*写配置*。在`application.yaml`中添加如下内容：

```yaml
spring:
  # 服务名
  application:
    name: service-provider
  cloud:
    nacos:
      discovery:
      	# nacos服务地址
        server-addr: 127.0.0.1:8848
        
server:
  port: 18082
```



写一个示例接口。

```java
package com.shiguangping.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author liyan
 */
@EnableDiscoveryClient
@SpringBootApplication
public class NacosProviderDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(NacosProviderDemoApplication.class, args);
    }

    @RestController
    class EchoController {

        @GetMapping("/echo/{string}")
        public String echo(@PathVariable String string) {
            return "hello Nacos Discovery " + string;
        }
    }

}
```



在服务消费者Consumer项目中，引入依赖，写配置。

```yaml
spring:
  application:
    name: service-consumer
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
server:
  port: 18083
```

启动两个服务，在Nacos管理页面查看服务列表。

![image-20210524010122771](https://upyun1.surcode.cn/imgs/20210524010123.png)



在消费者项目中写测试接口，使用RestTemplate远程调用服务提供者中的接口。

```java
package com.shiguangping.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * @author liyan
 */
@EnableDiscoveryClient
@SpringBootApplication
public class NacosConsumerDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(NacosConsumerDemoApplication.class, args);
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
```



```java
package com.shiguangping.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * @author liyan
 */
@RestController
@RequiredArgsConstructor
public class TestController {

    private final RestTemplate restTemplate;

    @GetMapping("/echo/{string}")
    public String echo(@PathVariable String string) {
        return restTemplate.getForObject("http://service-provider/echo/{string}", String.class, string);
    }

}
```

使用Postman调用服务消费者的测试接口。

![image-20210524010435464](https://upyun1.surcode.cn/imgs/20210524010435.png)



以上就是服务注册发现的简单示例，将`服务提供者Provider`和`服务消费者Consumer`两个服务注册到Nacos中，消费者使用RestTemplate调用提供者的接口`restTemplate.getForObject("http://service-provider/echo/{string}", String.class, string);`，Nacos通过服务名称`service-provider`返回实例的IP:Port，拼接成完整的URL。

![image-20210524012159943](https://upyun1.surcode.cn/imgs/20210524012200.png)



# 三、Nacos的配置

## 3.1 Nacos的配置项

| 配置项         | key                                            | 默认值                  | 说明                                                         |
| -------------- | ---------------------------------------------- | ----------------------- | ------------------------------------------------------------ |
| 服务端地址     | spring.cloud.nacos.discovery.server-addr       |                         |                                                              |
| 服务名         | spring.cloud.nacos.discovery.service           | spring.application.name |                                                              |
| 权重           | spring.cloud.nacos.discovery.weight            | 1                       | 取值范围 1 到 100，数值越大，权重越大                        |
| 网卡名         | spring.cloud.nacos.discovery.network-interface |                         | 当IP未配置时，注册的IP为此网卡所对应的IP地址，如果此项也未配置，则默认取第一块网卡的地址 |
| 注册的IP地址   | spring.cloud.nacos.discovery.ip                |                         | 优先级最高                                                   |
| 注册的端口     | spring.cloud.nacos.discovery.port              | -1                      | 默认情况下不用配置，会自动探测                               |
| 命名空间       | spring.cloud.nacos.discovery.namespace         |                         | 常用场景之一是不同环境的注册的区分隔离，例如开发测试环境和生产环境的资源（如配置、服务）隔离等。 |
| AccessKey      | spring.cloud.nacos.discovery.access-key        |                         |                                                              |
| SecretKey      | spring.cloud.nacos.discovery.secret-key        |                         |                                                              |
| Metadata       | spring.cloud.nacos.discovery.metadata          |                         | 使用Map格式配置                                              |
| 日志文件名     | spring.cloud.nacos.discovery.log-name          |                         |                                                              |
| 接入点         | spring.cloud.nacos.discovery.endpoint          | UTF-8                   | 地域的某个服务的入口域名，通过此域名可以动态地拿到服务端地址 |
| 是否集成Ribbon | ribbon.nacos.enabled                           | true                    |                                                              |



# 三、参考

- [Nacos 仓库](https://github.com/alibaba/Nacos)
- [Nacos官方文档](https://nacos.io/zh-cn/docs/what-is-nacos.html)
- [Nacos 服务发现接入示例](https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-discovery)



