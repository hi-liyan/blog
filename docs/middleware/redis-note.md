---
id: redis-note
title: Redis 入门
---

# NoSQL

NoSQL即`Not Only SQL`，翻译过来就是“不仅仅是SQL”，泛指**非关系型数据库**。

在Web应用发展的初期，那时关系型数据库受到了较为广泛的关注和应用，原因是因为那时候Web站点基本上访问和并发不高、交互也较少。而在后来，随着访问量的提升，使用关系型数据库的Web站点多多少少都开始在性能上出现了一些瓶颈，而瓶颈的源头一般是在磁盘的I/O上。而随着互联网技术的进一步发展，各种类型的应用层出不穷，这导致在当今云计算、大数据盛行的时代，对性能有了更多的需求，主要体现在以下四个方面：

1. 低延迟的读写速度：应用快速地反应能极大地提升用户的满意度
2. 支撑海量的数据和流量：对于搜索这样大型应用而言，需要利用PB级别的数据和能应对百万级的流量
3. 大规模集群的管理：系统管理员希望分布式应用能更简单的部署和管理
4. 庞大运营成本的考量：IT部门希望在硬件成本、软件成本和人力成本能够有大幅度地降低

为了克服这一问题，NoSQL应运而生，它同时具备了高性能、可扩展性强、高可用等优点，受到广泛开发人员和仓库管理人员的青睐。



常见的非关系型数据库有：

- Memcache，较早期的非关系型数据库，支持的数据类型单一，不支持持久化，一般用作关系型数据库的缓存使用
- Redis，支持数据类型丰富，支持持久化
- Mongo，文档型数据库
- 等...



# Redis

## 概述

(Redis)属于非关系型数据库，存储key-value形式数据。

Redis`(Remote Dictionary Server)`是现在最受欢迎的NoSQL数据库之一，Redis是一个使用ANSI C编写的开源、包含多种数据结构、支持网络、基于内存、可选持久性的键值对`(key-value)`存储数据库，其具备如下特性：

- 基于内存运行，性能高效
- 支持分布式，理论上可以无限扩展
- key-value存储系统
- 开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API

相比于其他数据库类型，Redis具备的特点是：

- C/S通讯模型
- 单进程单线程模型
- 丰富的数据类型
- 操作具有原子性
- 可持久化
- 高并发读写
- 支持lua脚本



常用场景：

- 缓存系统（“热点”数据：高频读、低频写）
- 计数器
- 消息队列系统
- 排行榜
- 社交网络
- 实时系统

不适用的场景：

- 需要事务支持
- 需要存储关系型数据



## 数据类型

Redis支持丰富的数据类型：

- String 字符串
- List 列表
- Set 集合
- Hash 哈希
- ZSet 有序集合

![img](https://upyun.shiguangping.com/imgs/20210509131100.png)



## Redis 命令

### 基本命令

通过命令行工具连接Redis数据库。

```bash
redis-cli
```

通过命令行工具连接远程Redis数据库。

```bash
redis-cli -h <host> -p <port> -a <password>
```



Redis默认内置16个数据库，0-15，默认使用0号数据库。

切换数据库命令。

```bash
# 如 select 1
select <dbid>
```

查看当前数据库有多少个Key。

```bash
dbsize
```

清空当前数据库。

```bash
flushdb
```

清空所有的数据库。

```bash
flushall
```



### 键 Key

查看当前数据库所有的键。

```bash
keys *
```

查看指定键是否存在，返回1表示存在，0表示不存在。

```bash
exists <key>
```

查看指定key的数据类型。

```bash
type <key>
```

删除指定key数据。

```bash
del <key>
```

删除指定key数据（异步删除）。

```bash
unlink <key>
```

设置key的过期时间。

```bash
# expire k1 10
expire <key> <过期时间（秒）>
```

查看key还有多少秒过期（-1表示永不过期，-2表示已过期）。

```bash
ttl <key>
```



### 字符串 String

字符串是Redis值的最基本数据类型。String是二进制安全的，只要是可以转换成字符串的都可以存进来，如图片、序列化的对象等。一个字符串value的大小最大是512M。

#### 常用命令

设置键值。

```bash
# set k1 100
set <key> <value> 
```

获取指定键的值。

```bash
# get k1
get <key>
```

将给定的值追加到指定键值的尾部，返回追加后的值的长度。

```bash
append <key> <value>
```

获取值的长度。

```
strlen <key>
```

设置键值，且当Key不存在时。

```bash
setnx <key> <value>
```

将Key中存储的数字值增一（只对数字值有效）。

```bash
incr <key>
```

将Key中存储的数字值减一。

```bash
decr <key>
```

将 key 所储存的值加上给定的增量值（increment） 。

```bash
# incrby k1 5
incrby <key> <increment>
```

key 所储存的值减去给定的减量值（decrement） 。

```bash
decrby <key> <decrement>
```

同时设置一个或多个键值。

```bash
# mset k1 100 k2 200 k3 300
mset <key1> <value1> <key2> <value2> ...
```

同时获取一个或多个键的值。

```bash
# mget k1 k2 k3
mget <key1> <key2> <key3> ...
```

同时设置一个或多个键值，且当这些键都不存在时。（当有一个键存在时，所有都失败）

```bash
msetnx <key1> <value1> <key2> <value2> ...
```

*由于Redis单线程特性，Redis所有的指令操作都是**原子操作**，即一个指令不会因为线程调度而被打断。*



返回 key 中字符串值的子字符。

```bash
# getrange k1 0 5
getrange <key> <start> <end>
```

用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始。

```bash
# setrange k1 5 str
setrange <key> <offset> <value>
```

将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)。

