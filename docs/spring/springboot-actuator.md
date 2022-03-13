---
id: springboot-actuator
title: SpringBoot监控工具 -Actuator
---

:::tip
Actuator 用来监控SpringBoot应用的运行情况。
:::

## Spring Boot 添加Actuator

### 添加Actuator

引入依赖。

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```



启动项目，访问Actuator端点。

```
http://localhost:8081/actuator
```



后端返回Json数据，里面包含四个Actuator导航端点。

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8081/actuator",
      "templated": false
    },
    "health": {
      "href": "http://localhost:8081/actuator/health",
      "templated": false
    },
    "health-path": {
      "href": "http://localhost:8081/actuator/health/{*path}",
      "templated": true
    },
    "info": {
      "href": "http://localhost:8081/actuator/info",
      "templated": false
    }
  }
}
```

端点说明：

- `/actuator`
- `/actuator/health`：健康状态
- `/actuator/health/{*path}`
- `/actuator/info`：查看项目信息（需要在SpringBoot配置文件中设置info）



### 健康状态

点击`/actuator/health`端点，后端返回项目运行状况。

```json
{
  "status": "UP"
}
```



SpringBoot配置文件添加如下配置，重启SpringBoot应用。

```yaml
# Actuator展示详情
management:
  endpoint:
    health:
      show-details: always
```



访问`/actuator/health`端点。

```json
{
  "status": "UP",
  "components": {
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 999995129856,
        "free": 796211884032,
        "threshold": 10485760,
        "exists": true
      }
    },
    "ping": {
      "status": "UP"
    }
  }
}
```

从返回数据可以看到磁盘空间、磁盘状态等信息，当磁盘可用空间低于`threshold`阀值时，认为该磁盘状态不健康。还可以看到ping的状态。



`status`的四种状态：

- `UP`：正常
- `DOWN`：遇到了问题
- `OUT OF SERVICE`：资源未在使用，或不该使用
- `UNKNOW`：位置



### 项目信息

`/actuator/info`端点可以查看项目信息，该信息在SpringBoot配置文件中设置。

`key: valye`的形式。

```yaml
# Actuator信息描述
info.name: spring-boot-actuator
info.auth: liyan
info.desc: SpringBoot使用Actuator项目示例
info.date: 2021.2.24
```



重启应用，访问`/actuator/info`端点。

```json
{
  "name": "spring-boot-actuator",
  "auth": "liyan",
  "desc": "SpringBoot使用Actuator项目示例",
  "date": "2021.2.24"
}
```



### 暴露全部端点

配置文件中添加配置。

```yaml
# Actuator配置
management:
  # 健康状态显示详细信息
  endpoint:
    health:
      show-details: always
  # 设置Actuator要暴露的端点，*代表全部
  endpoints:
    web:
      exposure:
        include: '*'
```



重启应用，访问`/actuator`。

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8081/actuator",
      "templated": false
    },
    "beans": {
      "href": "http://localhost:8081/actuator/beans",
      "templated": false
    },
    "caches": {
      "href": "http://localhost:8081/actuator/caches",
      "templated": false
    },
    "caches-cache": {
      "href": "http://localhost:8081/actuator/caches/{cache}",
      "templated": true
    },
    "health-path": {
      "href": "http://localhost:8081/actuator/health/{*path}",
      "templated": true
    },
    "health": {
      "href": "http://localhost:8081/actuator/health",
      "templated": false
    },
    "info": {
      "href": "http://localhost:8081/actuator/info",
      "templated": false
    },
    "conditions": {
      "href": "http://localhost:8081/actuator/conditions",
      "templated": false
    },
    "configprops": {
      "href": "http://localhost:8081/actuator/configprops",
      "templated": false
    },
    "env-toMatch": {
      "href": "http://localhost:8081/actuator/env/{toMatch}",
      "templated": true
    },
    "env": {
      "href": "http://localhost:8081/actuator/env",
      "templated": false
    },
    "loggers-name": {
      "href": "http://localhost:8081/actuator/loggers/{name}",
      "templated": true
    },
    "loggers": {
      "href": "http://localhost:8081/actuator/loggers",
      "templated": false
    },
    "heapdump": {
      "href": "http://localhost:8081/actuator/heapdump",
      "templated": false
    },
    "threaddump": {
      "href": "http://localhost:8081/actuator/threaddump",
      "templated": false
    },
    "metrics-requiredMetricName": {
      "href": "http://localhost:8081/actuator/metrics/{requiredMetricName}",
      "templated": true
    },
    "metrics": {
      "href": "http://localhost:8081/actuator/metrics",
      "templated": false
    },
    "scheduledtasks": {
      "href": "http://localhost:8081/actuator/scheduledtasks",
      "templated": false
    },
    "mappings": {
      "href": "http://localhost:8081/actuator/mappings",
      "templated": false
    }
  }
}
```



### 预定义端点

| 端点(SpringBoot 2.x) | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| /auditevents         | 列出与安全审计相关的事件，例如用户登录/注销。此外，我们可以按主要或类型等字段进行过滤 |
| /beans               | 在我们的BeanFactory中使用所有可用的bean                      |
| /conditions          | SpringBoot 1.x时为/autoconfig，构建有关自动配置的条件报告    |
| /configprops         | 允许我们获取所有@ConfigurationProperties的bean               |
| /env                 | 返回当前环境属性。此外，我们可以检索单个属性                 |
| /flyway              | 提供有关我们的Flyway数据库迁移的详细信息                     |
| /health              | 提供有关应用程序的运行状况的详细信息                         |
| /heapdump            | 从应用程序的JVM提供了一个堆转储                              |
| /info                | 提供有关应用程序的一般信息                                   |
| /liquibase           | 提供有关Liquibase应用数据库的变更集信息                      |
| /logfile             | 可以访问应用程序的日志文件的内容                             |
| /loggers             | 可以访问和修改应用程序的记录程序及其级别的配置。             |
| /metrics             | 详细说明我们的应用程序的指标。这可能包括通用指标和自定义指标 |
| /prometheus          | 返回与metrics相同的指标，但格式化为与Prometheus服务器一起使用 |
| /scheduledtasks      | 提供有关应用程序的计划任务的信息                             |
| /sessions            | 列出我们正在使用Spring Session的HTTP会话的信息               |
| /shutdown            | 用来关闭应用程序                                             |
| /threaddump          | 查看底层JVM的线程信息                                        |



`/actuator/metrics`查看虚拟机等指标，返回一个`names`数组，数组包含各种指标名称，通过访问`/actuator/metrics/指标名称`查看指标信息。



### 更多

更多详情可以查看官方文档 [Spring Boot Actuator Web API Documentation](https://docs.spring.io/spring-boot/docs/2.2.x/actuator-api/html/)

