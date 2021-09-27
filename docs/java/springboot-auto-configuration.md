---
title: Spring Boot之-浅度解析自动配置运作原理
date: 2021-4-19
category:
- SpringBoot学习
tags:
- SpringBoot
---



>自动配置是Spring Boot的核心功能，我们可以直接引入所需的Starters，Spring Boot就会在项目启动时自动加载相关依赖，配置相应的初始化参数，为我们提供了更加便捷的集成第三方应用的方式。
>
><br>
>
>本文基于Spring Boot 2.4.5撰写，随着版本更新，部分源码可能会有修改。
>
><br>
>
>解读源码是一个比较大的工程，在理解方面难免会有错误和不到位的地方，恳请读者在页面底部评论区留言指正，谢谢。



<br>

# 自动配置原理概述

![image-20210419232036104](https://images.shiguangping.com/imgs/20210419232036.png)

图中描述了Spring Boot自动配置实现涉及的几个核心的功能及其相互之间的关系，包括`@EnableAutoConfiguration`注解、`spring.factories`文件、该文件中描述的`XxxAutoConfiguration`类、`@Conditional`注解以及`Starters`。

<br>

一句话概括就是：Spring Boot通过`@EnableAutoConfiguration`注解开启自动配置功能，项目启动时扫描所有jar包中META-INF目录下的`spring.factories`配置文件，并加载该文件中注册的`XxxAutoConfigutation`类，当某个`XxxAutoConfiguration`类满足其注解`@Conditional`指定的生效条件时，实例化该`XxxAutoConfiguration`类中定义的Bean，并注入到Spring容器中，实现了自动配置流程。

<br>

- `@EnableAutoConfiguration`注解：该注解由组合注解`@SpringBootApplication`引入，完成自动配置功能开启，扫描各个jar包下的spring.factories文件，并加载文件中注册的AutoConfiguration类等。
- `spring.factories`配置文件：该文件位于jar包的`META-INF`目录下，按照指定格式注册了AutoConfiguration类。`spring.factories`也可以包含其他类型待注册的类。该配置文件不仅存在于Spring Boot项目中，也可以存在于自定义的自动配置（或Starters）项目中。
- `AutoConfiguration`类：自动配置类，代表了Spring Boot中一类以`XXXAutoConfiguration`命名的自动配置类。其中定义了集成第三方组件所需的初始化Bean和条件。
- `@Conditional`注解：条件注解及其衍生注解，定义在`AutoConfiguration`类，当满足该注解的生效条件时，才会实例化AutoConfiguration类。
- `Starters`：第三方组件的依赖及配置，Spring Boot已经预置的组件。Spring Boot默认的Starters项目往往只包含了一个pom依赖的项目。如果是自定义的Starter，该项目还需要包含`spring.factories`文件，`AutoConfiguration`类和其他配置类。

<br>

# @EnableAutoConfiguration解析

> 该注解用于开启Spring Boot自动配置功能，它是通过@SpringBootApplication注解完成引入的。

<br>

## 入口类和@SpringBootApplication注解

Spring Boot项目创建完成会默认生成一个*Application的入口类（启动类）。入口类的命名格式一般是`artifacId+Application`，该类由`@SpringBootApplication`注解，类里包含一个`main`方法，通过main方法启动Spring Boot项目，代码如下。

```java
@SpringBootApplication
public class SpringLearnApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringLearnApplication.class, args);
    }

}
```

<br>

这里的`main`方法是一个普通的Java应用的main方法，用于启动Spring Boot项目的入口。

在Spring Boot项目入口类中，只有一个注解`@SpringBootApplication`，它由多个核心功能的注解组合而成，其中包括用于开启自动配置的`@EnableAutoConfiguration`。

`@SpringBootApplication`部分源代码如下。

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {

	// 排除指定自动配置类
	@AliasFor(annotation = EnableAutoConfiguration.class)
	Class<?>[] exclude() default {};

	// 排除指定自动配置类名
	@AliasFor(annotation = EnableAutoConfiguration.class)
	String[] excludeName() default {};

	// 指定扫描的基础包，激活注解组件的初始化
	@AliasFor(annotation = ComponentScan.class, attribute = "basePackages")
	String[] scanBasePackages() default {};

	// 指定扫描的类，用于初始化
	@AliasFor(annotation = ComponentScan.class, attribute = "basePackageClasses")
	Class<?>[] scanBasePackageClasses() default {};
	
  // 指定是否代理@Bean方法以强制执行bean的生命周期行为
	@AliasFor(annotation = Configuration.class)
	boolean proxyBeanMethods() default true;

}
```

<br>

从源码中可以看出，`@SpringBootApplication`注解中提供了以下几个成员属性（注解中的成员属性以方法的形式体现）。

- `exclude`：根据类（Class）排除指定的自动配置，该成员属性覆盖了`@EnableAutoConfiguration`中定义的`exclude`属性。
- `excludeName`：根据类名排除指定的自动配置，覆盖了`@EnableAutoConfiguration`中的`excludeName`属性。
- `scanBasePackages`：指定要扫描的基础包，用于激活`@Component`等注解类的初始化。
- `scanBasePackageClasses`：扫描指定的类，用于组件的初始化。
- `proxyBeanMethods`：指定是否代理`@Bean`方法以强制执行Bean的生命周期行为。默认值为true。

<br>

通过源代码可以看到，`@SpringBootApplication`注解中的成员属性被`@AliasFor`注解，该注解用于将属性桥接到其他注解上，`@AliasFor(annotation=XXX.class)`指定了要桥接的类。

<br>

`@SpringBootApplication`注解组合了`@SpringBootConfiguration`、`@EnableAutoConfiguration`、`@ComponentScan`三个注解。因此在入口类中可以使用这三个注解代替`@SpringBootApplicaiton`，代码如下。

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @ComponentScan.Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
        @ComponentScan.Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public class SpringLearnApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringLearnApplication.class, args);
    }
}
```

<br>

在Spring Boot早期版本中并没有`@SpringBootConfiguration`注解，版本升级后新增了`@SpringBootConfiguration`注解并在其内组合了`@Configuration`。`@EnableAutoConfiguration`注解组合了`@AutoConfigurationPackage`。

![image-20210420090423298](https://images.shiguangping.com/imgs/20210420090423.png)

如图所示，`@SpringBootApplication`包含了如下几个核心功能：

- 激活自动配置的`@EnableAutoConfiguration`
- 激活`@Component`类扫描的`@ComponentScan`
- 激活配置类的`@Configuration`

<br>

## @EnableAutoConfiguration功能解析

在未使用Spring Boot情况下，Bean的生命周期是由Spring管理，但是Spring无法自动配置`@Configuration`注解的配置类。而Spring Boot的核心功能之一就是根据约定自动配置该注解标注的类。实现该功能的组件之一便是`@EnableAutoConfiguration`注解。

`@EnableAutoConfiguration`注解位于`spring-boot-autoconfigure`包内，当使用`@SpringBootApplicaiton`注解时，该注解会自动生效。

`@EnableAutoConfiguration`的主要功能是在启动Spring应用程序上下文时根据约定自动配置可能需要的Bean。

<br>

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {

	// 用来覆盖开启/关闭自动配置功能
	String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

	// 根据类(Class)排除指定的自动配置
	Class<?>[] exclude() default {};

	// 根据类名排除指定的自动配置
	String[] excludeName() default {};

}
```

`@EnableAutoConfiguration`注解中提供了一个常量和两个成员属性：

- `ENABLED_OVERRIDE_PROPERTY`：用来覆盖开启/关闭自动配置功能
- `exclude`：根据类(Class)排除指定的自动配置
- `excludeName`：根据类名排除指定的自动配置

<br>

`@EnableAutoConfiguration`会根据初始配置自动注册可能使用的Bean，但如果你并不需要它预置的初始化Bean，可以通过注解的`exclude`或`excludeName`属性进行排除。例如，当不需要数据库的自动配置时，可以通过以下两种方式让其失效。

```java
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class SpringLearnApplication {
  
}
```

或（自定义的配置类）：

```java
@Configuration
@EnableAutoConfiguration(exclude = DataSourceAutoConfiguration.class)
public class DemoConfiguration {
  
}
```

<br>

`@EnableAutoConfiguration`注解由两个注解组合而成，分别是`@AutoConfigurationPackage`和`@Import(AutoConfigurationImportSelector.class)`。前者和自动配置包有关，后者则是与Spring Boot自动配置选择性导入有关（Spring中的`ImportSelector`是用来导入配置类的，通常是基于某些条件注解`@ConditionalOnXxx`来决定是否导入某个配置类）。

下面重点分析`AutoConfigurationImportSelector`类。

<br>

## AutoConfigurationImportSelector类解析

`@EnableAutoConfiguration`的关键功能是通过`@Import`注解导入的`ImportSelector`来完成的。从源代码也可以看出，`@Import(AutoConfigurationImportSelector.class)`是`@EnableAutoConfiguration`注解的组成部分，也是自动配置功能的核心实现者。

`@Import(AutoConfigurationImportSelector.class)`又可以分为两部分：`@Import`和对应的`ImportSelector`接口。这里主要解析`@Import`注解的基本使用方法和`ImportSelector`的实现类`AutoConfigurationImportSelector`。

<br>

### @Import注解

`@Import`注解位于`spring-context`项目内，主要提供导入配置类的功能。如果查看Spring Boot的源代码，会发现有大量的`EnableXxx`类都是用了该注解。

`@Import`注解源代码如下。

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Import {
  
	Class<?>[] value();

}
```

<br>

`@Import`的作用和xml配置中的`<import/>`标签的作用一样，我们可以通过该注解引入`@Configuration`注解的类，也可以导入实现了`ImportSelector`接口或`ImportBeanDefinitionRegistrar`的类，还可以通过`@Import`导入普通的POJO（将其注册成Spring Bean，导入POJO需要Spring 4.2以上版本）。



### ImportSelector接口

`@Import`的许多功能都需要借助`ImportSelector`接口来实现，由该接口决定可以引入哪些`@Configuration`注解的配置类。`ImportSelector`接口源代码如下。

```java
public interface ImportSelector {

	/**
	 * Select and return the names of which class(es) should be imported based on
	 * the {@link AnnotationMetadata} of the importing @{@link Configuration} class.
	 * @return the class names, or an empty array if none
	 */
	String[] selectImports(AnnotationMetadata importingClassMetadata);

	@Nullable
	default Predicate<String> getExclusionFilter() {
		return null;
	}

}
```

`ImportSelector`接口提供了一个`selectImports()`方法，返回一个字符串数组。其中参数`AnnotationMatedata`内包含了被`@Import`注解的类的注解信息。

在`selectImports()`方法内可以根据具体实现决定返回哪些配置类的全限定类名，将结果以字符串数组的形式返回。

如果实现了接口`ImportSelector`的类同时又实现了以下四个`Aware`接口，那么Spring保证在调用`ImportSelector`之前会先调用`Aware`接口的方法。这四个接口为：

- EnvironmentAware
- BeanFactoryAware
- BeanClassLoaderAware
- ResourceLoaderAware

<br>

![image-20210426224039223](https://images.shiguangping.com/imgs/20210426224039.png)

在`AutoConfigurationImportSelector`类中就实现了这四个接口。

```java
import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.context.annotation.DeferredImportSelector;
import org.springframework.core.Ordered;

public class AutoConfigurationImportSelector implements DeferredImportSelector, BeanClassLoaderAware,
		ResourceLoaderAware, BeanFactoryAware, EnvironmentAware, Ordered {
      
}
```

`AutoConfigurationImportSelector`类并没有直接实现`ImportSelector`接口，而是实现了它的子接口`DeferredImportSelector`。

`DeferredImportSelector`接口与`ImportSelector`接口的区别是，前者会在所有的`@Configuration`类加载完成之后再加载返回的配置类，而`ImportSelector`是在加载完`@Configuration`类之前先去加载返回的配置类。

`DeferredImportSelector`的加载顺序可以通过`@Order`注解或实现`Ordered`接口来指定。同时，`DeferredImportSelector`提供了`getImportGroup()`方法来跨`DeferredImportSelector`实现自定义Configuration的加载顺序。

<br>

### AutoConfigurationImportSelector功能概述

![image-20210420105809752](https://images.shiguangping.com/imgs/20210420105809.png)

当`AutoConfigurationImportSelector`类被`@Import`注解引入后，它的`selectImports()`方法会被调用并执行其具体实现的自动配置逻辑。该方法几乎涵盖了组件自动配置的所有处理逻辑实现。

`selectImports()`方法源代码如下。

```java
@Override
public String[] selectImports(AnnotationMetadata annotationMetadata) {
  // 检查自动配置功能是否开启（默认为开启状态）
  if (!isEnabled(annotationMetadata)) {
    return NO_IMPORTS;
  }
  // 获得自动配置类的信息
  AutoConfigurationEntry autoConfigurationEntry = getAutoConfigurationEntry(annotationMetadata);
  // 返回符合条件的配置类的全限定类名数组
  return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
}

protected AutoConfigurationEntry getAutoConfigurationEntry(AnnotationMetadata annotationMetadata) {
  if (!isEnabled(annotationMetadata)) {
    return EMPTY_ENTRY;
  }
  // 得到@EnableAutoConfiguration注解中的两个属性:"exclude"和"excludeName"
  AnnotationAttributes attributes = getAttributes(annotationMetadata);
  // 通过SpringFactoriesLoader类提供的方法加载类路径中的META-INF目录下的spring.factories文件中针对EnableAutoConfiguration的注册配置类
  List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);
  // 对获得的注册配置类集合进行去重处理，防止多个项目引入同样的配置类
  configurations = removeDuplicates(configurations);
  // 获得注解中被exclude和excludeName所排出的类的集合
  Set<String> exclusions = getExclusions(annotationMetadata, attributes);
  // 检查要排除的类是否可实例化，是否被自动注册配置所使用，不符合条件则抛出异常
  checkExcludedClasses(configurations, exclusions);
  // 从自动配置类集合中去除被排除的类
  configurations.removeAll(exclusions);
  // 检查配置类的注解是否符合spring.factories文件中AutoConfigurationImportFilter指定的注解检查条件
  configurations = getConfigurationClassFilter().filter(configurations);
  // 将筛选完成的配置类和排出的配置类构建为事件类，并传入监听器。监听器的配置在于spring.factories文件中，通过AutoConfigurationImportListener指定
  fireAutoConfigurationImportEvents(configurations, exclusions);
  // 最终返回配置类的信息
  return new AutoConfigurationEntry(configurations, exclusions);
}
```

<br>

首先，是谁调用了`selectImports()`方法呢？

<br>

接下来详细解析`selectImports()`方法每一步都做了什么。

<br>

### @EnableAutoConfiguration自动配置开关

`AutoConfigurationImportSelector`类中`selectImports()`方法中第一段代码就是检查自动配置是否开启。

```java
@Override
public String[] selectImports(AnnotationMetadata annotationMetadata) {
  if (!isEnabled(annotationMetadata)) {
    return NO_IMPORTS;
  }
  // ...
}

protected boolean isEnabled(AnnotationMetadata metadata) {
  // 如果当前类是AutoConfigurationImportSelector，则获取环境中spring.boot.enableautoconfiguration属性的值，默认为true
  if (getClass() == AutoConfigurationImportSelector.class) {
    return getEnvironment().getProperty(EnableAutoConfiguration.ENABLED_OVERRIDE_PROPERTY, Boolean.class, true);
  }
  // 如果是其他类，默认返回true
  return true;
}
```

通过`isEnable()`方法可以看出，如果当前类为`AutoConfigurationImporlSelector`类，程序会从环境中获取Key为`EnableAutoConfiguration.ENABLED_OVERRIDE_PROPERTY`的值，该常量定义在`EnableAutoConfiguration`注解中（该常量值如下）。 

```java
String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";
```

如果在环境中获取不到该Key的值，默认值返回true，也就是默认开始自动配置功能。如果当前类为其他类，直接返回true。

<br>

如果要关闭自动配置，则可以在`application.properties`或`application.yaml`配置文件中重写该属性。以`application.yaml`配置为例。

```yaml
spring.boot.enableautoconfiguration: false
```

<br>

### @EnableAutoConfiguration加载元数据配置

加载元数据配置主要是为后续操作提供数据支持，将不满足条件的自动配置类筛选掉。该功能代码位于`AutoConfigurationImportSelector`类中的私有的静态内部类中，代码如下。

```java
// 配置类过滤器
private static class ConfigurationClassFilter {

  private final AutoConfigurationMetadata autoConfigurationMetadata;

  private final List<AutoConfigurationImportFilter> filters;

  // 在构造器中完成加载元数据配置的过程
  ConfigurationClassFilter(ClassLoader classLoader, List<AutoConfigurationImportFilter> filters) {
    this.autoConfigurationMetadata = AutoConfigurationMetadataLoader.loadMetadata(classLoader);
    this.filters = filters;
  }
}
```

<br>

加载元数据配置用到了`AutoConfigurationMetadataLoader`类提供的`loadMetadata()`方法，该方法会默认加载类路径下的`META-INF/spring-autoconfigure-metadata.properties`内的配置。源代码如下。

```java
final class AutoConfigurationMetadataLoader {
  // 默认加载元数据的路径
  protected static final String PATH = "META-INF/spring-autoconfigure-metadata.properties";

  private AutoConfigurationMetadataLoader() {
  }

  // 调用该方法，传入默认的PATH
  static AutoConfigurationMetadata loadMetadata(ClassLoader classLoader) {
    return loadMetadata(classLoader, PATH);
  }

  static AutoConfigurationMetadata loadMetadata(ClassLoader classLoader, String path) {
    try {
      // 获取数据存储于Enumeration中
      Enumeration<URL> urls = (classLoader != null) ? classLoader.getResources(path)
        : ClassLoader.getSystemResources(path);
      Properties properties = new Properties();
      while (urls.hasMoreElements()) {
        // 遍历Enumeration中的url，加载其中的属性，存储到Properties中
        properties.putAll(PropertiesLoaderUtils.loadProperties(new UrlResource(urls.nextElement())));
      }
      return loadMetadata(properties);
    }
    catch (IOException ex) {
      throw new IllegalArgumentException("Unable to load @ConditionalOnClass location [" + path + "]", ex);
    }
  }

  // 创建AutoConfigurationMetadata的实现类PropertiesAutoConfigurationMetadata
  static AutoConfigurationMetadata loadMetadata(Properties properties) {
    return new PropertiesAutoConfigurationMetadata(properties);
  }
	
  // AutoConfigurationMetadata的内部实现类
  private static class PropertiesAutoConfigurationMetadata implements AutoConfigurationMetadata {

    private final Properties properties;

    PropertiesAutoConfigurationMetadata(Properties properties) {
      this.properties = properties;
    }
    // ...
  }
  
  // ...
}  
```

在上面的代码中，`AutoConfigurationMetadataLoader`调用`loadMetadata(ClassLoader classLoader)`方法，获取默认PATH指定的文件（即所有自动配置项目`xxx.autoconfigure`下的`META-INF/spring-autoconfigure-metadata.properties`文件），然后将读取到的配置文件的url（配置文件的绝对路径）存储到Enumeration数据结构中。

![image-20210421195752748](https://images.shiguangping.com/imgs/20210421195752.png)

*（图：loadMetadata()方法实现）*

![image-20210421194921673](https://images.shiguangping.com/imgs/20210421194921.png)

*（图：实例化`new UrlResource()`内构造方法打断点，查看当前url的值。这里要注意打断点的顺序，要在执行到loadMetadata()方法后打断点）*

随后，遍历Enumeration中的url，获取对应`spring-autoconfigure-metadata.properties`配置文件中的配置并存储于Properties内，最终调用在该类内部实现的`AutoConfigurationMetadata`的子类的构造方法，返回该实例。

<br>

`spring-autoconfiguration-metadata.properties`文件内的配置格式如下：

**自动配置类的全限定名.注解名称 = 值**

<br>

如果一个Key有多个值，则多个值之间用逗号分隔。

```properties
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration.AutoConfigureAfter=org.springframework.boot.autoconfigure.data.couchbase.CouchbaseDataAutoConfiguration,org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration
```

<br>

可以打开`spring-boot-autoconfigure-2.4.5.jar`中的`META-INF/spring-autoconfigure-metadata.properties`配置文件来查看Spring Boot官方的配置。

![image-20210421201108410](https://images.shiguangping.com/imgs/20210421201108.png)

<br>

加载元数据主要的目的是为了后续过滤自动配置使用。Spring Boot使用一个Annotation的处理器来手机自动加载的条件，这些条件可以在元数据文件中进行配置。Spring Boot会将手机号的`@Configuration`进行一次过滤，进而剔除不满足条件的配置类。

在官方文档中也明确指出，使用这种配置方式可以有效缩短Spring Boot的启动时间，减少`@Configuration`类的数量，从而减少初始化Bean的耗时。

后续会看到过滤自动配置的具体方法实现。

<br>

### @EnableAutoConfiguration加载自动配置组件

加载自动配置组件是Spring Boot中自动配置功能的核心组件之一，这些自动配置组件在类路径中`META-INF`目录的`spring.factories`文件中进行注册。Spring Boot预置了一部分组件，如果我们需要创建自己的组件，可以参考Spring Boot预置组件在自己的Starters中进行配置。

通过Spring Core提供的`SpringFactoriesLoader`类读取`spring.factories`文件中注册的类。

下面通过源码来解读Spring Boot是如何在`AutoConfigurationImportSelector`类中通过`getCandidateConfigurations()`方法来读取`spring.factories`文件中的注册类的。

```java
protected AutoConfigurationEntry getAutoConfigurationEntry(AnnotationMetadata annotationMetadata) {
  // ...
  AnnotationAttributes attributes = getAttributes(annotationMetadata);
  // 获取候选配置类集合
  List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);
  // ...
}

protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
  
  // 通过SpringFactoriesLoader类的loadFactoryNames()方法获取候选配置类集合
  List<String> configurations = SpringFactoriesLoader.loadFactoryNames(getSpringFactoriesLoaderFactoryClass(),
                                                                       getBeanClassLoader());
  Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you "
                  + "are using a custom packaging, make sure that file is correct.");
  return configurations;
}
```

`SpringFactoriesLoader.loadFactoryNames()`方法传入了两个参数：

- getSpringFactoriesLoaderFactoryClass()

  ```java
  protected Class<?> getSpringFactoriesLoaderFactoryClass() {
    // 返回了EnableAutoConfiguration类对象
    return EnableAutoConfiguration.class;
  }
  ```

- getBeanClassLoader() 用来加载外部文件

<br>

```java
public static final String FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories";

public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
  ClassLoader classLoaderToUse = classLoader;
  if (classLoaderToUse == null) {
    classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
  }
  // 获取全限定名org.springframework.boot.autoconfigure.EnableAutoConfiguration
  String factoryTypeName = factoryType.getName();
  // 最终只返回spring.factories中的EnableAutoConfiguration配置类（即Map中Key为factoryTypeName对应的Value），如果没有则对应的Value返回一个空集合
  return loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());
}

private static Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) {
  // 从cache中获取classLoader对应的值，如果获取到则直接返回
  Map<String, List<String>> result = cache.get(classLoader);
  if (result != null) {
    return result;
  }

  result = new HashMap<>();
  try {
    // 将所有的spring.factories文件的url存入Enumeration数据结构中
    Enumeration<URL> urls = classLoader.getResources(FACTORIES_RESOURCE_LOCATION);
    // 遍历Enumeration
    while (urls.hasMoreElements()) {
      URL url = urls.nextElement();
      // 获取spring.factories文件的绝对路径
      UrlResource resource = new UrlResource(url);
      // 读取spring.factories文件中的配置到Properties
      Properties properties = PropertiesLoaderUtils.loadProperties(resource);
      // 将Properties封装成Map<String,List<String>>的数据结构存到result中
      for (Map.Entry<?, ?> entry : properties.entrySet()) {
        String factoryTypeName = ((String) entry.getKey()).trim();
        String[] factoryImplementationNames =
          StringUtils.commaDelimitedListToStringArray((String) entry.getValue());
        for (String factoryImplementationName : factoryImplementationNames) {
          result.computeIfAbsent(factoryTypeName, key -> new ArrayList<>())
            .add(factoryImplementationName.trim());
        }
      }
    }

    // 将所有列表替换为包含唯一元素的不可修改列表
    result.replaceAll((factoryType, implementations) -> implementations.stream().distinct()
                      .collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList)));
    // 将result存入cache中
    cache.put(classLoader, result);
  }
  catch (IOException ex) {
    throw new IllegalArgumentException("Unable to load factories from location [" +
                                       FACTORIES_RESOURCE_LOCATION + "]", ex);
  }
  return result;
}
```

简单描述该过程就是：`SpringFactoriesLoader`加载器家在指定`ClassLoader`下面的所有`META-INF/spring.factories`文件，并将文件解析内容存于`Map<String, List<String>>`内。然后，通过`loadFactoryName`传递过来的class的名称`(EnableAutoConfiguration类的全限定名)`从Map中获得该类的配置列表。

![image-20210422101532282](https://images.shiguangping.com/imgs/20210422101532.png)

*（spring-boot-autoconfigure-2.4.5.jar中的spring.factories文件的部分内容）*

<br>

其实，在程序启动初始化阶段，Spring Boot就已经多次调用`SpringFactoriesLoader.loadFactoryNames()`方法，加载`META-INF/spring.factories`中的配置。因为，`spring.factories`文件中不仅仅包含`EnableAutoConfiguration`相关配置，还包含Spring Boot在其他周期需要加载的组件。

`loadSpringFactories()`方法将读取到的`spring.factories`中的配置都存到了cache全局缓存中，在后面执行到加载自动配置类时，一般直接通过`classLoader`到cache中获取数据，而无需再重新读取每一个`spring.factories`，节省了系统的启动时间。

<br>

因为程序默认加载的是`ClassLoader`下面所有的`META-INF/spring.factories`文件中的配置，所以难免在不同的jar包中出现重复的配置。我们可以在源代码中使用Set集合数据不可重复的特性进行去重操作。

```java
protected final <T> List<T> removeDuplicates(List<T> list) {
  return new ArrayList<>(new LinkedHashSet<>(list));
}
```

<br>

### @EnableAutoConfiguration排除指定组件

我们通过读取`spring.factory`加载自动配置组件。但是，在实际中我们不需要自动配置某个或某些组件的是偶，可以通过配置`@EnableAutoConfiguration`的注解属性`exclude`和`excludeName`进行有针对性的排除，也可以通过配置文件重写`spring.autoconfigure.exclude`属性进行排除。

```java
protected Set<String> getExclusions(AnnotationMetadata metadata, AnnotationAttributes attributes) {
  // 创建Set集合并把待排除的内容存于集合中，LinkedHashSet具有不可重复性
  Set<String> excluded = new LinkedHashSet<>();
  excluded.addAll(asList(attributes, "exclude"));
  excluded.addAll(Arrays.asList(attributes.getStringArray("excludeName")));
  excluded.addAll(getExcludeAutoConfigurationsProperty());
  return excluded;
}

// 会从环境中读取是否重写了spring.autoconfigure.exclude属性，返回要排除的类集合
protected List<String> getExcludeAutoConfigurationsProperty() {
  Environment environment = getEnvironment();
  if (environment == null) {
    return Collections.emptyList();
  }
  if (environment instanceof ConfigurableEnvironment) {
    Binder binder = Binder.get(environment);
    return binder.bind(PROPERTY_NAME_AUTOCONFIGURE_EXCLUDE, String[].class).map(Arrays::asList)
      .orElse(Collections.emptyList());
  }
  String[] excludes = environment.getProperty(PROPERTY_NAME_AUTOCONFIGURE_EXCLUDE, String[].class);
  return (excludes != null) ? Arrays.asList(excludes) : Collections.emptyList();
}
```

`AutoConfigurationImportSelector`中调用了`getExclusions()`方法来获取被排除类的集合。它会收集`@EnableAutoConfiguration`注解中配置的`exclude`属性值、`excludeName`属性值，并通过`getExcludeAutoConfigurationsProperty()`方法获取在配置文件中key为`spring.autoconfigure.exclude`的配置值。

<br>

获取到被排除组件的集合之后，首先是对待排除的类进行检查操作，源代码如下。

```java
private void checkExcludedClasses(List<String> configurations, Set<String> exclusions) {
  // 创建List集合用于存放无效的待排除类
  List<String> invalidExcludes = new ArrayList<>(exclusions.size());
  // 遍历待排除类
  for (String exclusion : exclusions) {
    // 判断排除类是否可被加载并且存在于自动配置类集合中，将不满足条件的排除类存入List中
    if (ClassUtils.isPresent(exclusion, getClass().getClassLoader()) && !configurations.contains(exclusion)) {
      invalidExcludes.add(exclusion);
    }
  }
  // 如果存在无效的待排除类，进行处理
  if (!invalidExcludes.isEmpty()) {
    handleInvalidExcludes(invalidExcludes);
  }
}

// 抛出指定异常
protected void handleInvalidExcludes(List<String> invalidExcludes) {
  StringBuilder message = new StringBuilder();
  for (String exclude : invalidExcludes) {
    message.append("\t- ").append(exclude).append(String.format("%n"));
  }
  throw new IllegalStateException(String.format(
    "The following classes could not be excluded because they are not auto-configuration classes:%n%s",
    message));
}
```

以上代码中，`checkExcludedClasses()`方法用来确保被排除的类存在于当前的ClassLoader中，并且含在`spring.factories`注册的集合中。如果不满足条件，调用`handleInvalidExcludes()`方法抛出异常。

<br>

如果被排除的类都符合条件，调用`configurations.removeAll(exclusions)`方法从自动配置集合中移除被排除集合的类，至此完成初步的自动配置组件排除。

<br>

### @EnableAutoConfiguration过滤自动配置组件

当完成对主动要排除的配置类过滤之后，`AutoConfigurationImportSelector`会结合此前获取的`AutoConfigurationMetadata`对象，对组件进行再次过滤。

