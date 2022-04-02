---
id: Java方法
title: 12. Java方法
---

一个 Java 方法是为了执行某个操作的一些语句的组合,为了实现特定的某种功能。举个例子来说，当你调用 System.out.println 方法时，系统实际上会执行很多语句才能在控制台上输出信息。

现在你将学习怎么创建你自己的方法，他们可以有返回值也可以没有返回值，可以有参数，也可以没有参数，重载方法要使用相同的方法名称，并在程序设计中利用抽象的方法。

## 创建方法

我们用下面的例子来解释方法的语法：

```java
public static int funcName(int a, int b) {
  // body
}
```

在这里

- public static：修饰符
- int：返回值类型
- funcName：方法名称*（函数名称）*
- a，b：形式参数
- int a,int b：参数列表*（小括号里的内容叫参数列表）*

方法也包含过程或函数。

- 过程：他们不返回值
- 函数：他们返回值

方法的定义包含方法头和方法体。如下所示：

```java
modifier returnType nameOfMethod (Parameter List) {
 // method body
}
```

以上的语法包括

- modifier：他定义了方法的访问类型，它是可选的。
- returnType：方法是可能返回一个值的*（无返回值的方法这里是void，有返回值的填写返回值的数据类型）*。
- nameOfMethod：这是方法的名称。
- Parameter List：参数列表，它是参数的次序，类型，以及参数个数的集合。这些都是可选的，当然方法也可以没有参数。
- 方法体：方法体定义了这个方法是用来做什么的。



### 示例

该方法接受两个参数n1和n2返回两者之间的最小值。

```java
/** the snippet returns the minimum between two numbers */
public static int minFunction(int n1, int n2) {
   int min;
   if (n1 > n2)
      min = n2;
   else
      min = n1;

   return min; 
}
```

## 方法调用

要想使用一个方法，该方法必须要被调用。方法调用有两种方式，一种是有返回值的，一种是没有返回值的。

```java
public class Demo{
  public static void main(String[] args){
    print();//静态方法中可直接调用其他静态方法
    Demo d = new Demo();
    d.add(2,3);//调用非静态方法需要先实例化类的对象，在通过对象名.方法名的形式调用；调用含参方法，调用时需要传入和方法列表数据类型相同的参数。
  }
  public static void print(){
    System.out.println("这是print方法");
  }
  public int add(int a,int b){
    return a+b;
  }
}
```



### 示例

下面的例子表明了怎么定义方法和怎么调用它：

```java
public class Demo{

   public static void main(String[] args) {
      int a = 11;
      int b = 6;
      int c = minFunction(a, b);
      System.out.println("Minimum Value = " + c);
   }

   /** 返回两个数的最小值 */
   public static int minFunction(int n1, int n2) {
      int min;
      if (n1 > n2)
         min = n2;
      else
         min = n1;

      return min; 
   }
}
```

将会产生如下的结果

> Minimum value = 6



## 关键字 void

关键字 void 允许我们创建一个没有返回值的方法。这里我们在下一个例子中创建一个 void 方法 methodRankPoints。这个方法是没有返回值类型的。 

如下所示：

```java
public class Demo {

   public static void main(String[] args) {
      methodRankPoints(255.7);
   }
	
   public static void methodRankPoints(double points) {
      if (points >= 202.5) {
         System.out.println("Rank:A1");
      }
      else if (points >= 122.4) {
         System.out.println("Rank:A2");
      }
      else {
         System.out.println("Rank:A3");
      }
   }
}
```

这将产生如下的结果：

> Rank:A1



## 通过值来传递参数

在调用函数时参数是必须被传递的。并且他们的次序必须和他们创建时的参数次序是一样的。参数可以通过值或引用来传递。

通过值传递参数意味着调用方法的参数，通过参数值来传递给参数。

### 示例

下面的程序给出了一个例子来显示通过值来传递参数。在调用方法后参数值是不会发生变化的。

```java
public class Demo {

   public static void main(String[] args) {
      int a = 30;
      int b = 45;
      // 调用交换方法swapFunction(a,b)
      swapFunction(a, b);
     
   public static void swapFunction(int a, int b) {

      System.out.println("交换之前, a = " + a
                           + " b = " + b);
      // 交换a和b的值
      int c = a;
      a = b;
      b = c;

      System.out.println("交换之后, a = " + a
                           + " b = " + b);
   }
}
```

这将产生如下的结果：

>交换之前, a = 30 b = 45
>交换之后, a = 45 b = 30



## 方法的重载

当一个方法有两个或者更多的方法，他们的**方法名**一样但是**参数**不同时，就叫做方法的重载。*（参数不同指参数个数不同或者参数类型不同，都可以方法重载）*

让我们来考虑之前的找最小整型数的例子。如果我们要求寻找浮点型中最小的数时，我们就需要利用方法的重载来去创建函数名相同，但参数不一样的两个或更多的方法。

