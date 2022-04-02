---
id: instanceof关键字
title: 13.8 instanceof关键字
---

对象 ---instanceof--->类

判断左边对象是否属于右边类的实例。

### 示例：

*(\*代码上文请参照Java 多态)*

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
		System.out.println("==============================");
		// 向下转型：把父类对象强制转换成子类对象（强制类型转换）-->子类引用指向父类对象
		// instanceof运算符：返回值：布尔类型
		if (two instanceof Cat) {
			Cat temp = (Cat) two;
			temp.eat();
			temp.run();
			temp.setMouth(1);
			System.out.println("猫的年龄：" + temp.getMouth());
			System.out.println("two可以转换为Cat类型");
		}
		if (two instanceof Dog) {
			Dog temp = (Dog) two;
			temp.eat();
			temp.sleep();
			temp.setMouth(1);
			System.out.println("狗的年龄：" + temp.getMouth());
			System.out.println("two可以转换为Dog类型");
		}
	}
}
```

运行结果：

```
动物都有吃东西的能力
猫吃鱼~~~
狗爱吃肉~~~
==============================
猫吃鱼~~~
小猫快乐地奔跑
猫的年龄：1
two可以转换为Cat类型
```



