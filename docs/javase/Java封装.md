---
id: Java封装
title: 12.5 面向对象-封装
---

## 封装

**封装**是面向对象编程的核心思想之一。

通过类将现实事物的状态（属性）和行为抽象成类体现了封装性，限定属性和方法的访问权限是实现封装的方式。

在Java中，一般会将成员属性设置为私有属性，保证外部无法随意修改这些属性，然后提供公共的方法来操作这些属性，保证属性的值是可控的。

其实封装的思想无处不在，例如ATM机，我们只能通过ATM机留出的面板输入密码、输入取款金额等操作，却不能随意让ATM机干任何事，比如取出超过账户余额的钱。

例如下面这个例子：

```java
public class Account {

    // 用户名
    private String name;
    // 账户余额
    private double balance;
    // 操作次数
    private long operationCount;

    public Account(String name, double money) {
        this.operationCount++;
        this.name = name;
        this.balance = money;
    }

    // 存钱
    public void saveMoney(double money) {
        this.operationCount++;
        this.balance += money;
    }

    // 取钱
    public void withdrawMoney(double money) {
        this.operationCount++;
        if (money > this.balance) {
            System.out.println("Insufficient balance.");
            return;
        }
        this.balance -= money;
    }

    // 打印账户信息
    public void printInfo() {
        System.out.println("Account: {name: " + name + ", balance: " + balance + ", operationCount: " + operationCount + "}");
    }
}
```
在这个`Account`类中，对象只能通过`saveMoney`和`withdrawMoney`完成存钱取钱操作，而不能直接修改余额，修改操作次数，这就是封装的思想。

## getter/setter

将成员属性定义为私有的，并提供读、写的方法是一种约定俗成的编写范式。

```java
public class Cat {

    // 昵称
    String nickname;
    // 年龄
    int age;
    // 性别
    String sex;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
```