```bash
# setex k1 100 str
setex <key> <seconds> <value>
```

将给定 key 的值设为 value ，并返回 key 的旧值(old value)。

```bash
getset <key> <value>
```



### 列表 List

该类型是一个插入顺序排序的字符串元素集合，基于双链表实现。可以添加一个元素到列表的头部（左边）或者尾部（右边）。

#### 常用命令

在列表左边或右边添加元素。

```bash
lpush/rpush <key> <value1> <value2> ...
```

移出并获取列表左边或右边的第一个元素。

```bash
lpop/rpop <key>
```

移除key1右边的第一个元素，并将该元素添加到key2列表的左边。

```bash
rpoplpush <key1> <key2>
```

获取列表指定范围内的元素。(0表示列表左边第一个元素，-1表示列表右边第一个元素)

```bash
# lrange k1 0 -1
lrange <key> <start> <end>
```

通过索引获取列表中的元素。

```bash
lindex <key> <index>
```

获取列表中元素个数。

```bash
llen <key>
```

在列表指定元素的前/后面插入一个元素。

```bash
linsert <key> before/after <pivot> <value>
```

从左边移除n个相同元素。

```bash
lrem <key> <n> <value>
```

替换指定索引的元素。

```bash
lset <key> <index> <value>
```



#### 数据结构

List的数据结构为快速列表 quicklist。

首先在列表元素较少的情况下会使用一块连续的内存存储元素，这个结构是ziplist，即压缩列表。

它将所有的元素紧挨着一起存储，分配的是一块连续的内存空间。

当数据量比较多的时候，会变成quicklist，一个quicklist由多个ziplist节点组成一个双向链表结构。所以每个quicklist的节点存储的不是一个数据，而是一堆数据。

如果是普通链表，则指针占用的内存开销太大，造成内存浪费。



### 集合 Set

Set和List功能类似，特殊之处在于Set无序，且元素不可重复。当需要存储一个列表数据，且又不希望出现重复数据时，Set是一个好的选择。

Redis的Set是String类型的无序集合。底层是一个value为null的hash表，所以在添加、删除、查找的复杂度为`O(1)`。

#### 常用命令

向集合添加一个或多个成员。

```bash
sadd <key> <member1> <member2> ...
```

返回集合中的所有成员。

```bash
smembers <key>
```

判断 member 元素是否是集合 key 的成员。（返回值1表示成员存在，0表示成员不存在）

```bash
sismember <key> <member>
```

返回集合中成员个数。

```bash
scard <key>
```

移除集合中一个或多个成员。

```bash
srem <key> <member1> <member2> ...
```

随机移除并返回集合中的一个成员。

```bash
spop <key>
```

返回集合中一个或多个随机数。

```bash
# srandmember k1 2 随机获取2个成员
srandmember <key> <count>
```

将集合中的一个成员移动到另一个集合中。

```bash
smove <source> <target> <member>
```

返回两个集合的交集成员。

```bash
sinter <key1> <key2>
```

返回两个集合的并集。

```bash
sunion <key1> <key2>
```

返回两个集合的差集。

