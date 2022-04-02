---
id: Java继承
title: 13.4 Java继承
---

### 概念：

继承是面向对象思想的基本概念之一，通过继承的使用，可以很好地提高代码的复用性。

继承的关键字：`extends`

继承特点：

1. 通过extends关键字，可以继承其他类的属性和方法，我们把被继承的类成为父类，继承其他类的类成为子类。

2. Java中的继承属于单继承，即只能同时继承一个类，但是一个类可以有多个子类

   ```java
   public class Cat extends Animal{}
   ```

3. 所有的Java类都有一个统一的父类，即Object，所有的Java类都继承自Object类或其子类。

### 示例：

创建两个类，来解释一下继承的基本用法：

定义一个Animal类：

```java
public class Animal{
  String name;//昵称
  String sex;//性别
  String age;//年龄
  
  public void eat(){
    System.out.println("吃东西");
  }
}
```

定义一个Cat类：

```java
public class Cat extends Animal {//通过extends关键字继承Animal类

    @Override
    public void eat() {
        System.out.println(name + "吃东西");
    }
		
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.name = "花花";
        cat.sex = "小母猫";
        cat.age = 1;
        System.out.println("昵称：" + cat.name + "，性别：" + cat.sex + "，年龄：" + cat.age);
        cat.eat();
    }
}
```

运行结果：

```
昵称：花花，性别：小母猫，年龄：1
花花吃东西
```



### 继承的概述：

上面定义了两个类，Animal类和Cat类，

Animal类中定义了三个成员属性，和一个eat方法，

Cat类中，通过extends关键继承Animal类，继承的特点是可以继承父类的属性和方法。

所以，在Cat类中我们不再需要定义name、age、sex等属性以及eat()方法。

通过实例化Cat对象，可以正常调用继承自父类Animal的三个属性和重写eat()方法。