下面的例子给予解释：

```java
public class Demo{

   public static void main(String[] args) {
      int a = 11;
      int b = 6;
      double c = 7.3;
      double d = 9.4;
      int result1 = minFunction(a, b);
      // 相同的方法名，不同的参数类型
      double result2 = minFunction(c, d);
      System.out.println("Minimum Value = " + result1);
      System.out.println("Minimum Value = " + result2);
   }

  // 找int类型最小值
   public static int minFunction(int n1, int n2) {
      int min;
      if (n1 > n2)
         min = n2;
      else
         min = n1;

      return min; 
   }
   // 找double类型最小值
   public static double minFunction(double n1, double n2) {
     double min;
      if (n1 > n2)
         min = n2;
      else
         min = n1;

      return min; 
   }
}
```

这将产生如下结果：

>Minimum Value = 6
>Minimum Value = 7.3

重载方法使程序易读。在这里,两种方法名称相同但参数不同。产生整型和浮点类型的最小数作为程序运行结果。

## 使用命令行参数

有时你想要在程序运行之前传递参数。这可以通过给 main 函数传递命令行参数来实现。

在命令行中，当要执行程序文件时，一个命令行参数是紧接着文件名字后面的出现的。要接受命令行参数在 Java 程序中是十分容易的。它们传递到 main 函数字符数组内。



### 示例

下面的例子展示了将所有命令行参数输出的程序：

```java
public class CommandLine {

   public static void main(String args[]){ 
      for(int i=0; i<args.length; i++){
         System.out.println("args[" + i + "]: " +
                                           args[i]);
      }
   }
}
```

通过以下方法来执行该程序：

```shell
java CommandLine this is a command line 200 -100
```

这将产生如下的结果：

>args[0]: this
>args[1]: is
>args[2]: a
>args[3]: command
>args[4]: line
>args[5]: 200
>args[6]: -100



## 构造函数

这是一个简单的使用构造函数的例子:

```java
// 一个简单的构造函数
class MyClass {
   int x;

   //方法名与类型相同
   MyClass() {
      x = 10;
   }
}
```

你可以通过以下方法来调用构造函数来实例化一个对象：

```java
public class ConsDemo {

   public static void main(String args[]) {
      MyClass t1 = new MyClass();
      MyClass t2 = new MyClass();
      System.out.println(t1.x + " " + t2.x);
   }
}
```

通常，你将需要用构造函数来接受一个或多个参数。参数的传递和以上介绍的普通方法的参数传递是一样的，就是在构造函数的名字后面列出参数列表。



### 示例

这是一个简单的使用构造函数的例子:

```java
// A simple constructor.
class MyClass {
   int x;

   // Following is the constructor
   MyClass(int i ) {
      x = i;
   }
}
```

你可以通过以下方法来调用构造函数来实例化一个对象：

```java
public class ConsDemo {

   public static void main(String args[]) {
      MyClass t1 = new MyClass( 10 );
      MyClass t2 = new MyClass( 20 );
      System.out.println(t1.x + " " + t2.x);
   }
}
```

这将产生如下的结果：

> 10 20



## 可变长参数

JDK1.5 能够允许你传递可变长的同一类型的参数。用如下方法进行声明：

```java
typeName... parameterName
```

方法声明时，你要在省略号前明确参数类型，并且只能有一个可变长参数，并且可变长参数必须是所有参数的最后一个。

### 示例

```java
public class VarargsDemo {

   public static void main(String args[]) {
      // Call method with variable args  
      printMax(34, 3, 3, 2, 56.5);
      printMax(new double[]{1, 2, 3});
   }

   public static void printMax( double... numbers) {
   if (numbers.length == 0) {
      System.out.println("No argument passed");
      return;
   }

   double result = numbers[0];

   for (int i = 1; i <  numbers.length; i++)
      if (numbers[i] >  result)
      result = numbers[i];
      System.out.println("The max value is " + result);
   }
}
```

这将产生如下的结果：

>The max value is 56.5
>The max value is 3.0



## finalize() 方法

你可以定义一个方法，仅在被垃圾收集器销毁之前才会被调用。这个方法叫做 finalize() 方法，它也可以用来确保一个对象被干净清除了。

举个例子，你也许用 finalize() 来确保被一个对象打开的文件已经关闭了。

为了给类添加一个终结器，你只需定义 finalize() 方法。Java要回收该类的一个对象时，会调用该方法。

在 finalize() 方法中，你将指定一些必须在对象销毁之前要做的行为。

finalize()方法一般是如下形似：

```java
protected void finalize( )
{
   // finalization code here
}
```

这里，关键字 protected 是为了保证在类外的代码不能访问 finalize() 方法。

这意味着你不能知道 finalize() 什么时候执行。举个例子，如果你的程序在垃圾收集器发生之前就结束了，finalize() 方法将不会被执行。