```bash
sdiff <key1> <key2>
```



#### 数据结构

Set数据结构是dict字典，字典是用哈希表实现的。

Java中HashSet的内部实现使用的是HashMap，数据存储在HashMap的Key中，Value都指向同一个对象。Redis的Set结构也是如此，它的内部结构使用Hash结构，所有的value都指向同一个内部值。



### 哈希 Hash

Redis的Hash是一个键值对集合，是一个String类型的field-value映射表。哈希特别适合存储对象，类型Java里面的Map<String,Object>。

#### 常用命令

将哈希表 key 中的字段 field 的值设为 value 。

```bash
# hset user id 1 name zhangsan age 3
hset <key> <field> <value> [<field> <value>] ...
```

获取存储在哈希表中指定字段的值。

```bash
# hget user id
hget <key> <field>
```

同时将多个 field-value (域-值)对设置到哈希表 key 中。

```bash
hmset <key> <field> <value> [<field> <value>] ...
```

查看哈希表 key 中，指定的字段是否存在。

```bash
hexist <key> <field>
```

获取哈希表中的所有字段。

```bash
hkeys <key>
```

获取哈希表中的所有字段的值。

```bash
hvals <key>
```

为哈希表 key 中的指定字段的整数值加上增量 increment 。

```bash
hincrny <key> <field> <increment>
```

只有在字段 field 不存在时，设置哈希表字段的值。

```bash
hsetnx <key> <field> <value>
```



#### 数据结构

Hash类型对应的数据结构有两种：ziplist（压缩列表）和hashtable（哈希表）。当field-value长度较短且个数较少时，使用压缩列表，否则使用哈希表。



### 有序集合 ZSet(Sorted Set)

Redis有序集合ZSet与普通的Set非常相似，是一个没有重复元素的字符符串集合。

不同之处是有序集合的每个成员关联了一个评分(score)，这个评分被用来按照从最低分到最高分的方式排序集合中的成员。集合的成员是唯一的，但是评分可以重复。

因为元素是有序的，所以也可以很快的根据评分(score)后者次序(position)来获取一个范围的元素。

访问有序集合的中间元素也是非常快的，因此能够使用有序集合作为一个没有重复成员的智能列表。

集合是通过哈希表实现的，所以添加、删除、查找的复杂度都是 `O(1)`。



#### 常用命令

向有序集合添加一个或多个成员，或者更新已存在成员的分数。

```bash
zadd <key> <score1> <member1> <score2> <member2> ...
```

返回有序集合key中，下标在start和end之间的成员。`withscores`表示结果带有分数

```bash
zrange <key> <start> <end> [withscores]
```

返回有序集合key中，分数在min和max之间的成员。

```bash
zrangebyscore <key> <min> <max> [withscores]
```

返回有序集中指定分数区间内的成员，分数从高到低排序。

```bash
zrevrangebyscore <key> <max> <min> [withscores]
```

有序集合中对指定成员的分数加上增量 increment。

```bash
zincrby <key> <increment> <member>
```

移除有序集合中的成员。

```bash
zrem <key> <member1> <member2> ...
```

计算在有序集合中指定区间分数的成员数。

```bash
zcount <key> <min> <max>
```

返回有序集合中指定成员的索引。

```bash
zrank <key> <member>
```



#### 数据结构

ZSet(Sorted Set)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构Map<String,Double>，可以给每一个元素value赋予一个权重score，另一方面有类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名词，还可以通过score的范围来获取元素的列表。

ZSet底层使用了两种数据结构：

1. Hash，哈希的作用就是关联元素value和权重score，保障元素value的唯一性，可以通过元素value找到相应的score值。
2. 跳跃表，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。



## Redis 发布和订阅

### 介绍

Redis发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。

Redis客户端可以订阅任意数量的频道。

下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的关系：

