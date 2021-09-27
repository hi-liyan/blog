---
id: sentinel
title: 服务容错 -Sentinel
---



## 1.1 雪崩效应

> 雪崩效应：基础服务故障导致上层服务故障，并且这个故障不断放大的过程称之为雪崩效应。

如下图，假设这是一个高并发的应用系统。当A服务不可用时，B依然向A发出请求并且请求不会立即失败，而是等待超时，这就造成了线程阻塞，时间久了，B服务也可能挂掉。随着时间推移，C、D服务最终也可能会挂掉。

![image-20210701001944544](https://images.shiguangping.com/imgs/20210701001956.png)



## 1.2 常用的容错方案

- 超时
- 限流
- 仓壁模式
- 断路器模式



熔断器模式的三种状态：

![circuit-breaker](https://images.shiguangping.com/imgs/20210703224238.png)

熔断器有三种状态：

1. Closed 状态：也是初始状态，该状态下，熔断器会保持闭合，对资源的访问直接通过熔断器的检查。
2. Open 状态：断开状态，熔断器处于开启状态，对资源的访问会被切断。
3. Half-Open 状态：半开状态，该状态下除了探测流量，其余对资源的访问也会被切断。探测流量指熔断器处于半开状态时，会周期性的允许一定数目的探测请求通过，如果探测请求能够正常的返回，代表探测成功，此时熔断器会重置状态到 Closed 状态，结束熔断；如果探测失败，则回滚到 Open 状态。

这三种状态之间的转换关系这里做一个更加清晰的解释：

1. 初始状态下，熔断器处于 Closed 状态。如果基于熔断器的统计数据表明当前资源触发了设定的阈值，那么熔断器会切换状态到 Open 状态；
2. Open 状态即代表熔断状态，所有请求都会直接被拒绝。熔断器规则中会配置一个熔断超时重试的时间，经过熔断超时重试时长后熔断器会将状态置为 Half-Open 状态，从而进行探测机制；
3. 处于 Half-Open 状态的熔断器会周期性去做探测。



## 2.1 使用Sentinel实现服务容错

### 2.1.1 什么是Sentinel？

Sentinal 是轻量级的流量控制、熔断降级 Java 库。

Sentinel由核心库和Dashboard组成，核心库可以不依赖于Dashboard单独使用，通过Dashboard可以更方便地配置管理各种规则。



#### 参考

- [Sentinel 官网](https://sentinelguard.io/zh-cn/index.html)
- [Sentinel 官方仓库](https://github.com/alibaba/Sentinel)



### 2.1.2 项目中引入Sentinel

Spring Boot项目引入Starter。

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```





### 2.1.3 Sentinel控制台

在官方仓库release页面下载jar包，[https://github.com/alibaba/Sentinel/releases](https://github.com/alibaba/Sentinel/releases)

jar包下载到本地后，通过`java -jar`运行。

```bash
java -jar sentinel-dashboard-1.8.2.jar
```



#### 流控模式

- 直接：直接按照当前资源的**调用来源**进行限流，若来源为`default`则不区分调用来源。根据指定的阈值类型进行限流，如果当前的QPS或者并发线程数达到阈值，则对该资源进行限流。

- 关联：当两个资源之间具有资源争抢或者依赖关系的时候，这两个资源便具有了关联。关联限流会根据当前资源的**关联资源**进行限流。当关联资源的QPS/并发线程数达到阈值，则对当前资源进行限流。（关联资源优先的策略）

  比如read_db和write_db这两个资源分别代表数据库读写，我们可以给read_db设置限流规则来达到写优先的目的：设置**关联资源**为write_db。这样当写库操作过于频繁时，读数据的请求会被限流。

- 链路：根据调用链路入口限流。需要在规则中配置**入口资源**，即该调用链路入口的上下文名称。



#### 流控效果

- 快速失败：达到阈值时，立即拦截请求。

- Warm Up：预热/冷启动。当流量突然增大的时候，希望系统从空闲状态到繁忙状态的切换的时间长一些，即如果系统在此之前长期处于空闲的状态，希望处理请求的速率缓慢增加，经过预期的时间以后，到达系统处理请求速率的设定值；

  根据codeFactor（默认3）的值，从阈值/codeFactor（默认阈值/3），经过预热时长，才打到设置的QPS阈值。

- 排队等待：匀速器。请求匀速通过，允许排队等待，通常用于消息队列削峰填谷等场景。比如配置了QPS为5，则代表请求每200 ms才能通过一个，多出的请求将排队等待通过。超时时间代表最大排队时间，超出最大排队时间的请求将会直接被拒绝。**注意排队等待模式下QPS不要超过1000（请求间隔1 ms）。**

