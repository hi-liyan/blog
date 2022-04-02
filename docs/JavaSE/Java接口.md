---
id: Java接口
title: 13.10 Java接口
---

### 接口的特点：

1. 接口的概念和类差不多，但是接口中的方法都是抽象方法，即没有方法体。

2. 接口中一般不定义属性，如果在接口中定义属性，则该属性必须是公共的、静态的、最终的

3. 接口中的方法都是抽象方法，所以实现该接口的类必须重写接口中所有的抽象方法。

### 示例：

```java
public interface Demo01 {
	public static final int a = 2;
  int b = 0;// 不加修饰符时，默认为public static fianl
}
```

接口中的方法都是抽象方法，实现接口的类必须实现这些抽象方法。

```java
public interface Demo01 {
	public static final int a = 2;
	public void test();//抽象方法
}

```



Demo01接口:

```java
package com.neu.interface_demo;

/**
 * @author liyan
 * Demo01接口
 */
public interface Demo01 {
	public static final int a = 2;

	int b = 0;// 抽象方法的成员属性默认是final

	public void test();// 抽象方法
}
```

Demo01_Implements类 implements Demo01接口:

```java
package com.neu.interface_demo;

/**
 * @author liyan
 * Demo01_Implements类 implements Demo01接口
 */
public class Demo01_Implements implements Demo01 {

	@Override
	public void test() {
		System.out.println("重写接口中的方法");
	}

	public static void main(String[] args) {
		// 接口对象指向实现类的实例，向上转型
		Demo01 d01 = new Demo01_Implements();
		System.out.println("接口中属性a的值：" + d01.a);
		d01.test();

		// 实例化Demo01_Implements对象
		Demo01_Implements d02 = new Demo01_Implements();
		System.out.println("接口中属性b的值：" + d02.b);
	}
}
```



### 默认方法&静态方法（JDK1.8以后）

默认方法和静态方法带方法体，实现接口的类可以不去实现它。

#### 示例：

```java
public interface IDemo{
  void method1();
  void method2();
  
  default void method3(){
    System.out.println("我是默认方法");
  }
  static void method4(){
    System.out.println("我是静态方法");
  }
}
```

默认方法和静态方法可以带方法体。

在实现类重写接口中的默认方法时，调用接口中的默认方法：

```java
public class Demo implements IDemo{
  @override
	public void method3(){
  	IDemo.super.method();//要以接口名.super.方法名()的形式调用接口的默认方法
	}
}
```

在实现类中无法重写接口中的静态方法，可以通过`接口名.方法名`的方式调用。



### 接口的继承

接口之间也是可以继承的，并且接口可以多继承。

#### 示例：

```java
public interface ISon extends IFather1,IFather2{
}
```

一个类如果要实现ISon，则它需要实现ISon继承的所有抽象方法。

