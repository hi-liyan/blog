---
id: 关于byte b+=1和b=b+1的问题
title: 7.2 关于byte b+=1和b=b+1的问题
---

*这是今天上课时遇到的问题，我上网查了很多资料，加上自己的理解，做一下解释。*

*首先我们要明确知道一点：*

*Java语言规范明确说明：**整数常量如果末尾带L是long类型，不带L则是int类型**(An integer literal is of type long if it is suffixed with an ASCII letter L or l (ell); otherwise it is of type int )。*

*声明：解释或许不专业，但是理解大概意思即可，没必要纠结为什么这样，非要纠结就从了解javac编译器和学习java源代码开始吧。*



```java
byte b = 1;  //ok
```

```java
byte b = 1;
++b; //ok
```

```java
byte b = 1;
b += 1; //ok
```

```java
byte b = 1;
b = b + 1; //error
```

*图为eclipse中四段代码的演示*

<img src="https://upyun.shiguangping.com/imgs/20200423002624.png" width="400px"/>

这四段代码，前三段代码都没有问题，最后一段代码编译器会报错:`cannot convert from int to byte`

*为什么b=b+1会报错？*

首先，整数常量1是int类型，b是byte类型，(b+1)的值是int类型*（如下图）*，把int类型的值赋值给byte，不经过强制转换，导致编译报错。*（为什么不会强转下面会说道）*

*这里(b+1)，会先把b自动转换成int类型再进行+1运算。*

<img src="https://upyun.shiguangping.com/imgs/20200422232930.png" width="400px"/>

Java把byte、short类型数据提升到int类型这种情况称为**widening conversion**，把int转为byte、short类型这种情况称为**narrowing conversion**。

在赋值时，Java要求赋值符号(＝)右边的类型必须被转为左边的类型。

Java会自动执行转换的情况有5种，其中有**widening conversion**而没有**narrowing conversion**，也就是说Java会自动把byte、short类型数据转换成int，而不会自动把int类型数据转换成byte或者short。所以，第四段代码中b=b+1的右边是int，Java不会自动转为byte，于是造成＝左右类型不一致，导致编译时报错。



*为什么b=1、++b和b+=1编译运行正常？*

上面说Java不会自动把int类型数据转换成byte或者short，那为什么b=1、++b和b+=1不会报错呢？原因是***它们属于特殊情况***。

对于`byte b = 1;`，Java语言规范是这么说的：**如果＝的右边是常量表达式，而且类型是byte、short、char或int，那么Java在必要时会自动执行narrowing conversion，只要这个常量表达式的值在＝左边变量的取值范围之内**(if the expression is a constant expression of type byte, short, char, or int: A narrowing primitive conversion may be used if the type of the variable is byte, short, or char, and the value of the constant expression is representable in the type of the variable) 。

所以，`byte b = 1;` 1是常量表达式，类型是int，且在byte的取值范围之内，所以Java会自动执行narrowing conversion，编译运行正常。但如果写成`byte b = 128;` 128虽然是常量值，但超出byte的取值范围*(-128~127)*，导致编译报错。

对于`++b`，Java语言规范说：**如有必要，++计算之后的结果会先执行narrowing conversion，再存入变量中**（If necessary, the sum is narrowed by a narrowing primitive conversion and/or subjected to boxing conversion (§5.1.7) to the type of the variable before it is stored）。

也就是说b自加1之后的值自动执行了**narrowing conversion**，然后再赋值给b，保证了编译正常。

同样`b+=1`也是一样，它等价于`b = (byte) (b + 1);`，(b+1)的值有一个自动强转的过程，然后再赋值给b，编译运行正常。



*理解即可，不必纠结*

