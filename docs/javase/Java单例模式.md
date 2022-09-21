---
id: 单例模式
title: 13.6 Java单例模式
---

单例模式是学习Java接触的第一个设计模式，它让一个类有且只有一个实例对象。

它的实现方式非常简单，私有化其构造器，在内部实例化一个对象，并提供一个获取该实例对象的公共方法。

根据根据实例化对象的时机不同，单例模式又可以分饿汉式和懒汉式两种实现方法。饿汉式是在类被加载进内存时就实例化对象，而懒汉式是在第一次调用获取示例方法时才实例化对象。





## 饿汉式

```java
public class SingletonOne {

	// 1. 创建该类型的私有静态实例（饿汉式：创建静态私有对象时直接实例化）
	private static final SingletonOne instance = new SingletonOne();

	// 2. 私有化构造方法
	private SingletonOne() {
	}

	// 3. 提供获取示例对象的方法
	public static SingletonOne getInstance() {
		return instance;
	}
}

```

在main方法中验证一下：

```java
public static void main(String[] args) {
	SingletonOne one = SingletonOne.getInstance();
	SingletonOne two = SingletonOne.getInstance();

	System.out.println(one == two); // true
}
```


### 懒汉式

```java
public class SingletonTwo {

	// 1. 创建该类的私有化静态对象
	private static SingletonTwo instance = null;

	// 2. 私有化构造方法
	private SingletonTwo() {
	}

	// 3. 创建该类公共的静态方法提供实例化对象
	public static SingletonTwo getInstance() {
		if (instance == null) {
			instance = new SingletonTwo();
		}
		return instance;
	}
}
```

在Test类中验证一下：

```java
public static void main(String[] args) {
	SingletonTwo one = SingletonTwo.getInstance();
	SingletonTwo two = SingletonTwo.getInstance();
	System.out.println(one == two); // true
}
```

这种懒汉式存在线程安全问题，在多线程情况下，可能会创建多个对象实例。解决的办法也很简单，上锁。

```java
public class SingletonTwo {

	// 1. 创建该类的私有化静态对象
	private static volatile SingletonTwo instance = null;

	// 2. 私有化构造方法
	private SingletonTwo() {
	}

	// 3. 创建该类公共的静态方法提供实例化对象
	public static SingletonTwo getInstance() {
		if (instance == null) {
			synchronized (SingletonTwo.class) {
				if (instance == null) {
					instance = new SingletonTwo();
				}
			}
		}
		return instance;
	}
}
```

