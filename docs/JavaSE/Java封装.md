---
id: Java封装
title: 13.2 Java封装
---

### 封装的概念：

封装是面向对象编程的基本思想之一，其思想是：

将类的某些信息隐藏在类内部，不允许外部程序直接访问；

通过该类提供的方法来实现对隐藏信息的操作和访问；

**隐藏**对象的信息；

**留出**访问的接口。

### 实现步骤：

修改属性的可见性，访问修饰符：private

创建getter/setter方法，设为public用于属性的读写

可以根据需求，在getter/setter方法中加入属性的逻辑控制，对属性值的合法性进行判断或一些其他的操作。

### 示例：

定义一个宠物猫类Cat，里面包含了宠物猫类的属性以及方法

```java
package com.imooc.animal;
/**
 * 宠物猫类
 * @author liyan
 *
 */
public class Cat {
	// 成员属性：昵称、年龄、体重、品种
	String name; // 昵称，默认值为null
	int mouth; // 年龄，默认值为0
	double weight; // 体重，默认值为0.0
	String species; // 品种

	public Cat() {
		// 构造方法
	}

	// 成员方法：跑动、吃东西
	// 跑动的方法
	public void run() {
		eat();
		System.out.println("小猫快跑");
	}

	// 吃东西的方法
	public void eat() {
		System.out.println("吃东西");
	}

}
```

再定义一个宠物猫的测试类CatTest，用于测试：

```java
package com.imooc.animal;
//单一指责原则
public class CatTest {
	public static void main(String[] args) {
		//对象实例化
		Cat oneCat = new Cat();
		//测试
		oneCat.name = "凡凡";
		oneCat.mouth = 3;
		oneCat.weight = 1200;
		oneCat.species = "中华田园猫";
		
		System.out.println("昵称："+oneCat.name);
		System.out.println("年龄："+oneCat.mouth);
		System.out.println("体重："+oneCat.weight);
		System.out.println("品种："+oneCat.species);	
	}
}

```

运行结果：

```
昵称：凡凡
年龄：3
体重：1200.0
品种：中华田园猫
```



测试类成通过实例化Cat类对象，通过对象调用属性名的方式为其赋值，再打印输出对象的昵称、年龄、体重、品种。

这里就会存在一个逻辑隐患，如果我们把猫的年龄赋值成"-3",程序依然会正常运行，但是确不符合实际逻辑。

所以，我们可以通过封装的方法，把传入的数据做合法性校验这一功能封装成一个方法。



### 封装流程如下：

step1：修改Cat类属性的可见性，添加访问修饰符**private**，限定这些属性只能在类内被使用。

*（private是私有的，被修饰的属性只能在该类里面使用，不能被其它类调用。）*

```java
// 封装step1：修改属性的可见性---private，限定属性只能在类内使用
private String name; // 昵称，默认值为null
private int mouth; // 年龄，默认值为0
private double weight; // 体重，默认值为0.0
private String species; // 品种
```

step2：创建get/set方法

step3：可以在set()方法中添加属性的限定,校验传入的值的合法性，合法则为属性赋值；通过			调用get()方法获取属性的值，此时就完成了属性封装。

```java
// 封装setp2：创建get/set方法
public void setMouth(int mouth) {
	// 封装step3：在set()中添加属性的限定,校验传入的值的合法性，合法则为属性赋值	
  if (mouth <= 0) {
			System.out.println("设定的年龄需大于0！");
		} else {
			this.mouth = mouth;
		}

	}
	//get方法用来取值，其它类可以通过`对象名.方法名`的方式获取到该属性
	public int getMouth() {
		return mouth;
	}
```



完整代码如下：

*宠物猫类Cat*

```java
package com.imooc.animal;

/**
 * 宠物猫类
 * 
 * @author liyan
 *
 */
public class Cat {
	// 成员属性：昵称、年龄、体重、品种
	// 封装step1：修改属性的可见性---private，限定属性只能在类内使用
	private String name; // 昵称，默认值为null
	private int mouth; // 年龄，默认值为0
	private double weight; // 体重，默认值为0.0
	private String species; // 品种
	// 构造方法

	public Cat() {

	}

	// 封装setp2：创建get/set方法
	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	// 封装step3：在set中添加属性的限定
	public void setMouth(int mouth) {
		if (mouth <= 0) {
			System.out.println("设定的年龄需大于0！");
		} else {
			this.mouth = mouth;
		}
	}

	public int getMouth() {
		return mouth;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

	// 成员方法：跑动、吃东西
	// 跑动的方法
	public void run() {
		eat();
		System.out.println("小猫快跑");
	}

	// 吃东西的方法
	public void eat() {
		System.out.println("吃东西");
	}
}
```

为所有的私有属性设置get/set方法。

*测试类CatTest*

```java
package com.imooc.animal;
//单一指责原则
public class CatTest {
	public static void main(String[] args) {
		//对象实例化
		Cat oneCat = new Cat();
		//测试
		oneCat.setName("凡凡");
		oneCat.setMouth(3);
		oneCat.setWeight(1200);
		oneCat.setSpecies("中华田园猫");
		
		System.out.println("昵称："+oneCat.getName());
		System.out.println("年龄："+oneCat.getMouth());
		System.out.println("体重："+oneCat.getWeight());
		System.out.println("品种："+oneCat.getSpecies());
		
	}
}

```

运行结果：

```
昵称：凡凡
年龄：3
体重：1200.0
品种：中华田园猫
```



如果给setName传入-3，则会打印提示数据不合法的信息。

```java
oneCat.setMouth(-3);
```

运行结果：

```
设定的年龄需大于0！
```



***封装的意义还需要在后期写代码的时候慢慢体会~~~***

