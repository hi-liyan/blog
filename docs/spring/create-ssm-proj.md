---
id: create-ssm-proj
title: 搭建SSM项目
---


:::tip
 SpringBoot框架相较于Spring的优点：

 - 快速创建项目
 - 简化配置
 - 简化代码
 - 内嵌Servlet容器
 - 容易部署
 - 微服务
 - ...
:::

相较于SpringBoot的优点，传统SSM开发，项目创建复杂，需要进行大量配置，项目维护难度大。

**SSM项目搭建流程：**

1. 建项目
2. 引依赖
3. 写配置
4. 写代码

大体上就是这四步，下面开始搭建。



## 创建项目

打开Intellij IDEA，创建Maven项目。

```
GroupId: net.pjsk
ArtifactId: ssm
Version: 1.0-SNAPSHOT
```



## 引入依赖

项目创建好后引入需要的Maven依赖。

```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>

      <groupId>net.pjsk</groupId>
      <artifactId>ssm</artifactId>
      <version>1.0-SNAPSHOT</version>

      <properties>
          <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
          <maven.compiler.source>1.8</maven.compiler.source>
          <maven.compiler.target>1.8</maven.compiler.target>
      </properties>

      <dependencies>
          <dependency>
              <groupId>junit</groupId>
              <artifactId>junit</artifactId>
              <version>4.11</version>
              <scope>test</scope>
          </dependency>

          <!--springmvc-->
          <dependency>
              <groupId>org.springframework</groupId>
              <artifactId>spring-webmvc</artifactId>
              <version>5.3.4</version>
          </dependency>

          <!-- Mybatis -->
          <dependency>
              <groupId>org.mybatis</groupId>
              <artifactId>mybatis</artifactId>
              <version>3.5.5</version>
          </dependency>
          <dependency>
              <groupId>org.mybatis</groupId>
              <artifactId>mybatis-spring</artifactId>
              <version>2.0.5</version>
          </dependency>

          <!-- MySql -->
          <dependency>
              <groupId>mysql</groupId>
              <artifactId>mysql-connector-java</artifactId>
              <version>8.0.21</version>
          </dependency>

          <!-- JDBC -->
          <dependency>
              <groupId>org.springframework</groupId>
              <artifactId>spring-jdbc</artifactId>
              <version>5.3.4</version>
          </dependency>

          <!-- 数据库连接池 -->
          <dependency>
              <groupId>com.alibaba</groupId>
              <artifactId>druid</artifactId>
              <version>1.1.23</version>
          </dependency>
      </dependencies>

      <build>
          <plugins>
              <plugin>
                  <!-- 代码生成 -->
                  <groupId>org.mybatis.generator</groupId>
                  <artifactId>mybatis-generator-maven-plugin</artifactId>
                  <version>1.4.0</version>
                  <dependencies>
                      <dependency>
                          <groupId>mysql</groupId>
                          <artifactId>mysql-connector-java</artifactId>
                          <version>8.0.21</version>
                      </dependency>
                  </dependencies>
              </plugin>
          </plugins>
      </build>
  </project>
```



## 写配置

用到的依赖主要有Spring、SpringMVC、Mybatis、数据库连接、驱动相关的依赖。

依赖引进来之后开始进行基础的配置，配置好之后这些框架才能被使用，才能进行项目的开发。

1. 在`resources`目录下新建`datasource.properties`文件，用于保存数据库连接的信息。

   ```properties
   jdbc.driver=com.mysql.cj.jdbc.Driver
   jdbc.url=jdbc:mysql://localhost:3306/ssm_base
   jdbc.username=root
   jdbc.password=123456
   ```

