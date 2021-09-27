---
id: java-reflect
title: Java 反射技术
---




## 类的加载

当程序要使用某个类的时候，如果该类还未被加载进内存，则系通过通过加载、连接、初始化三步来实现对类的初始化。

- 加载
  - 是指将class文件读进内存，并为其创建一个Class对象
  - 任何类被使用时，系统都会为其创建Class对象，一个类只有一个Class对象
- 连接
  - 验证，是否有正确的内部结构，并和其他类协调一致
  - 准备，负责为类的**静态成员**分配内存，并设置默认的初始化值
  - 解析，将类的二进制数据中的符号引用替换为直接引用
- 初始化



## 类的加载时机

- 创建类的实例时
- 创建子类实例时，父类也会被加载
- 访问类的静态成员时（静态属性、静态方法）
- 使用反射机制创建类或接口对应的`java.lang.Class`对象
- 使用`java.exe`命令运行某个主类



## 类加载器

类加载器的作用：

- 负责将class文件加载进内存，并为其生产Class对象



类加载器的组成：

- Bootstrap ClassLoader 根类加载器
- Extension ClassLoader 扩展类加载器
- System ClassLoader 系统类加载器



### Bootstrap ClassLoader

根类加载器，也被称为“引导类加载器”，负责Java核心类库的加载，如`System`、`String`等，在JDK中的`jre/lib`目录下的`rt.jar`文件中。



### Extension ClassLoader

负责jre的扩展目录中jar包的加载，在JDK中的`jre/lib/ext`目录。



### System ClassLoader

负责在JVM启动时加载来自java命令的class文件，以及classpath环境变量所指定的jar包和类路径。



## 反射

Java反射机制是在运行状态中。对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个属性和方法；这种动态获取的信息以及动态调用对象的方法的技术被称为Java的反射机制。



通俗地讲，反射就是在运行时获取到某个类的class文件对象（即Class类对象），再通过这个对象去调用该类中的属性和方法。



## 获取Class对象

获取类对象有三种方式。

:::tip 点击查看代码

```java
// 方式一（通过继承Object类的getClass()方法）
Person p1 = new Person();
Class<? extends Person> c1 = p1.getClass();

// 方式二（通过.class）
Class<Person> c2 = Person.class;

// 方式三（通过Class类的静态属性forName("全限定类名")）
Class<?> c3 = Class.forName("com.shiguangping.Person");
```

:::



## 反射相关的类

### java.lang.Class

| 方法                                    | 作用                                                         |
| :-------------------------------------- | :----------------------------------------------------------- |
| Field[] getFields()                     | 返回一个Field对象数组，里面记录了这个类所有`public`的成员属性以及父类`public`的成员属性。 |
| Field[] getDeclaredFields()             | 返回一个Field对象数组，里面记录了这个类所有的成员属性，不包含父类的。 |
| Method[] getMethods()                   | 返回一个Method对象数组，里面记录了这个类所有`public`方法，包含从父类继承的方法。 |
| Method[] getDeclaredMethods()           | 返回一个Method对象数组，里面记录了这个类所有的方法，但不包含从父类继承的方法。 |
| Constructor[] getConstructors()         | 返回一个Constructor对象数组，里面记录了这个类所有`public`构造方法。 |
| Constructor[] getDeclaredConstructors() | 返回一个Constructor对象数组，里面记录了这个类所有的构造方法。 |



### java.lang.reflect.Field

| 方法                      | 作用                                |
| :------------------------ | :---------------------------------- |
| Class getDeclaringClass() | 返回声明此成员属性的类的Class对象。 |
| int getModifiers()        | 返回成员属性的修饰符的整型值。      |
| String getName()          | 返回此成员属性的名称。              |



### java.lang.reflect.Method

| 方法                        | 作用                                                         |
| :-------------------------- | :----------------------------------------------------------- |
| Class getDeclaringClass()   | 返回声明此方法的类的Class对象。                              |
| Class[] getExceptionTypes() | 返回一个Class对象数组，记录了该方法抛出的所有异常的Class对象 |
| int getModifiers()          | 返回此方法的访问修饰符的整型值。                             |
| String getName()            | 返回此方法的名称。                                           |
| Class[] getParameterTypes() | 返回一个Class对象数组，记录此方法参数列表中所有参数类型的Class对象。 |
| Class getReturnType()       | 返回此方法返回值类型的Class对象。                            |



### java.lang.reflect.Constructor

| 方法                        | 作用                                                         |
| :-------------------------- | :----------------------------------------------------------- |
| Class getDeclaringClass()   | 返回声明此构造方法的类的Class对象。                          |
| Class[] getExceptionTypes() | 返回一个Class对象数组，记录了该构造方法抛出的所有异常的Class对象 |
| int getModifiers()          | 返回此构造方法的访问修饰符的整型值。                         |
| String getName()            | 返回此构造方法的名称。                                       |
| Class[] getParameterTypes() | 返回一个Class对象数组，记录此构造方法参数列表中所有参数类型的Class对象。 |



### java.lang.reflect.Modifier

上面有`int getModifiers()`获取成员属性、构造方法、成员方法的修饰符的整型值，可以`Modifier`类提供的静态方法判断对应的修饰符。

| 方法                                      | 作用                                 |
| ----------------------------------------- | ------------------------------------ |
| static String toString(int modifiers)     | 返回修饰符整型值对应的的字符串表示。 |
| static boolean isAbstract(int modifiers)  | 是abstract修饰？                     |
| static boolean isFinal(int modifiers)     | 是final修饰？                        |
| static boolean isInterface(int modifiers) | 是interface修饰？                    |
| static boolean isPublic(int modifiers)    | 是public修饰？                       |
| 更多参见`Modifier`类。                    |                                      |


