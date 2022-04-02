---
id: 单例模式
title: 13.6 Java单例模式
---

目的：使得类的一个对象成为该类系统中的唯一示例。

定义：一个类有且仅有一个实例，并且自行实例化向整个系统提供。

要点：

1. 某个类只能有一个实例
2. 必须自行创建实例
3. 必须自行向整个系统提供这个实例

实现：

1. 只提供私有(private)的构造方法
2. 含有一个该类的静态私有对象*（私有化的静态的实例对象）*
3. 提供一个静态的公有方法用于创建、获取静态私有对象

代码实现方案：

​	饿汉式：对象创建过程中实例化

​	懒汉式：静态公有方法中实例化



### 示例（饿汉式）：

```java
package com.imooc.singleton;

/**
 * 单例模式：饿汉式 空间换时间
 * @author liyan
 *
 */
public class SingletonOne {
	// 1. 创建静态构造方法
	private SingletonOne() {
	}

	// 2. 创建该类型的私有静态实例（饿汉式：创建静态私有对象时直接实例化）
	private static SingletonOne instance = new SingletonOne();

	// 3. 创建公有静态方法，返回静态实例对象
	public static SingletonOne getInstance() {
		return instance;
	}
}

```

在Test类中验证一下：

```java
package com.imooc.test;
import com.imooc.singleton.SingletonOne;

public class Test {
	public static void main(String[] args) {
		SingletonOne one = SingletonOne.getInstance();
		SingletonOne two = SingletonOne.getInstance();
		System.out.println(one);
		System.out.println(two);
	}
}
```

输出的结果：

```
com.imooc.singleton.SingletonOne@7852e922
com.imooc.singleton.SingletonOne@7852e922
```

结论：one和two指向相同的引用。



### 示例（懒汉式）：

:::warning
存在线程安全问题，后面再说。
:::

```java
package com.imooc.singleton;

/**
 * 单例模式：懒汉式 时间换空间
 * @author liyan
 *
 */
public class SingletonTwo {
	// 1. 私有化构造方法
	private SingletonTwo() {
	}

	// 2. 创建该类的私有化静态对象
	private static SingletonTwo instance = null;

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
package com.imooc.test;
import com.imooc.singleton.SingletonTwo;

public class Test {
	public static void main(String[] args) {
		SingletonTwo one = SingletonTwo.getInstance();
		SingletonTwo two = SingletonTwo.getInstance();
		System.out.println(one);
		System.out.println(two);
	}
}
```

输出结果：

```
com.imooc.singleton.SingletonTwo@4e25154f
com.imooc.singleton.SingletonTwo@4e25154f
```



### 总结：

饿汉式：空间换时间，类加载时就创建并实例化对象，线程安全；

懒汉式：时间换空间，第一次调用get方法时才实例化对象，有线程风险。

单例模式优点：

1. 在内存中只有一个对象，节省内存空间；
2. 避免频繁地创建销毁对象，提高性能；
3. 避免对共享资源的多重占用。

单例模式缺点：

1. 扩展比较困难；
2. 如果实例化后的对象长期不利用，系统将默认为垃圾进行回收，造成对象状态丢失。

单例模式使用场景：

1. 创建对象时占用资源过多，但同时又需要用到该类对象
2. 对系统内资源要求统一读写，如读写配置信息
3. 对多个实例存在可能引起程序逻辑错误，如号码生成器