2. 在`resources`目录下新建`application.xml`文件，该文件是spring容器的配置文件。

   Spring的核心思想之一是**IoC控制反转**，它的实现方式是依赖注入，我们将用的到的依赖通通注册到容器中由Spring容器管理，并实现依赖注入。

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/context"
          xmlns:mvc="http://www.springframework.org/schema/mvc"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
                              https://www.springframework.org/schema/beans/spring-beans.xsd
                              http://www.springframework.org/schema/context
                              https://www.springframework.org/schema/context/spring-context.xsd
                              http://www.springframework.org/schema/mvc
                              http://www.springframework.org/schema/mvc/spring-mvc.xsd">
   
     <!-- springmvc -->
     <mvc:annotation-driven/>
     <mvc:default-servlet-handler/>
     <!-- 组件扫描：会扫描Spring注解，被注解的Bean将会注册到Spring容器中 -->
     <context:component-scan base-package="net.pjsk.*"/>
   
     <!-- Mybatis -->
     <!-- 引入数据库properties -->
     <context:property-placeholder location="classpath:datasource.properties"/>
   
     <!-- 数据库连接池 -->
     <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
       <property name="driverClassName" value="${jdbc.driver}"/>
       <property name="url" value="${jdbc.url}"/>
       <property name="username" value="${jdbc.username}"/>
       <property name="password" value="${jdbc.password}"/>
     </bean>
   
     <!-- Mybatis核心对象 -->
     <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
       <property name="dataSource" ref="dataSource"/>
       <!-- mapper XML目录 -->
       <property name="mapperLocations" value="classpath:mapper/*.xml"/>
       <!-- 实体类别名 -->
       <property name="typeAliasesPackage" value="net.pjsk.entity"/>
     </bean>
   
     <!-- Mapper扫描配置 -->
     <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
       <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
       <!-- mapper接口目录 -->
       <property name="basePackage" value="net.pjsk.mapper"/>
     </bean>
   
   </beans>
   ```

3. 工程名右键，点击“添加框架支持”。

   ![image-20210227205740320](https://upyun1.surcode.cn/imgs/20210227205740.png)

   添加Web框架支持，项目会自动创建web目录。

   ```markdown
   |-web
   	|-WEB-INF
   			|-web.xml
   ```

   编辑web.xml。

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
            version="5.0">
   
     <servlet>
       <servlet-name>springmvc</servlet-name>
       <!-- 前置调度器：SpringMVC核心 -->
       <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
       <!-- 初始化参数 -->
       <init-param>
         <!-- 获取SpringMVC配置 （参数名不能写错）-->
         <param-name>contextConfigLocation</param-name>
         <!-- SpringMVC配置文件 -->
         <param-value>classpath:application.xml</param-value>
       </init-param>
       <!-- 启动级别，随服务器一起启动 -->
       <load-on-startup>1</load-on-startup>
     </servlet>
   
     <!-- servlet 映射 -->
     <servlet-mapping>
       <servlet-name>springmvc</servlet-name>
       <url-pattern>/</url-pattern>
     </servlet-mapping>
   </web-app>
   ```

4. 将依赖添加到WEB-INF下的lib目录中，项目通过Tomcat启动后，会到该目录下读取所需依赖。如果没有添加，在运行时可能会报NoSuchXXX的错误。

   ![image-20210227210243918](https://upyun1.surcode.cn/imgs/20210227210243.png)

## 写代码

配置写好后，就可以写代码了。

1. 写Mapper

   ```java
   package net.pjsk.mapper;
   
   import net.pjsk.entity.User;
   import org.apache.ibatis.annotations.Param;
   
   /**
    * @author liyan
    * @date 2021.2.27
    */
   public interface UserMapper {
   
       /**
        * 通过id查询
        *
        * @param id
        * @return
        */
       User selectById(@Param("id") Long id);
   }
   ```

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <mapper namespace="net.pjsk.mapper.UserMapper">
   
       <select id="selectById" resultType="user">
           select *
           from t_user u
           where u.id = #{id}
       </select>
   
   </mapper>
   ```

   

2. 写Service

   ```java
   package net.pjsk.service;
   
   import net.pjsk.entity.User;
   import org.springframework.stereotype.Service;
   
   /**
    * @author liyan
    * @date 2021.2.27
    */
   @Service
   public interface IUserService {
   
       /**
        * 通过id查询
        *
        * @param id
        * @return
        */
       User getById(Long id);
   }
   
   ```

   ```java
   package net.pjsk.service.impl;
   
   import net.pjsk.entity.User;
   import net.pjsk.mapper.UserMapper;
   import net.pjsk.service.IUserService;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;
   
   import java.util.Optional;
   
   /**
    * @author liyan
    * @date 2021.2.27
    */
   @Service
   public class UserServiceImpl implements IUserService {
   
       @Autowired
       private UserMapper userMapper;
   
       @Override
       public User getById(Long id) {
           User user = this.userMapper.selectById(id);
           return Optional.ofNullable(user).orElse(null);
       }
   }
   ```

   

3. 写Controller

   ```java
   package net.pjsk.controller;
   
   import net.pjsk.entity.User;
   import net.pjsk.service.IUserService;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.PathVariable;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.ResponseBody;
   
   import java.util.Optional;
   
   /**
    * @author liyan
    * @date 2021.2.27
    */
   @Controller
   @RequestMapping(value = "user", produces = "application/json; charset=utf-8")
   public class UserController {
   
       @Autowired
       private IUserService userService;
   
       @ResponseBody
       @GetMapping("/get/{id}")
       public String getById(@PathVariable("id") Long id) {
           User user = this.userService.getById(id);
           return Optional.ofNullable(user).map(User::toString).orElse("null");
       }
   }
   ```

   

## 测试

启动Tomcat测试。

![image-20210227205435275](https://upyun1.surcode.cn/imgs/20210227205435.png)