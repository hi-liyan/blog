---
id: springboot-application-context-initializer
title: SprintBoot 应用上下文初始化器
---

>本文内容：
>
>- 如何自定义系统初始化器
>- 注册自定义系统初始化器的三种方式

## 自定义系统初始化器与注册
通过实现`ApplicationContextInitializer`接口自定义系统初始化器，使用`@Order`注解配置加载顺序。  
注册自定义系统初始化器有三种方式：
1. 在META-INF下的`spring.factories`文件中注册，键值：org.springframework.context.ApplicationContextInitializer
2. 在启动类中通过SpringApplication实例对象调用addInitializers()方法添加
3. 在`application.properties`中配置，键值：context.initialicer.classes，（这种方式配置的加载顺序优先其他）

## 代码示例

### 方式一

新建包`initailizer`，创建`FirstInitializer`类，实现`ApplicationContextInitializer`接口。

```java
package net.pjsk.sb.initializer;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

/**
 * @author liyan
 * @date 2021.2.28
 */
@Order(1)
public class FirstInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {


  @Override
  public void initialize(ConfigurableApplicationContext configurableApplicationContext) {

    // 获取环境
    ConfigurableEnvironment environment = configurableApplicationContext.getEnvironment();

    // 要初始化的参数
    Map<String, Object> map = new HashMap<>();
    map.put("key1", "自定义系统初始化器1");
    MapPropertySource firstInitializer = new MapPropertySource("firstInitializer", map);

    // 将自定义的参数Map加入到环境属性中
    environment.getPropertySources().addLast(firstInitializer);
    System.out.println("--> 系统初始化器1");
  }
}
```



注册自定义系统初始化器，在`resources`目录下新建`META-INF`目录，并创建`spring.factories`文件。将自定义的系统初始化器配置进来完成注册。

```factories
org.springframework.context.ApplicationContextInitializer=net.pjsk.sb.initializer.FirstInitializer
```

测试

在`service`包中创建`TestService`类并实现`ApplicationContextAware`接口。在这个接口中可以拿到应用上下文对象`applicationContext`。

```java
package net.pjsk.sb.service;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

@Service
public class TestService implements ApplicationContextAware {

  private ApplicationContext applicationContext;

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    this.applicationContext = applicationContext;
  }

  public String test() {
    // 获取系统初始化器中自定义的属性
    return applicationContext.getEnvironment().getProperty("key1");
  }
}
```



在controller中写方法测试。

```java
@GetMapping("/test")
public String test() {
  return this.testService.test();
}
```



浏览器访问接口。

![image-20210228110048191](https://upyun1.surcode.cn/imgs/20210228110048.png)

控制台打印。

![image-20210228110153815](https://upyun1.surcode.cn/imgs/20210228110153.png)



### 方式二


```java
package net.pjsk.sb.initializer;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

@Order(2)
public class SecondInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
  @Override
  public void initialize(ConfigurableApplicationContext configurableApplicationContext) {

    ConfigurableEnvironment environment = configurableApplicationContext.getEnvironment();

    Map<String, Object> map = new HashMap<>();
    map.put("key2", "自定义系统初始化器2");

    MapPropertySource secondInitializer = new MapPropertySource("secondInitializer", map);
    environment.getPropertySources().addLast(secondInitializer);
    System.out.println("--> 系统初始化器2");
  }
}

```

在启动类的main方法中添加系统初始化器，实例化`SpringApplication`对象，通过该对象调用`addInitializer()`方法添加自定义的系统初始化器。

```java
package net.pjsk.sb;

import net.pjsk.sb.initializer.SecondInitializer;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

/**
 * @author liyan
 * @date 2021.2.27
 */
@SpringBootApplication
@MapperScan(value = "net.pjsk.sb.mapper")
public class SbApplication {

  public static void main(String[] args) {
    SpringApplication application = new SpringApplication(SbApplication.class);
    // 添加系统初始化器
    application.addInitializers(new SecondInitializer());
    application.run(args);
  }
}
```
测试

修改TestService中的方法，获取'key2'的值。

浏览器访问。

![image-20210228110558656](https://upyun1.surcode.cn/imgs/20210228110558.png)

控制台打印。

![image-20210228110618763](https://upyun1.surcode.cn/imgs/20210228110618.png)



### 方式三

```java
package net.pjsk.sb.initializer;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

@Order(3)
public class ThirdInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
  @Override
  public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
    ConfigurableEnvironment environment = configurableApplicationContext.getEnvironment();

    Map<String, Object> map = new HashMap<>();
    map.put("key3", "自定义系统初始化器3");

    MapPropertySource thirdInitializer = new MapPropertySource("thirdInitializer", map);
    environment.getPropertySources().addLast(thirdInitializer);

    System.out.println("--> 系统初始化器3");
  }
}
```

在`application.yaml`中配置自定义的系统初始化器。

```yaml
# 系统初始化器
context:
  initializer:
    classes: net.pjsk.sb.initializer.ThirdInitializer
```

测试
浏览器访问。

![image-20210228111419344](https://upyun1.surcode.cn/imgs/20210228111419.png)

控制台打印。

![image-20210228111437838](https://upyun1.surcode.cn/imgs/20210228111437.png)



## 总结

1. 自定义系统初始化器，需要实现`ApplicationContextInitializer`接口；
2. 三种注册方式:
    1. 通过`spring.factories`配置，键值：`org.springframework.context.ApplicationContextInitializer`
    2. 通过启动类中的`SpringApplication`对象调用`addInitializer()`添加初始化器。
    3. 在`application.yaml`中配置，键值：`context.initializer.classes`
3. `@Order`的数值越小，优先级越高。`application.yaml`中配置的优先级高于其他方式。

