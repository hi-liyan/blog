---
id: Java多态
title: 13.7 Java多态
---

多态，意味着允许不同类的对象对同一消息做出不同的响应。

编译时多态（设计时多态）：方法重载；

运行时多态：程序运行时动态决定调用哪个方法，Java中的多态一般指运行时多态。

必要条件：

- 满足继承关系
- 父类引用指向子类实例

### 示例：

动物类Animal

```java
package com.imooc.animal;

public class Animal {
	// 属性：昵称、年龄
	private String name;
	private int mouth;

	public Animal() {

	}

	public Animal(String name, int mouth) {
		setName(name);
		setMouth(mouth);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getMouth() {
		return mouth;
	}

	public void setMouth(int mouth) {
		this.mouth = mouth;
	}

	// 方法：吃东西
	public void eat() {
		System.out.println("动物都有吃东西的能力");
	}
}

```

Cat类：继承Animal

```java
package com.imooc.animal;

public class Cat extends Animal {
	// 属性：体重weight
	private double weight;

	public Cat() {

	}

	public Cat(String name, int mouth, double weight) {
		super(name, mouth);
		this.weight = weight;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

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
	// 属性：性别sex
	private String sex;

	public Dog() {

	}

	public Dog(String name, int mouth, String sex) {
		super(name, mouth);
		this.sex = sex;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

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
package com.imooc.test;

import com.imooc.animal.Animal;
import com.imooc.animal.Cat;
import com.imooc.animal.Dog;

public class Test {

	public static void main(String[] args) {
		Animal one = new Animal();// 1
		// 向上转型：是把一个子类实例转型成为一个父类对象（隐式转型、自动转型）-->也就是父类引用指向子类实例
		Animal two = new Cat();// 2
		Animal three = new Dog();// 3

		one.eat();
		two.eat();
		three.eat();
   // 向下转型：把父类对象强制转换成子类对象（强制类型转换）-->子类引用指向父类对象
		Cat temp = (Cat) two;
		temp.eat();
		temp.run();
		temp.setMouth(1);
		System.out.println("猫的年龄：" + temp.getMouth());

	}

}

```

向上转型：是把一个子类实例转型成为一个父类对象（隐式转型、自动转型）-->也就是父类引用指向子类实例.

父类对象指向子类实例，可调用父类方法、子类重写父类的方法、和父类派生的方法，无法调用子类自己的方法的。

向下转型：把父类对象强制转换成子类对象（强制类型转换）-->子类引用指向父类对象

```java
Cat temp = (Cat) two;
```

这里的对象two是Animal类型指向的Cat实例，我们可以强制转换成Cat，相当于把对象two还原成了Cat类的对象，强转后的temp对象可以使用父类方法、子类重写父类的方法、和父类派生下来的方法。