![img](https://upyun.shiguangping.com/imgs/20210509100328.png)

当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户端：

![img](https://upyun.shiguangping.com/imgs/20210509100345.png)



### 命令

订阅频道。

```bash
subscribe <channel>
```

在指定频道发送消息。

```bash
publish <channel> <message>
```



Client1订阅频道：

![](https://upyun.shiguangping.com/imgs/20210509101241.png)

Client2发送消息：

![image-20210509101310728](https://upyun.shiguangping.com/imgs/20210509101501.png)

Client1会自动接收到来自channel1的消息：

![image-20210509101442837](https://upyun.shiguangping.com/imgs/20210509101447.png)



## Redis 新数据类型

### Bitmaps

Redis提供了Bitmaps这个“数据类型”可以实现对位的操作：

1. Bitmaps本身不是一种数据类型，实际上它就是字符串(key-value)，但是它可以对字符串的位进行操作。
2. Bitmaps单独提供了一套命令，所以在Redis中使用Bitmaps和使用字符串的方法不太相同。可以把Bitmaps想象成一个以位为单位的数组，数组的每个单元只能存储0和1，数组下标在Bitmaps中叫偏移量。



#### 常用命令

对Key所储存的字符串值，设置或清除指定偏移量上的位(bit)。

```bash
setbit <key> <offset> <value>
```

位的设置或清除取决于 `value` 参数，可以是 `0` 也可以是 `1` 。

字符串会进行伸展(grown)以确保它可以将 `value` 保存在指定的偏移量上。当字符串值进行伸展时，空白位置以 `0` 填充。

`offset` 参数必须大于或等于 `0` ，小于 2^32 (bit 映射被限制在 512 MB 之内)。

返回值是偏移量上原来存储的位。

**当设置的偏移量较大时，内存分配可能造成 Redis 服务器被阻塞。**



获取Key所存储的指定偏移量的值。

```bash
getbit <key> <offset>
```

统计Key所存储的字符串被设置为1的位的数量。

```bash
bitcount <key> [start end]
```

 

### HyperLogLog

Redis 在 2.8.9 版本添加了 HyperLogLog 结构。

Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。

在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

但是，因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。



#### 什么是基数

比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。



#### 常用命令

添加指定元素到 HyperLogLog 中。

```bash
pfadd <key> <element1> <element2> ...
```

返回给定 HyperLogLog 的基数估算值。

```bash
pfcount <key1> <key2> ... 
```

将多个 HyperLogLog 合并为一个 HyperLogLog。

```bash
pfmerge <destkey> <sourcekey1> <sourcekey2> ...
```



### Geospatial

Redis GEO 主要用于存储地理位置信息，并对存储的信息进行操作，该功能在 Redis 3.2 版本新增。

Redis GEO 操作方法有：

- geoadd：添加地理位置的坐标。
- geopos：获取地理位置的坐标。
- geodist：计算两个位置之间的距离。
- georadius：根据用户给定的经纬度坐标来获取指定范围内的地理位置集合。
- georadiusbymember：根据储存在位置集合里面的某个地点获取指定范围内的地理位置集合。
- geohash：返回一个或多个位置对象的 geohash 值。



#### 常用命令

添加地理坐标。

```bash
geoadd <key> <longitude> <latitude> <member> [longitude latitude member ...]
```

返回指定成员的地理坐标。

```bash
geopos <key> <member> [member ...]
```

返回两个地理坐标的直线距离。

```bash
geodist <key> <member1> <member2> [m|km|ft|mi]
```

以给定地理坐标为中心，找出给定半径内的所有成员。

```bash
georadius <key> <longitude> <latitude> <radius> <m|km|ft|mi>
```



## Jedis操作Redis

添加Maven依赖。

```xml
<!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
<dependency>
  <groupId>redis.clients</groupId>
  <artifactId>jedis</artifactId>
  <version>3.6.0</version>
</dependency>
```

示例代码。

```java
public static void main(String[] args) {
        // 创建jedis对象
        Jedis jedis = new Jedis("localhost", 6379);

        // 测试连通情况
        String ping = jedis.ping();
        System.out.println(ping); // PONG
  
  			// 关闭jedis连接
        jedis.close();
    }
```

Jedis提供了大多数Redis操作的方法。



## SpringBoot整合Redis

添加Maven依赖。

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-redis -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
  <version>2.4.5</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-pool2 -->
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-pool2</artifactId>
  <version>2.9.0</version>
</dependency>
```

写配置。

```yaml
spring:
  redis:
    host: localhost # 主机地址
    port: 6379 # 端口号
    password: # 密码
    database: 0 # 数据库索引，默认0
    timeout: 1800000 # 连接超时时间（毫秒）
    lettuce:
      pool:
        max-active: 20 # 连接池最大连接数（使用负值表示没有限制）
        max-wait: -1 # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-idle: 5 # 连接池中的最大空闲连接
        min-idle: 0 # 连接池中的最小空闲连接
```

配置类。*通过redisTemplate对象完成Redis操作*

```java
package net.pjsk.demo.configuration;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@EnableCaching
@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        // 配置连接工厂
        template.setConnectionFactory(factory);

        //使用Jackson2JsonRedisSerializer来序列化和反序列化redis的value值（默认使用JDK的序列化方式）
        Jackson2JsonRedisSerializer jacksonSeial = new Jackson2JsonRedisSerializer(Object.class);

        ObjectMapper om = new ObjectMapper();
        // 指定要序列化的域，field,get和set,以及修饰符范围，ANY是都有包括private和public
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 指定序列化输入的类型，类必须是非final修饰的，final修饰的类，比如String,Integer等会跑出异常
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jacksonSeial.setObjectMapper(om);

        // 值采用json序列化
        template.setValueSerializer(jacksonSeial);
        //使用StringRedisSerializer来序列化和反序列化redis的key值
        template.setKeySerializer(new StringRedisSerializer());

        // 设置hash key 和value序列化模式
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(jacksonSeial);
        template.afterPropertiesSet();

        return template;
    }

}
```



## Redis 事务

Redis事务是一个单独的隔离操作：事务中的所有命令都会序列化，按顺序执行。事务在执行过程中，不会被其他客户端发送来的命令请求所打断。

Redis事务的主要作用就是**串联多个命令**，防止被其他命令插队打断。



Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：

- 批量操作在发送 EXEC 命令前被放入队列缓存。
- 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
- 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。



一个事务从开始到执行会经历以下三个阶段：

- 开始事务。
- 命令入队。
- 执行事务。



| 命令    | 作用                                 |
| ------- | ------------------------------------ |
| multi   | 开始事务                             |
| exec    | 执行事务                             |
| discard | 取消事务，放弃执行事务块内的所有命令 |

![image-20210509223138651](https://upyun.shiguangping.com/imgs/20210509223139.png)

`MULTI`开启事务，向队列中添加命令，如果想取消这个事务，可以使用`DISCARD`命令放弃这次事务。



### 事务冲突

事务冲突问题小栗子：

一个账户里有一万块钱，有三个人同时使用这一个支付账户网购：

1. A准备购买8000元的商品；
2. B准备购买3000元的商品；
3. C准备购买1000元的商品；

![image-20210509231153470](https://upyun.shiguangping.com/imgs/20210509231153.png)

A、B、C三个人在购买前获取到账户的余额都是10000万，开始购物，最后账户余额是个负数，这种结果是不合理的。



#### 悲观锁

悲观锁(Pessimistic Lock)，顾名思义，就是很悲观，每次去拿数据的时候都认为别人会去修改，所以每次再拿数据时都会上锁，这样别人想拿这个数据就会block，直到他拿到锁。

传统的关系型数据库里边就用到了很多这种锁机制，比如：行锁、表锁等，读锁、写锁等，都是在操作之前先上锁。

![image-20210509232400929](https://upyun.shiguangping.com/imgs/20210509232401.png)



#### 乐观锁

乐观锁(Optimistic Lock)，顾名思义，就是很乐观，每次去拿数据的时候都认为被人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有更新这个数据，可以使用版本号等机制。

乐观锁适用于多读的应用类型，这样可以提高吞吐量。Redis就是利用这种check-and-set机制实现事务的。

![image-20210509233322505](https://upyun.shiguangping.com/imgs/20210509233322.png)



#### WATCH key [key ...]

`WATCH key [key ...]`实现乐观锁。

在执行`MULTI`之前，先执行`WATCH key1 [key2 ...]`，可以监视一个（或多个）key，如果在事务执行之前这个（或这些）key被其他命令所改动，那么事务将被打断。



## Redis 持久化

Redis提供了2种不同形式的持久化方式：

1. RDB(Redis DataBase)
2. AOF(Append Of File)



### RDB 方式

**RDB**是指在指定的**时间间隔**内将内存中的数据集快照写入磁盘，也就是行话将的Snapshot快照，它恢复时是将快照文件直接读到内存中。



#### 配置文件

`dir`，设置快照文件存储的目录。（`./`当前目录）

![image-20210511100350008](https://upyun.shiguangping.com/imgs/20210511100350.png)



`dbfilename`，快照文件名。

![image-20210511100449817](https://upyun.shiguangping.com/imgs/20210511100449.png)

`save`，保存快照的策略。

![image-20210511100616473](https://upyun.shiguangping.com/imgs/20210511100616.png)



`stop-writes-on-bgsave-error`，当Redis无法写入磁盘的话，直接关掉Redis的写操作。（推荐yes）

![image-20210511101840490](https://upyun.shiguangping.com/imgs/20210511101840.png)



`rdbcompression`，对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，Redis会采用LZF算法进行压缩。

![image-20210511102032467](https://upyun.shiguangping.com/imgs/20210511102032.png)



`rdbchecksum`，在存储快照后，可以让Redis使用CRC64算法来进行数据完整性校验，但会增加大约10%性能上的消耗。

![image-20210511101948461](https://upyun.shiguangping.com/imgs/20210511101948.png)



#### 命令

可以通过调用命令手动执行持久化操作。

**SAVE**

执行`save`命令时，Redis只管保存，其他不管，全部阻塞。

**BGSAVE**

Redis会在后台异步执行保存操作，同时还可以响应客户端请求。



#### 持久化执行过程

Redis会单独创建(fork)一个子进程来进行持久化，它会先将数据写到一个临时文件中，待持久化过程都结束，再用这个临时文件去替换上次持久化好的文件。

在整个过程中，主进程是不进行任何I/O操作的，这就确保了Redis的性能。如果需要进行大规模数据恢复，且对于数据恢复完整性上不是非常敏感，那么RDB方式要比AOF方式效率高。

RDB的缺点也很显然，如果Redis突然发生意外，可能会有一段时间的数据没来得及持久化而丢失。



#### Fork

Fork的作用是复制一个与当前进程一样的进程。新进程的所有数据（变量、环境变量、程序计数器等）数值与原进程一直，但是是一个全新的进程，并作为原进程的子进程。

在Linux程序中，fork()会产生一个和父进程完全相同的子进程，但子进程在此后多会exec系统调用，出于效率考虑，Linux中引入了“写时复制”技术。

一般情况父进程和子进程会共用同一段物理内存，只有进程空间的各段的内容要发生变化时，才会将父进程的内容复制一份给子进程。



#### RDB 恢复备份

在自动RDB或Redis关机时，都会执行RDB操作，将Redis中的数据保存到`*.rdb`文件中。在Redis开机启动时，会自动读取`*.rdb`文件，恢复文件里面的数据到Redis。



### AOF 方式

AOF会将每次写操作的指令追加到AOF文件当中。当Redis重启时，会加载AOF文件，恢复操作从而恢复数据。

#### 配置文件

`appendonly`，AOF功能默认不开启。

![image-20210511105526183](https://upyun.shiguangping.com/imgs/20210511105526.png)



`appendfilename`，AOF存储文件的名子。

![image-20210511105727166](https://upyun.shiguangping.com/imgs/20210511105727.png)

**AOF文件与RDB文件存储路径一致。**



`appendfsync`，同步频率设置。

![image-20210511111124115](https://upyun.shiguangping.com/imgs/20210511111124.png)

有三种策略可选：

- always，始终同步，每次Redis的写入都会立刻记录日志；性能较差但数据完整性最好；
- everysec，每秒同步，每秒记录一次写操作。如果Redis发生意外，本秒的数据可能丢失；（推荐）
- no，Redis不主动同步，把同步时机交给操作系统。



#### RDB和AOF同时开启，Redis启动时加载哪一个？

RDB和AOF同时开启，Redis在启动时默认读取AOF的数据（保证数据不会丢失）。



#### Rewrite 压缩

AOF采用文件追加方式，文件会越来越大。为此Redis提供了一种重写机制，当AOF文件的大小超过设定的阈值时，Redis就会启动AOF文件内容压缩，只保留可以恢复数据的最小指令集。也可以手动执行`BGREWRITEAOF`命令重写AOF文件。

**AOF是如何实现重写的？**

AOF文件持续增加而过大时，会fork出一条新进程来将文件重写（也是先写入临时文件，最后再替换），Redis4.0版本后的重写，是将已完成的RBD快照，以二进制的形式放到AOF文件头部，替换掉AOF中保存的一大堆操作命令集，从而使AOF文件大小降到最小。



**重写的触发时机**

![image-20210511112908701](https://upyun.shiguangping.com/imgs/20210511112908.png)

通过`redis.conf`配置阈值。



# 参考

- [Redis中文文档](http://www.redis.cn/documentation.html)
