---
title: SpringBoot之-手写一个Starter
date: 2021-01-13
category:
- SpringBoot学习
tags:
- SpringBoot
---



## 手写Starter

### 创建项目

创建一个Maven项目，或者通过Spring Initializr创建一个Spring Boot项目，添加Maven依赖：

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.1</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.shiguangping</groupId>
    <artifactId>simple-spring-boot-starter</artifactId>
    <version>1.0.0</version>

    <name>simple-spring-boot-starter</name>
    <description>手写一个starter演示</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-autoconfigure</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <skip>true</skip>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```



>**Starter 命名规范：**
>
>Spring官方Starter命名通常为：`spring-boot-starter-{name}`
>
>Spring官方建议非官方的Starter命名遵循：`{name}-spring-boot-starter`格式



### 编写Service

service中写了一个拼接字符串的方法，定义了前缀和后缀两个成员变量，方法返回拼接后的字符串。

ExampleService.java

```java
package com.shiguangping.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 示例Service
 *
 * @author liyan
 * @since 2021.1.13
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExampleService {

    private String prefix;

    private String suffix;

    /**
     * 拼装字符串
     *
     * @param word
     * @return
     */
    public String wrap(String word) {
        return prefix + word + suffix;
    }
}
```



### 编写属性类

ExampleServiceProperties.java

```java
package com.shiguangping.configure;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 属性
 *
 * @author liyan
 * @since 2021.1.13
 */
@Data
@ConfigurationProperties(prefix = "example.service")
public class ExampleServiceProperties {

    private String prefix;

    private String suffix;
}
```



### 编写自动配置类

ExampleAutoConfigure.java

```java
package com.shiguangping.configure;

import com.shiguangping.service.ExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 自动配置类
 *
 * @author liyan
 * @since 2021.1.13
 */
@Configuration
@ConditionalOnClass(ExampleService.class)
@EnableConfigurationProperties(ExampleServiceProperties.class)
public class ExampleAutoConfigure {

    @Autowired
    private ExampleServiceProperties properties;

    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnProperty(prefix = "example.service", value = "enabled", havingValue = "true")
    ExampleService exampleService() {
        return new ExampleService(properties.getPrefix(), properties.getSuffix());
    }
}
```



### 添加spring.factories

在`resources/META-INF/`下创建`spring.factories`文件：

```factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.shiguangping.configure.ExampleAutoConfigure
```

如果有多个自动配置类，用逗号分隔换行。Spring Boot会最先到META-INF下寻找自动配置类。



### 打包

终端运行`mvn install`命令，将项目打包并发布到本地的Maven仓库。

如果是Spring Boot项目，需要在插件配置中添加`skip`标签：

pom.xml

```xml
<plugin>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-maven-plugin</artifactId>
  <configuration>
    <skip>true</skip>
    <excludes>
      <exclude>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
      </exclude>
    </excludes>
  </configuration>
</plugin>
```



## 测试

新建一个Spring Boot项目，引入Maven依赖：

```xml
<dependency>
  <groupId>com.shiguangping</groupId>
  <artifactId>simple-spring-boot-starter</artifactId>
  <version>1.0.0</version>
</dependency>
```

修改配置文件`application.yml`，添加如下内容：

```yaml
example:
  service:
    enabled: true
    suffix: Nice
    prefix: Hello
```

编写测试类：

```java
package com.example.demo.simple;

import com.shiguangping.service.ExampleService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class SimpleTest {

    @Autowired
    private ExampleService exampleService;

    @Test
    public void test(){
        String s = exampleService.wrap("Java");
        System.out.println(s);
    }

}
```

运行结果：

```
HelloJavaNice
```

手写Starter引用成功~



## 总结

1. Spring Boot启动时会先扫描引入的所有依赖，寻找带有`spring.factories`文件的Jar包；
2. 根据`spring.factories`文件加载`AutoConfigure`类；
3. 根据自动配置类中`@Conditional`注解的条件，进行自动配置，并将Bean注册到Spring容器当中。



## Github源码

[springboot-starter](https://github.com/ENNRIaaa/SpringBootShip/tree/main/springboot-starter)

