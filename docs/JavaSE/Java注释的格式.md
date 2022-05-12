---
id: Java注释的格式
title: 2. Java中的注释
---

## 注释

在[计算机语言](https://zh.wikipedia.org/wiki/计算机语言)中，**注释**是[计算机语言](https://zh.wikipedia.org/wiki/计算机语言)的一个重要组成部分，用于在[源代码](https://zh.wikipedia.org/wiki/源代码)中解释代码的功用，可以增强程序的可读性，可维护性，或者用于在源代码中处理不需运行的代码段，来调试程序的功能执行。

注释用来解释代码功能，提高代码可读性，使代码更易于开发者维护。

Java源文件在编译过程中，编译器会自动忽略注释的内容，所以，注释的内容是不参与执行的。（在开发调试过程中，通常也会将不需要本次执行的代码注释掉，使这部分代码不参与执行。）

**Java语言中有三种注释方式：单行注释、多行注释、文档注释。**

### 单行注释

单行注释的注释内容只有一行，一般用来描述方法中的某部分代码的逻辑功能。

```java
public class Demo {
  // 这是main方法
  public static void main(String[] args) {
    // 方法体
  }  
}
```

### 多行注释

多行注释的内容可以有多行。

```java
public class Demo {
  /*
    这是多行注释
    可以换行继续写
    多行注释中可以嵌套单行注释
  */
  public static void main(String[] args) {
    // 方法体
  }  
}
```

### 文档注释

文档注释通常用来描述类和方法的功能。

```java
/**
 * 文档注释
 */
public class Demo {
  public static void main(String[] args) {
    //方法体
  }  
}
```
  
  