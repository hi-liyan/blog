---
id: Java注释的格式
title: 2. Java中的注释
---

在[计算机语言](https://zh.wikipedia.org/wiki/计算机语言)中，**注释**是[计算机语言](https://zh.wikipedia.org/wiki/计算机语言)的一个重要组成部分，用于在[源代码](https://zh.wikipedia.org/wiki/源代码)中解释代码的功用，可以增强程序的可读性，可维护性，或者用于在源代码中处理不需运行的代码段，来调试程序的功能执行。

注释是用于解释代码功能，增加代码可读性，使代码更易于维护，

Java源文件在编译过程中，编译器会自动忽略注释的内容。

### Jave的注释格式：

- 单行注释，描述一行可以完成的内容

  ```java
  public class Demo{
    //这是main方法
  	public static void main(String[] args){
      //方法体
    }  
  }
  ```

  

- 多行注释，注释内容为多行，多行注释不能嵌套使用

  ```java
  public class Demo{
    /*
    这是多行注释
    可以换行继续写
    多行注释中可以嵌套单行注释
    //例如这样
    */
  	public static void main(String[] args){
      //方法体
    }  
  }
  ```

- 文档注释（按项目组要求完成注释）

  ```java
  /**
  	这是文档注释
  */
  
  public class Demo{
    //这是main方法
  	public static void main(String[] args){
      //方法体
  }  
  }
  ```
  
  