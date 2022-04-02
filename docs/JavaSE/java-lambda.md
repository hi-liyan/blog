---
id: java-lambda
title: Java Lambda表达式
---

## 了解函数式编程

函数：在数学中，函数就是就输入量、输出量的一套计算方案，也就是“拿数据做操作”。

在面向对象编程中，强调通过面向对象的思想解决问题；

而函数式编程忽略了面向对象编程的复杂语法，屏蔽过程，强调“做什么”，忽略“怎么做”。



## 小栗子

> 需求：启动一个线程，在控制台打印一句话：“线程启动了”。

**方式一**

传统方式：创建一个类`MyRunable`实现`Runable`接口，通过这种实现类的方式实现需求。

```java
package net.pjsk.demo;

/**
 * @author liyan
 * @date 2021.2.18
 */
public class MyRunable implements Runnable{
    @Override
    public void run() {
        System.out.println("线程启动了");
    }
}
```



```java
package net.pjsk.demo;

/**
 * @author liyan
 * @date 2021.2.18
 */
public class LambdaDemo {
    public static void main(String[] args) {
        // 通过实现类的方式实现
        MyRunable myRunable = new MyRunable();
        new Thread(myRunable).start();
    }
}
```



**方式二**

匿名内部类

```java
package net.pjsk.demo;

/**
 * @author liyan
 * @date 2021.2.18
 */
public class LambdaDemo {
    public static void main(String[] args) {
        // 通过匿名内部类的方式实现
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("线程启动了");
            }
        }).start();
    }
}
```



**方式三**

Lambda表达式

```java
package net.pjsk.demo;

/**
 * @author liyan
 * @date 2021.2.18
 */
public class LambdaDemo {
    public static void main(String[] args) {
        // 通过Lambda表达式实现
        new Thread(() -> {
            System.out.println("线程启动了");
        }).start();
    }
} 
```



## Lambda 表达式的格式

Lambda表达式由`参数列表`、`箭头`、`代码块`三部分构成。

```java
new Thread(() -> {
            System.out.println("线程启动了");
        }).start();
```



## Lambda 表达式使用前提

- 有一个接口
- 该接口有且只有一个抽象方法



这种接口也成为“函数式接口”。



## 练习一

> 1. 定义一个接口(Eatable)，里面定义一个抽象方法， void eat()
>
> 2. 定义一个测试类(EatableDemo)，里面提供两个方法：
>    1. void useEatable(Eatable e)
>    2. main()方法，用来调用useEatable()方法



```java
package net.pjsk.test1;

// 方式一需要创建接口的实现类，并重写方法
public class EatableImpl implements Eatable{
    @Override
    public void eat() {
        System.out.println("多吃蔬菜和水果");
    }
}
```



```java
package net.pjsk.test1;

/**
 * @author liyan
 * @date 2021.2.18
 */
public class EatableDemo {

    public static void main(String[] args) {
        // 方式一、先创建实现类重写eat()方法，再使用
        Eatable eatable = new EatableImpl();
        useEatable(eatable);

        // 方式二、直接传入匿名内部类
        useEatable(new Eatable() {
            @Override
            public void eat() {
                System.out.println("多吃蔬菜和水果");
            }
        });

        // 方式三、 使用Lambda 表达式
        useEatable(() -> {
            System.out.println("多吃蔬菜和水果");
        });
    }

    public static void useEatable(Eatable e) {
        e.eat();
    }
}
```



## 练习二

>1. 定义一个接口(Flyable)，里面定义一个抽象方法， void fly(String s)
>
>2. 定义一个测试类(FlyableDemo)，里面提供两个方法：
>   1. void useEatable(Flyable f)
>   2. main()方法，用来调用useFlyable()方法



```java
package net.pjsk.test2;

// 方式一，接口实现类
public class FlyableImpl implements Flyable {
    @Override
    public void fly(String s) {
        System.out.println(s + "会飞");
    }
}

```



```java
package net.pjsk.test2;

/**
 * @author liyan
 * @date 2021.2.18
 */
public class FlyableDemo {

    public static void main(String[] args) {

        // 方式一、创建接口实现类
        Flyable flyable = new FlyableImpl();
        useFlyable(flyable);

        // 方式二、匿名内部类
        useFlyable(new Flyable() {
            @Override
            public void fly(String s) {
                System.out.println(s + "会飞");
            }
        });

        // Lambda 表达式
        useFlyable((s -> {
            System.out.println(s + "会飞");
        }));
    }

    public static void useFlyable(Flyable f) {
        f.fly("花花");
    }
}
```



## 练习三

>1. 定义一个接口(Addable)，里面定义一个抽象方法， int add(int x,int y)
>
>2. 定义一个测试类(FlyableDemo)，里面提供两个方法：
>   1. void useAddable(Addable a)
>   2. main()方法，用来调用useAddable()方法



```java
package net.pjsk.test3;

/**
 * @author liyan
 * @date 2021.1.18
 */
public class AddableDemo {
    public static void main(String[] args) {

        // 匿名内部类
        useAddable(new Addable() {
            @Override
            public int add(int x, int y) {
                return x + y;
            }
        });

        // Lambda 表达式
        useAddable((x, y) -> {
            return x + y;
        });
    }

    public static void useAddable(Addable a) {
        int result = a.add(1, 2);
        System.out.println(result);
    }
}
```



## Lambda 表达式简写

简写规则如下：

- 参数列表中参数的数据类型可以省略，多个参数时，参数的数据类型要么都省略，要么都不省略；
- 参数列表中只有一个参数时，小括号也可以省略；
- 代码块只有一行时，大括号和分号可以省略；当有return时，则return也要省略；省略大括号分号时，Lambda 表达式要写成一行。



## Lambda表达式和匿名内部类的区别

所需类型不同：

- 匿名内部类：可以是接口、抽象类、具体类
- Lambda表达式：只能是接口



使用限制不同：

- 如果接口中有且只有一个抽象方法，可以使用Lambda表达式，也可以使用匿名内部类；
- 如果接口中有多个抽象方法，只能使用匿名内部类



实现原理不同：

- 使用匿名内部类的形式，在程序编译后，会产生一个单独的.class字节码文件
- 使用Lambda表达式，编译后不会产生单独的字节码文件，对应的字节码文件在程序运行时动态生成。