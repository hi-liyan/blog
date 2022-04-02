---
id: Java面向对象
title: 13. Java面向对象
---

## 面向对象编程

面向对象编程是对实际问题的抽象。

例如一个图书管理系统，图书管理系统中有图书管理员（人员）、图书（书）等主要的数据构成。

那如何通过面向对象来描述图书管理员和图书呢？

可以创建两个类型，User（人员类），Book（图书类）。当然，这个 User 类不止能描述图书管理员，还能表示其他人员，只需要加一个类型区分即可。

```java
/**
 * User 人员
 */
public class User {

    // 人员id
    private Long id;
    
    // 人员姓名
    private String name;
    
    // 人员性别
    private String gender;
    
    // 联系电话
    private String mobile;
    
    // 人员类别
    private String type;
    
    // ...
}
```

```java
/**
 * Book 图书
 */
public class User {

    // 图书id
    private Long id;
    
    // 图书名称
    private String name;
    
    // 图书分类
    private String category;
    
    // ...
}
```

通过将具体事物抽象成一个个 Java 类的方式，就是面向对象编程。

面向对象编程的核心思想：封装、继承、多态。

上面的示例代码体现了面向对象中的**封装**特性，一个类可以通过继承另一个类，一个接口有不同的实现类体现了多态性。

## 类和对象

类是对象的抽象，对象是类的具体实例。

