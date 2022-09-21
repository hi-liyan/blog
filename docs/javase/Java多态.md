---
id: Java多态
title: 13.7 Java多态
---

## 多态

多态是一个相对抽象的概念，它体现在同一类型的对象调用同一方法却得到不同的响应结果上。

多态可分为：
- 编译时多态（设计时多态）：方法重载；
- 运行时多态：程序在运行时才知道调用哪个方法。一般多态指的都是运行时多态。


运行时多态的必要条件：
- 满足继承（实现）关系；
- 父类引用（变量）指向不同的子类实例。



具体看代码：

Animal 类：
```java
public class Animal {
	
	// 方法：吃东西
	public void eat() {
		System.out.println("动物都有吃东西的能力");
	}
}

```

Cat类：继承Animal

```java
public class Cat extends Animal {

	// 方法：跑动
	public void run() {
		System.out.println("小猫快乐地奔跑");
	}

	// 重写父类方法：eat()
	@Override
	public void eat() {
		System.out.println("猫吃鱼~~~");
	}
}
```

Dog类：继承Animal

```java
package com.imooc.animal;

public class Dog extends Animal {
	// 方法：睡觉
	public void sleep() {
		System.out.println("小狗爱睡觉");
	}

	// 重写父类方法：eat()
	@Override
	public void eat() {
		System.out.println("狗吃肉~~~");
	}
}
```

Test类：

```java
public class Test {

	public static void main(String[] args) {
		Animal animal = new Animal(); // 1
		// 父类引用 = 子类实例();
		Animal cat = new Cat();// 2
		Animal dog = new Dog();// 3

		animal.eat(); // 调用Animal本身的方法；
		cat.eat(); // 调用Cat中重写Animal类的方法；
		dog.eat(); // 调用Dog中重写Animal类的方法；

   		// Animal类型的cat对象实际是Cat的实例对象，所以cat可以强转成Cat类。
		Cat cat1 = (Cat) cat;
		cat1.eat();
		cat1.run();
	}
}
```

从上面的代码中可以看到，父类的引用可以是不同子类的实例，这就体现了Java对象的多态性。

## instanceOf 关键字

instanceof 关键字用来判断左边对象是否属于右边类的实例，返回布尔值。