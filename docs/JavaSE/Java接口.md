---
id: Java接口
title: 13.8 Java接口
---

## 接口定义

接口主要用于定义功能、规范。声明接口使用 interface 关键字。

```java
public interface Collection {

}
```

接口的作用是用来定义功能，所以，接口中的方法只有方法声明，没有方法实现，这样的方法叫做抽象方法。

```java
public interface Collection {
	// 默认是public
	void add(Object elem);

	Object get(int index);
}
```

接口中定义的抽象方法可以省略 public 关键字，默认是公共的；接口中定义的成员属性默认是常量，不允许定义变量；在JDK1.8中，引入了有方法实现的静态方法（static）和默认方法（default）。

## 实现接口

在类中使用 implements 关键字实现接口，并且要实现接口中所有的抽象方法。

```java
public class List implements Collection {

	@Override
	public void add(Object elem) {
		// 方法实现
	}

	@Override
	public Object get(int index) {
		// 方法实现
	}
}
```

一个类可以同时实现多个接口。
