---
title: Mybatis Plus多租户数据隔离
date: 2021-1-27
category:
- 随手记
tags:
- Mybatis Plus
---



## 什么是多租户

多租户技术或称多重租赁技术，简称多租户。是一种软件架构技术，是实现如何在多用户环境下（此处的多用户一般是面向企业用户）共用相同的系统或程序组件，并且可确保各用户间数据的隔离性。

简单讲：在一台服务器上运行单个应用实例，它为多个租户（客户）提供服务。从定义中我们可以理解：多租户是一种架构，目的是为了让多用户环境下使用同一套程序，且保证用户间数据隔离。那么重点就很浅显易懂了，多租户的重点就是同一套程序下实现多用户数据的隔离。



## 数据隔离的三种方案

1. 独立数据库：简单来说就是一个租户使用一个数据库，这种数据隔离级别最高，安全性最好，但是提高成本。
2. 共享数据库、隔离数据架构：多租户使用同一个数据库，但是每个租户对应一个Schema(数据库user)。
3. 共享数据库、共享数据架构：使用同一个数据库，同一个Schema，但是在表中增加了`租户ID`的字段，这种共享数据程度最高，隔离级别最低。

这里采用方案三，即共享数据库，共享数据架构，因为这种方案服务器成本最低，但是提高了开发成本。



## 使用Mybatis Plus实现多租户

> 为什么选择MyBatisPlus？
> 除了一些系统共用的表以外，其他租户相关的表，我们都需要在sql不厌其烦的加上`AND t.tenant_id = ?`查询条件，稍不注意就会导致数据越界，数据安全问题让人担忧。好在有了MybatisPlus这个神器，可以极为方便的实现多租户SQL解析器。

Mybatis-plus就提供了一种多租户的解决方案，实现方式是基于分页插件(拦截器)进行实现的。



### 第一步

- 在数据库中添加维护一张sys_tenant（租户管理表），
- 在需要进行租户数据隔离的数据表上新增租户id；



### 第二步

创建表：

```sql
CREATE TABLE `orders_1`.`tenant`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `expire_date` datetime(0) COMMENT '协议到期时间',
  `amount` decimal(8, 2) COMMENT '金额',
  `tenant_id` int(0) COMMENT '租户ID',
  PRIMARY KEY (`id`)
);
```

自定义系统的上下文，存储从cookie等方式获取的租户ID，在后续的getTenantId()使用。

```java
/**
 * 系统的上下文帮助类。ConcurrentHashMap设置租户ID，供后续的MP的getTenantId()取出
 *
 * @author liyan
 * @since 2021.1.27
 */
@Component
public class ApiContext {
  private static final String KEY_CURRENT_TENANT_ID = "KEY_CURRENT_TENANT_ID";
  private static final Map<String, Object> mContext = new ConcurrentHashMap<>();

  public void setCurrentTenantId(Long providerId) {
    mContext.put(KEY_CURRENT_TENANT_ID, providerId);
  }

  public Long getCurrentTenantId() {
    return (Long) mContext.get(KEY_CURRENT_TENANT_ID);
  }
}
```

创建Mybatis Plus配置类`MyBatisPlusConfig`通过分页插件配置MP多租户。

```java
package com.zkyc.school.config.mybatisplus;

import com.baomidou.mybatisplus.core.injector.ISqlInjector;
import com.baomidou.mybatisplus.core.parser.ISqlParser;
import com.baomidou.mybatisplus.extension.injector.LogicSqlInjector;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.tenant.TenantHandler;
import com.baomidou.mybatisplus.extension.plugins.tenant.TenantSqlParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.LongValue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author liyan
 * @since 2021.1.25
 */
@Configuration
public class MyBatisPlusConfiguration {

  @Autowired
  private ApiContext apiContext;

  /**
     * 分页拦截器
     * @return
     */
  @Bean
  public PaginationInterceptor paginationInterceptor() {
    PaginationInterceptor paginationInterceptor = new PaginationInterceptor();

    // 创建SQL解析器集合
    List<ISqlParser> sqlParserList = new ArrayList<>();

    // 创建租户SQL解析器
    TenantSqlParser tenantSqlParser = new TenantSqlParser();

    // 设置租户处理器
    tenantSqlParser.setTenantHandler(new TenantHandler() {

      // 设置当前租户ID
      @Override
      public Expression getTenantId() {
        // 从当前系统上下文中取出当前请求的服务商ID，通过解析器注入到SQL中。
        Long currentProviderId = apiContext.getCurrentTenantId();
        if (null == currentProviderId) {
          throw new RuntimeException("Get CurrentProviderId error.");
        }
        return new LongValue(currentProviderId);
      }

      @Override
      public String getTenantIdColumn() {
        // 对应数据库中租户ID的列名
        return "tenant_id";
      }

      @Override
      public boolean doTableFilter(String tableName) {
        // 添加要过滤的表
        List<String> tableNameList = Arrays.asList("user_info","user_token");
        if (tableNameList.contains(tableName)) {
          return true;
        }
        return false;
      }
    });

    sqlParserList.add(tenantSqlParser);
    paginationInterceptor.setSqlParserList(sqlParserList);

    return paginationInterceptor;
  }

}
```



## 测试

配置好之后，不管是查询、新增、修改删除方法，MP都会自动在SQL上拼接租户ID的标识`WHERE tenant_id = 1`。



