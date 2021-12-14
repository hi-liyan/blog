---
id: elasticsearch-quick-start
title: ElasticSearch 快速开始
---

## ElasticSearch 快速开始

### 加依赖

```xml
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch-rest-high-level-client</artifactId>
    <version>7.14.0</version>
</dependency>
```
由于SpringBoot也做了对ES的版本管理，如果项目中的ES版本不是当前实际使用的版本，需要重新指定版本号。(ES依赖的版本必须和使用的ES版本匹配)
```xml
<properties>
    <!-- 这里需要将ES版本设置成当前实际使用的版本 -->
    <elasticsearch.version>7.14.0</elasticsearch.version>
</properties>
```



### 写配置

```java
@Configuration
public class ElasticSearchConfig {

    // 这两个属性配置在yml中了
    @Value("${es.host}")
    private String host;
    @Value("${es.port}")
    private Integer port;

    // 在使用ES客户端时会用到
    public static final RequestOptions COMMON_OPTIONS;
    static {
        RequestOptions.Builder builder = RequestOptions.DEFAULT.toBuilder();
        COMMON_OPTIONS = builder.build();
    }

    @Bean
    public RestHighLevelClient restHighLevelClient() {
        return new RestHighLevelClient(RestClient.builder(
                new HttpHost(host, port, "http")
        ));
    }
}
```



### 测试

```java
/**
 * 测试保存数据到ES
 */
@Test
public void index(){
    // 1. 创建IndexRequest实例，指定索引
    IndexRequest indexRequest = new IndexRequest("users");
    indexRequest.id("1"); // 设置id

    User user = new User("李达康", 45, "男");
    // 2. 将要保存到ES中的对象转为Json字符串存进去
    indexRequest.source(JSON.toJSONString(user), XContentType.JSON);

    // 3. 调用index()方法执行保存操作，这里用到了配置类中定义的COMMON_OPTIONS
    IndexResponse indexResponse = client.index(indexRequest, ElasticSearchConfig.COMMON_OPTIONS);
    
    System.out.println(JSON.toJSONString(indexResponse));
}
```



### 参考

- [ElasticSearch 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.14/index.html)
- [Java High Level REST Client 文档](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high.html)



## Docker 安装 ElasticSearch

通过docker-compose安装
```yaml
version: '2'
services:
  elasticsearch:
    image: elasticsearch:7.14.0
    container_name: elasticsearch
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - /Users/liyan/docker-data/elasticsearch/data:/usr/share/elasticsearch/data
      - /Users/liyan/docker-data/elasticsearch/plugins:/usr/share/elasticsearch/plugins
    environment:
      - discovery.type=single-node

  kibana:
    image: kibana:7.14.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://192.168.2.2:9200
```
说明：
- 安装时最好将`plugins`目录挂载到本地，方便安装插件。
- `Kibana`是Elastic可视化工具。



### 参考

- [Running the Elastic Stack on Docker 文档](https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-docker.html)