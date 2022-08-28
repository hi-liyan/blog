---
id: static关键字和final关键字小结
title: static关键字和final关键字小结
---

这里主要说明一下static关键字和final关键字修饰方法在继承时的特点：

父类：

```java
package demo;

/**
 * 父类，定义了三个方法：普通的，static修饰的，final修饰的
 */
public class Demo {
    int a;
    int b;

    //普通的方法
    public void method(){
        System.out.println("我是父类的方法");
    }

    //静态修饰的方法
    public static void method_Static(){
        System.out.println("我是父类的static修饰的方法");
    }

    //final修饰的方法
    public final void method_Final(){
        System.out.println("我是父类的final修饰的方法");
    }
}
```

子类：

```java
package demo;

public class DemoSub extends Demo {
    //static修饰的方法可以被继承，无法被重写（静态方法无法通过'对象名.方法名'的形式调用，只能通过'类名.方法名'调用）
    //final修饰的方法可以被继承，无法被重写（子类对象可以调用父类方法）

    //重写父类的普通方法
    @Override
    public void method() {
        super.method();
    }

    public static void main(String[] args) {
        DemoSub ds = new DemoSub();
        ds.method();//子类对象调用父类的普通方法
        ds.method_Final();//子类对象调用父类的final方法
        DemoSub.method_Static();//子类类名.方法名
    }
}
```

结论：

1. static修饰的方法可以被继承，无法被重写，子类对象无法调用父类的静态方法，只能通过`父类类名.方法名`的方式调用方法。
2. final修饰的方法可以被继承，无法被重写（子类对象可以调用父类的final修饰的方法）

