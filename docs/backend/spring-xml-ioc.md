---
id: spring-xml-ioc
title: Spring 通过XML配置Bean的几种方式
---

:::tip
IoC是Spring的核心特性之一，它实现了Spring中对Bean的管理。在Spring中配置Bean有两种方式，XML或者注解。本篇介绍使用XML的方式配置Bean。
:::

XML配置Bean有4种常用方式实现属性注入：

- 无参构造
- 有参构造
- 静态工厂
- 实例工厂

下面分别对这四种展开介绍。



## 代码示例

### 1. 无参构造

创建Student类，包含三个属性`name`、`age`和`classList`，并创建getter、setter方法以及toString方法。

```java
package com.shiguangping.study.ioc.xml;

import java.util.List;

public class Student {
    // 姓名
    private String name;
    // 年龄
    private Integer age;
    // 学科
    private List<String> classList;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public List<String> getClassList() {
        return classList;
    }

    public void setClassList(List<String> classList) {
        this.classList = classList;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", classList=" + String.join(",", classList) +
                '}';
    }
}
```

创建StudentService类，包含一个成员属性Student。

```java
package com.shiguangping.study.ioc.xml;

public class StudentService {
    // Student
    private Student student;

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
    // 打印学生信息
    public String print(){
        return student.toString();
    }
}
```

创建`application.xml`文件，将Student类和StudentService都放到IoC容器中，交由Spring管理。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Student -->
    <bean id="student" class="com.shiguangping.study.ioc.xml.Student">
        <property name="name" value="张三"/>
        <property name="age" value="16"/>
        <property name="classList">
            <list>
                <value>math</value>
                <value>english</value>
            </list>
        </property>
    </bean>

    <!-- StudentService -->
    <bean id="studentService" class="com.shiguangping.study.ioc.xml.StudentService">
        <property name="student" ref="student"/>
    </bean>
</beans>
```

编写测试方法：

```java
@ContextConfiguration(locations = "classpath:ioc/application.xml")
@SpringBootTest
public class xmlTests {

    @Autowired
    private StudentService studentService;

    @Test
    public void test(){
        System.out.println(studentService.print());  // Student{name='张三', age=16, classList=math,english}
    }
}
```

这种方式是通过setter方法实现属性（依赖）注入的。



### 2. 有参构造器

改造Student类，添加一个带参的构造函数，构造函数包含两个属性：`name`和`age`，同时删掉name和age的getter、setter方法。

```java
package com.shiguangping.study.ioc.xml;

import java.util.List;

public class Student {

    private String name;

    private Integer age;

    private List<String> classList;
    // 带参构造器
    public Student(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
    
    public List<String> getClassList() {
        return classList;
    }

    public void setClassList(List<String> classList) {
        this.classList = classList;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", classList=" + String.join(",", classList) +
                '}';
    }
}
```

StudentService不做改动。修改`application.xml`配置文件，使Student类通过带参构造器实现属性注入。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Student -->
    <bean id="student" class="com.shiguangping.study.ioc.xml.Student">
        <!-- 使用带参构造器注入 -->
        <constructor-arg index="0" value="李四"/>
        <constructor-arg index="1" value="17"/>
        <property name="classList">
            <list>
                <value>math</value>
                <value>english</value>
            </list>
        </property>
    </bean>

    <!-- StudentService -->
    <bean id="studentService" class="com.shiguangping.study.ioc.xml.StudentService">
        <property name="student" ref="student"/>
    </bean>
</beans>
```

运行测试方法。

```java
@ContextConfiguration(locations = "classpath:ioc/application.xml")
@SpringBootTest
public class xmlTests {

    @Autowired
    private StudentService studentService;

    @Test
    public void test(){
        System.out.println(studentService.print());  // Student{name='李四', age=17, classList=math,english}
    }
}
```



### 3. 静态工厂

创建一个抽象类Animal，包含一个抽象方法`getName()`。

```java
package com.shiguangping.study.ioc.xml;

public abstract class Animal {

    abstract String getName();
}
```

创建Dog类和Cat类，分别继承Animal类，并实现getName()方法。

```java
package com.shiguangping.study.ioc.xml;

public class Dog extends Animal{

    @Override
    String getName() {
        return "dog";
    }
}
```

```java
package com.shiguangping.study.ioc.xml;

public class Cat extends Animal{
    @Override
    String getName() {
        return "cat";
    }
}
```

创建AnimalFactory类，提供一个静态方法用来获取Animal实例。

```java
package com.shiguangping.study.ioc.xml;

public class AnimalFactory {

    public static Animal getAnimal(String type) {
        if ("dog".equals(type)) {
            return new Dog();
        }
        if ("cat".equals(type)) {
            return new Cat();
        }
        return null;
    }
}
```

创建AnimalService类，包含一个成员属性Animal。

```java
package com.shiguangping.study.ioc.xml;

public class AnimalService {

    private Animal animal;

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    // 打印动物名字
    public void print() {
        System.out.println(animal.getName());
    }
}
```

在`application.xml`配置bean，这里主要是通过AnimalFactory类来创建Dog、Cat的bean。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 通过AnimalFactory类的静态方法创建Bean -->
    <bean id="dog" class="com.shiguangping.study.ioc.xml.AnimalFactory" factory-method="getAnimal">
        <constructor-arg value="dog"/>
    </bean>
    <bean id="cat" class="com.shiguangping.study.ioc.xml.AnimalFactory" factory-method="getAnimal">
        <constructor-arg value="cat"/>
    </bean>
		
    <bean id="animalService" class="com.shiguangping.study.ioc.xml.AnimalService">
      <!-- 注入dog -->  
      <property name="animal" ref="dog"/>
    </bean>

</beans>
```

编写测试方法。

```java
@ContextConfiguration(locations = "classpath:ioc/application.xml")
@SpringBootTest
public class xmlTests {

    @Autowired
    private AnimalService animalService;

    @Test
    public void test(){
        animalService.print(); // dog
    }
}
```



### 4. 实例工厂

改造AnimalFactory类，将getAnimal()方法修改成非静态方法。

```java
package com.shiguangping.study.ioc.xml;

public class AnimalFactory {

    public Animal getAnimal(String type) {
        if ("dog".equals(type)) {
            return new Dog();
        }
        if ("cat".equals(type)) {
            return new Cat();
        }
        return null;
    }
}
```

修改`application.xml`。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 创建AnimalFactory -->
    <bean id="animalFactory" class="com.shiguangping.study.ioc.xml.AnimalFactory"/>
    <!-- 通过AnimalFactory实例调用getAnimal()方法创建Dog-->
    <bean id="dog" factory-bean="animalFactory" factory-method="getAnimal">
        <constructor-arg value="dog"/>
    </bean>
    <bean id="cat" factory-bean="animalFactory" factory-method="getAnimal">
        <constructor-arg value="cat"/>
    </bean>

    <bean id="animalService" class="com.shiguangping.study.ioc.xml.AnimalService">
      <!-- 注入cat -->  
      <property name="animal" ref="cat"/>
    </bean>
</beans>
```

运行测试方法。

```java
@ContextConfiguration(locations = "classpath:ioc/application.xml")
@SpringBootTest
public class xmlTests {

    @Autowired
    private AnimalService animalService;

    @Test
    public void test(){
        animalService.print(); // cat
    }
}
```



## 总结

XML配置Bean的优点：

- 松耦合
- 依赖关系清晰
- 集中管理bean

缺点：

- 配置复杂
- 开发效率低
- 文件解析耗时
