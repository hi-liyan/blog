---
id: ribbon
title: 负载均衡器 -Ribbon
---

## 1.1 概述

Ribbon是Netflix开源的客户端侧负载均衡器，提供多种负载均衡策略。

主流的负载均衡方案有两种：

一种是*集中式负载均衡*，一种是*进程内负载均衡*。

集中式负载均衡是独立于服务提供者和服务消费者之外的负载均衡器，如Nginx，由它接收到请求再根据某种负载均衡策略转发到服务提供方。

进程内负载均衡是将负载均衡器集成在服务消费方，消费方从服务注册发现中心可用的服务提供者实例地址，然后再根据负载均衡策略从这些地址中选择出一个合适的服务。

**Ribbon**就属于后者，属于进程内（也就是客户端侧）负载均衡器，它只是一个类库，集成于消费方进程，消费方通过它来获取到服务提供方的地址。



## 1.2 使用负载均衡器的优点

访问量较大时，一般会使用集群部署的方式来分摊流量，采用合适的负载均衡策略使这些流量分摊到不同的机器上，保证系统的高可用，即便是有的服务宕机，剩余的服务仍可支持系统继续使用。

负载均衡有多种实现策略，常见的有：

- 随机 (Random)
- 轮询 (RoundRobin)
- 一致性哈希 (ConsistentHash)
- 哈希 (Hash)
- 加权（Weighted）
- ...



## 1.3 Ribbon 的组成

|           接口           |            作用            |                       默认值（实现类）                       |
| :----------------------: | :------------------------: | :----------------------------------------------------------: |
|      `IClientConfig`       |          读取配置          |                   DefaultClientConfigImpl                    |
|          `IRule `          |   负载均衡规则，选择实例   |                      ZoneAvoidanceRule                       |
|          `IPing`           |    筛选掉ping不通的实例    |                          DummyPing                           |
|    `ServerList<Server> `   |    交给Ribbon的实例列表    | Ribbon：ConfigurationBasedServerList Spring Cloud Alibaba：NacosServerList |
| `ServerListFilter<Server>` |   过滤掉不符合条件的实例   |                ZonePreferenceServerListFilter                |
|       `ILoadBalance `      |        Ribbon的入口        |                     ZoneAwareLoadBalance                     |
|    `ServerListUpdater `    | 更新交给Ribbon的List的策略 |                   PollingServerListUpdater                   |

Ribbon提供了灵活的配置，它将组件定义成了接口，如`IRule`接口，如需修改默认的负载均衡规则，只需重写配置，返回需要的实现类即可。

```java
@Configuration
public class RibbonConfig {

    @Bean
    public IRule rule() {
      	// 返回需要的实现类
        return new NacosWeightedRule();
    }
}
```

:::caution
本文待完成...
:::
