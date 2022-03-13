---
id: javase-note
title: JavaSE 语法
---
## Java 之父😄

1996年Sun公司发布了Java第一版，后来服务器市场效益不好，Sun公司凉了，最终被Oracle公司收购，目前Java一直由Oracle维护。

![img](https://images.shiguangping.com/imgs/20210623232059.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg)

Java之父：**詹姆斯·高斯林**。



## 学前要说😅

对于刚接触编程的小伙伴来说，学习的前几天是比较难熬的，很多名词（什么JDK啊、javac啊、编译啊、字节码啊、关键字啊、基本数据类型啊等等）可能都是第一次听说，看了一天视频或者文档，最后一脸懵逼，毫没有头绪。

这是所有刚接触编程的小伙伴都会遇到的情况，所以千万不要怀疑自己，是不是自己不适合学编程，千万不要有这种想法。

俗话说，万事开头难，但是我们要开好这个头，这个很关键。学习兴趣的培养，就靠一开始对编程的第一印象，印象好，学习劲头就会足。我们要抱着“这个代码为什么要这么写？”的疑问一直学下去，答案会在后面等着你。

学编程不要有抵触情绪，学习要抱着**求知**的心态来学，那么知识就会像水一样滚滚而来。

加油吧！



> 文档必然有不足，欢迎评论指正，接受积极有意义的评论指正，谢谢。



## 一、初学Java

### 1.1 Hello World

学习一门语言一般都会从写“Hello World”开始，我也不落俗，通过第一个Java程序**Hello World**来入门Java。

可以使用记事本或者任意的文本编辑器编写下面一段代码，Java文件以`.java`后缀。

```java
public class Hello {
	public static void main(String[] args){
		System.out.print("Hello World");
	}
}
```

在终端（cmd/Terminal）通过`javac`命令编译Hello.java文件，Java编译器会将`.java`文件编译成二进制的`.class`文件。

控制台输入：

```bash
javac Hello.java
```



目录下会生成一个`Hello.class`文件，这是一个二进制的字节码文件，使用`java`命令运行字节码文件。（注意：不要带.class后缀）

```bash
java Hello
```

控制台会执行打印语句打印出`Hello World`。

![image-20210719200414296](https://images.shiguangping.com/imgs/image-20210719200414296.png)



### 1.2 认识Java中的关键字

#### 什么是关键字？

关键字是被Java语言赋予了特定含义的单词，这些单词具有特定的功能，通过Java提供的这些关键字来实现特定的功能，如定义一个类、声明一个变量。

**注意：Java语言中所有的关键字都是小写的，并且Java语言是严格区分大小写的。**



#### 什么是保留字？

Java中将个别单词如`goto`、`const`等作为保留字，这些单词大多是其它语言中的关键字，但在Java中目前并没有使用，但是Java保留字不能被用作标识符使用（后面会讲到标识符）。



#### Java中的关键字

| 用于数据类型的                                               |
| :----------------------------------------------------------- |
| boolean、byte、char、 double、 false、float、int、long、new、short、true、void、instanceof |

| 用于语句的                                                   |
| :----------------------------------------------------------- |
| break、case、 catch、 continue、 default 、do、 else、 for、 if、return、switch、try、 while、 finally、 throw、this、 super |

| 用于修饰的                                                   |
| :----------------------------------------------------------- |
| abstract、final、native、private、 protected、public、static、synchronized、transient、 volatile |

| 用于方法、类、接口、包和异常的                               |
| :----------------------------------------------------------- |
| class、 extends、 implements、interface、 package、import、throws |

| 其它的                                                       |
| :----------------------------------------------------------- |
| 还有些关键字,如cat、 future、 generic、innerr、 operator、 outer、rest、var等都是Java保留的没有意义的关键字。另外，Java还有3个保留字:true、false、null。它们不是关键字，而是Java用来定义某些数据类型的值，和关键字一样，它们也不可以作为标识符使用。 |



### 1.3 标识符

Java中代码中所有能够自己定义名字的地方，都被称作标识符。如：**类名、变量名、方法名、接口名、枚举名**。Java中的关键字和保留字不能被用做标识符。



#### 标识符的命名规则

Java中标识符的命名具有一定规则：

1. 标识符的组成：
   - 字母
   - 数字
   - 下划线 _
   - 美元符 $
2. 标识符开头不能为数字
3. 标识符中不能有空格
4. 标识符不能是Java的关键字或者保留字



#### 标识符的命名规范

标识符的命名规则是Java规定的，具有强制性，如果不符合上述命名规则，代码在编译阶段会报错。但标识符的命名还要遵守一定的规范，这是一种共识但不是强制性的，大家共同遵守这种命名风格，可以大大提高代码的可读性和维护性。

1. 标识符的命名要有意义，尽量使用英文单词，见名知义；

2. **类名**、**接口名**、**枚举名**要使用大驼峰命名法，即：标识符由一个单词构成，单词首字母大写；标识符由多个单词构成，没个单词首字母均大写。

   ```java
   public class UserInfo {
       // ...
   }
   ```

3. **变量名**、**方法名**要使用小驼峰命名法，即：标识符由一个单词构成，单词使用小写；标识符由多个单词构成，则第一个单词首字母小写，其余后面每个单词首字母均大写。

   ```java
   String userName = "李达康";
   ```

4. **常量名**，单词的字母均大写，如果由多个单词构成，单词之间用下划线连接；

   ```java
   int DELETE_FLAG = 0;
   ```

5. 包名使用域名的反写形式；

   ```java
   com.shiguangping.xxx
   ```




### 1.3 认识注释

在编程语言中，**注释**是编程语言的一个重要组成部分，起到在源代码中解释说明一段代码功能的作用，增强代码的可读性，可维护性；也可以在调试代码时将暂时不需要运行的代码段注释掉，起到调试代码的作用。

通俗地说，注释是用来解释代码功能的一段儿说明，增加代码可读性，使代码更易于维护。Java源文件在编译过程中，编译器会自动忽略调注释的内容，注释是不参与程序运行的。



#### Jave的注释格式

Java中有3中注释类型：

1. 单行注释（一般用于在方法内解释某段代码的）
2. 多行注释
3. 文档注释（一般用于解释类、成员属性、成员方法作用的）

- 单行注释，描述一行可以完成的内容

  ```java
  public class Demo{
  	public static void main(String[] args){
      	// Hello World
          System.out.println("Hello World");
    }  
  }
  ```

  

- 多行注释，注释内容为多行，多行注释不能嵌套使用

  ```java
  public class Demo{
    /*
    这是多行注释
    可以换行继续写
    多行注释中可以嵌套单行注释
    //例如这样
    */
  	public static void main(String[] args){
      //方法体
    }  
  }
  ```

- 文档注释（按项目组要求完成注释）

  ```java
  /**
  	这是文档注释
  */
  
  public class Demo{
  	public static void main(String[] args){
      //方法体
  	}  
  }
  ```



### 1.4 认识基本数据类型

计算机从设计之初，就是用来计算数据的，我们常见的类型有整数、小数等。

Java语言提供了8种基本数据类型：

| 数据类型 | 说明         | 内存大小 | 取值范围                                               |
| :------- | :----------- | :------- | :----------------------------------------------------- |
| char     | 字符         | 2byte    | \u0000 ~ \uffff 十进制表示0-65535                      |
| byte     | 字节         | 1byte    | -128 ~ 127                                             |
| short    | 短整型       | 2byte    | -32768 ~ 32767                                         |
| int      | 整型         | 4byte    | -2,147,483,648 ~ 2,147,483,647                         |
| long     | 长整型       | 8byte    | -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807 |
| float    | 单精度浮点数 | 4byte    |                                                        |
| double   | 双精度浮点数 | 8byte    |                                                        |
| boolean  | 布尔类型     | 1byte    | false/true                                             |



**char**

char字符类型一个单一的16位Unicode字符。

char类型可以存储任意字符，在Java中使用**单引号**表示char类型的值。

```java
char c = 'A';
```



**long**

在Java语言中，一个整数常量值会被默认作为int类型，所以在表示long型值的时候，需要在数值后加上`l`或者`L`表示long型。

```java
long i = 100L;
```



**float**

float表示单精度浮点数（小数），Java会把一个小数值默认当作double，所以在表示float值时，数值后需要加上`f`或者`F`表示float型。

```java
float f = 1.1f;
```



Java语言中除了基本数据类型之外，还有一种引用数据类型，在后面学到的数组、类、接口、枚举都属于引用数据类型。也可以说，在Java中除了基本数据类型之外的都属于引用数据类型。

```java
String s = "Hello World";
```



### 1.5 变量👈

#### 什么是变量？

变量是计算机语言中用来存储数据的一种抽象概念，实际变量（数据）存储在计算机的物理内存中。在编程语言中，通过定义一个**变量名**指向一个内存地址来读取内存中存储的数据。

Java代码的执行实际是在JVM虚拟机中，JVM会根据我们在Java代码中定义的变量在内存中开辟出一段儿连续的内存空间用来存放数据，变量名实际是内存地址的引用。

Java语言属于强类型的编程语言，在声明变量时必须指定变量的数据类型，也就是说Java中的变量是用来存放固定数据类型的。例如声明一个整型(int)变量，该变量只能用来存放整数值。



:::tip 示例代码

```java
public class Demo{
  public static void main(String[] arge){
    int a = 10; // 定义一个整型变量a，把整数常量10赋值给变量a
    double b = 10.0; // 定义一个double类型的变量b
  }
}
```

定义一个int类型变量a，将10赋值给a。实际上，真实的整数10是存放在内存中的，变量a实际指向的是存放整数10的这一段儿内存地址。

:::



#### 创建变量

创建变量的形式一般有两种：先声明后赋值、声明的同时赋值。

1. 先声明后赋值。

   ```java
   int a; // 声明一个整型变量a
   a=10; // 将10赋值给变量a
   ```

2. 声明变量同时赋值。

   ```java
   int a = 10; // 声明一个整型变量a，并将10赋值给变量a
   ```



#### 变量初始化

声明一个变量后赋初始值的过程被称作变量的初始化。可以先声明变量后初始化，也可以声明变量的同时初始化。



#### 使用变量

变量名实际指向的是物理内存地址，通过变量名访问存放在该内存地址的数据，实现获取和修改该内存中的值。

简单的说就是通过调用变量名完成对变量的赋值和取值：

```java
public class Demo{
  public static void main(String[] args){
    int a = 10; // 声明变量a并赋值10
		System.out.println(a); // 通过调用变量名a来获取变量的值
  }
}
```



#### 变量的分类

变量按在类中声明位置不同可以分为“成员变量”和“局部变量”：

- 成员变量：定义在类的内部，方法的外部（在面向对象编程里，也叫**成员属性**）。

  ```java
  public class Demo1{
    static int a;//成员变量a,类的内部,方法的外部
    public static void main(String[] args){
      System.out.println(a)
    }
  }
  ```

- 局部变量：定义在方法的内部。

  ```java
  public class Demo1{
    public static void main(String[] args){
      int b;//局部变量b
      System.out.println(b)
    }
  }
  ```



成员变量和局部变量的区别：

1. 定义位置不同；

2. 初始化不同：成员变量如果没有手动初始化，则类被加载的时候JVM会为其初始化赋默认值；局部变量则必须手动初始化后才能被调用，否则会在编译阶段报错；

3. 成员变量有访问权限修饰符，局部变量没有，局部变量只能在方法内使用；

4. 局部变量优先的问题：

   ```java
   public class Demo{
     static int a = 0;//成员变量a
   
     public static void myMethod1(){
       int a = 20;//局部变量也可声明a：局部优先
       System.out.println("myMethod1方法:"+a);
     }
   
     public static void main(String[] args){
       System.out.println("主方法:"+a);
       myMethod1();
     }
   }
   ```

   编译并运行：

   ```
   主方法:0
   myMethod1方法:20
   ```

   

    

   #### 变量的初始值

   变量可以在声明的时候赋值，也可以在声明之后赋值，但：

   - 如果一个局部变量没有被赋初始值（初始化），则该变量无法被使用；
   - 成员变量声明后没有初始化，在类加载阶段系统会自动为其初始化，赋默认值。如int类型变量默认值是0、boolean类型默认值是false。

   

   局部变量：

   ```java
   public class Demo1{
     public static void main(String[] args){
       int a; // 声明局部变量a
       System.out.println(a); // 此处在编译时会报错，因为a没有初始化。
     }
   }
   ```

   

   成员变量：

   ```java
   public class Demo1{
     static int a; // 声明成员变量a
     
     public static void main(String[] args){
       System.out.println(a); // 0
     }
   }
   ```

   

   #### 变量作用域

   变量是有作用域范围的，一个变量的作用范围取决于它声明的位置，它的作为范围是在它所在的大括号内以及这个大括号中嵌套的大括号。

   

   举个例子：

   - 字符串a声明在这个类成员属性的位置，也就是最外面的大括号中，那么在这个大括号以及内部的大括号中都可以访问字符串a：

   ```java
   public class Demo{
     String a = "我是一个字符串！"; 
     
     public static void main(String[] args){
       System.out.println(a);
     }
   }
   ```

   

   - 下面的字符串a生米拿在myMethod()方法中，所以a只能在该方法中被调用，而在该方法外部无法被使用：

   ```java
   public class Demo1{
     public static void main(String[] args){
       
     }
     public static void myMethod(){
       String a = "我是一个字符串！" //此处的a只能在该方法下使用，因为a的作用域只在所在的{}内。
     }
   }
   ```



### 1.6 常量

变量声明之后可以被重新赋值的，但常量初始化后不允许再次被赋值。在Java语言中，使用`final`关键字修饰变量来表示常量。常量在声明时必须初始化，或者在构造方法中初始化，并且初始化之后不能被再次赋值。



常量的命名一般为单词大写，这个在标识符的命名规范中有提到：

```java
final double PI = 3.14；
```

如果常量名由多个单词组成，使用下划线连接：

```java
final int MAX_NUM = 999;
```



### 1.7 数据类型转换

在实际开发过程中，有时需要将一种数据类型的值转换成另一种数据类型，这个过程称为数据类型转换。

![](https://images.shiguangping.com/imgs/20200421155446.jpg)

由于每个数据类型所占用的内存空间大小不同，所以在类型转换时也有区别，类型转换主要分为自动类型转换（隐式转换）和强制类型转换（显示转换）两种。



#### 自动类型转换（隐式类型转换）

空间占用小的数据往大转是自动类型转换，可以理解为：我们可以直接把一个小盒子放到一个大盒子里面。

:::tip 示例代码

```java
public class Demo {
	public static void main(String[] args) {
		/*
		 * 观察b到s的转换，s到i的转换，这个过程是隐式转换（自动转换）
		 */
		byte b = 1;
		short s = 2;
		int i = 3;
		
		s = b;
		i = s;
		System.out.println("b(byte)转换成s（short）的值为："+s); // b(byte)转换成s（short）的值为：1
		System.out.println("s(short)转换成i（int）的值为："+i); // s(short)转换成i（int）的值为：1
	}
}
```

:::

从小的存储空间到大的存储空间转换，一般都是自动类型转换（隐式类型转换），byte->short->int->long。



:::tip 关于整数的默认类型，以及会产生的一些小问题

在基本数据类型当中，Java会把整数默认为int类型，会把小数默认为double类型，这句话怎么解释呢？

```java
byte a = 100; //java会把100当做int类型，100没有超出byte的内存大小，所以可以成功赋值
short b = 200; //short也是同样道理
int c = 300;
```

***byte a = 100; 为什么int类型的整数，可以直接赋值给byte呢？***

*原因在于，byte的取值范围是-128~127之间，我们一般向下转型时，会产生精度丢失。但是我们使用明确的数值常量（-128~127）给byte赋值时，是不会产生精度丢失的，因为整数常量100在byte的取值范围内，编译器是认识常量值的，知道100在byte的合法取值范围内。因此，Java允许这样赋值。*

但是有些情况会出现问题，比如下面的代码。在编译的时候，是报错的：

```java
 long num = 99999999999999;  // error
```

***把整数99999999999999赋值给long num为什么会报错呢？***

*原因：因为99999999999999在 Java编译器中默认是int类型，但是 99999999999999 明显的超出了 int 的取值范围；因此，这里就会报错，我们需要在整数后面加上一个 L ，告诉编译器，这是一个 long 类型数字 ；*

```java
long num = 99999999999999L;  // ok
```



下面的代码，作为参考理解：

```java
byte a = 50;  //ok
byte b = 60;  //ok
byte c = a+b;  //error
byte c = 10+20;  //ok
byte d = 127+5;  //error 127+5超出了byte取值范围
```

***byte c = a+b; 为什么会报错呢？***

*上面说int整数常量赋值给byte，在byte取值范围内可以赋值，为什么这里会报错呢？原因在于，a和b都是变量，编译器虽然可以知道a和b的两个变量的值都在byte取值范围内，但是由于它们是变量，变量相加的值，编译器在编译期间是无从得知的，因此也无法判断相加的值会不会超过byte的取值范围，所以会报错。*

:::



#### 强制类型转换（显式类型转换）

强制类型转换就是将大的数据类型转换成小的数据类型，这种情况有可能会丢失精度，无法保证数值的准确性。可以理解为：将一个大盒子塞到一个小盒子里，肯定得把大箱子折一折，出现损失。

```java
double a = 10.1;
float b = (float)a; //需要把double类型的a强制转换成float
```



:::tip 关于byte b+=1和b=b+1的问题

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

![](https://images.shiguangping.com/imgs/20200423002624.png)

这四段代码，前三段代码都没有问题，最后一段代码编译器会报错:`cannot convert from int to byte`

*为什么b=b+1会报错？*

首先，整数常量1是int类型，b是byte类型，(b+1)的值是int类型*（如下图）*，把int类型的值赋值给byte，不经过强制转换，导致编译报错。*（为什么不会强转下面会说道）*

*这里(b+1)，会先把b自动转换成int类型再进行+1运算。*

![](https://images.shiguangping.com/imgs/20200422232930.png)

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

:::



### 1.8 进制

#### 计算机中的存储单位

计算机存储的数据都是以二进制比特位数据来存储的，计算机处理的数据都是0和1。

1byte=8bit（8个位数的二进制）



1个数字或者1个字母占用1个字节

1个汉字占用2个字节



*为什么Java中char类型只能存1个字母或数字呢？*

char类型的值是1个字符（无论是数字、字母还是汉字），1个字符在计算机中占用2个字节



#### 常用进制

十进制：逢十进一，每个位数上只能是0-9的任意数字；

二进制：逢二进一，每个位数上只能是0或1；

八进制：逢八进一，每个位数上只能是0-7的任意数字；

十六进制，逢十六进一，每个数位上可以使0-9，A-F的任意数字；



#### 通过Java内置类实现进制转换

通过Integer类实现进制转换

```java
package com.neu.demo;

/**
 * @author liyan 
 * 说明：通过Java完成进制转换
 */
public class Demo {
	public static void main(String[] args) {
		/*
		 * 通过Java自带的内置类完成进制转换
		 * 类名：Integer
		 * 方法名：toBinaryString() 将数值转换为二进制
		 * 方法名：toOctalString() 将数值转换为八进制
		 * 方法名：toHexString() 将数值转换为十六进制
		 * 
		 */
		
		System.out.println("十进制55转换为二进制结果为："+Integer.toBinaryString(55));
		System.out.println("十进制55转换为八进制结果为："+Integer.toOctalString(55));
		System.out.println("十进制55转换为十六进制结果为："+Integer.toHexString(55));	
	}
}
```



### 1.9 运算符

计算机的主要用途之一就是运算，Java语言提供了如下几种运算符来操作变量：

- 算术运算符
- 赋值运算符
- 关系运算符
- 逻辑运算符
- 条件运算符
- 位运算符
- ...



#### 赋值运算符

| 运算符 | 描述                                      | 示例        |
| ------ | ----------------------------------------- | ----------- |
| =      | 将赋值符号`=`右侧的值赋值给符号左侧的变量 | int a = 10; |





#### 算术运算符

| 运算符 | 描述                              | 示例                      |
| :----- | :-------------------------------- | :------------------------ |
| +      | 加法 - 相加运算符两侧的值         | 10 + 5                    |
| -      | 减法 - 左操作数减去右操作数       | 10 - 5                    |
| *      | 乘法 - 相乘操作符两侧的值         | 10 * 5                    |
| /      | 除法 - 左操作数除以右操作数       | 10 / 5                    |
| ％     | 取余 - 左操作数除以右操作数的余数 | 10%5                      |
| ++     | 自增: 操作数的值增加1             | i++ 或 ++i （两种有区别） |
| --     | 自减: 操作数的值减少1             | i-- 或 --1（两种有区别）  |

`+` 号还有多种用法：

| 运算符 | 描述         | 示例              |
| ------ | ------------ | ----------------- |
| +      | 相加         | 1 + 1             |
| +      | 表示一个正数 | +5                |
| +      | 字符串拼接符 | "Hello" + "World" |



自加、自减运算符在变量前后位置不同，执行的顺序也不同：

| 运算符 | 描述                                          |
| ------ | --------------------------------------------- |
| ++i    | ++ 在变量左侧，先执行+1操作，再执行当前行语句 |
| i++    | ++ 在变量右侧，先执行当前行语句，再执行+1操作 |
| --i    | -- 在变量左侧，先执行-1操作，再执行当前行语句 |
| i--    | -- 在变量右侧，先执行当前行语句，再执行-1操作 |

:::tip 代码示例

```java
public class Demo {
    public static void main(String[] args) {
        int i = 10;
        System.out.println(++i); // 打印：11 （++在前，先自加，在执行语句）
        System.out.println(i); // 打印：11
    }
}
```



```java
public class Demo {
    public static void main(String[] args) {
        int i = 10;
        System.out.println(i++); // 打印：10 （++在后，先在执行语句，再自加）
        System.out.println(i); // 打印：11
    }
}
```

:::

自加、自减运算符的优先级高于其他算术运算符。



:::tip 思考题

```java
public class Demo03 {
	public static void main(String[] args) {
		int a = 12;
		int b = 45;
		int c;
		
		c = a + b--;
		
		System.out.println("a的值："+a);
		System.out.println("b的值："+b);
		System.out.println("c的值："+c);
	}
}
```

运行结果：

```
a的值：12
b的值：44
c的值：57
```

:::

其它几种算数运算符：

| 运算符 | 描述                      |
| ------ | ------------------------- |
| +=     | a += 1，相当于 a = 1 + 1; |
| -=     | a -= 1, 相当于 a = a - 1; |
| *=     | a *= 1, 相当于 a = a * 1; |
| /=     | a /= 1, 相当于 a = a / 1; |
| %=     | a %= 1, 相当于 a = a % 1; |



#### 关系运算符

关系运算符也称作“比较运算符”，对两个数值（变量、表达式）进行比较。

| 运算符 | 描述                                                    |
| :----- | :------------------------------------------------------ |
| ==     | 判断两个数值是否相等，如果相等返回true，不等返回false   |
| !=     | 判断两个数值是否不等，如果不相等返回true，相等返回false |
| >      | 判断一个数是否大于另外一个数                            |
| <      | 判断一个数是否小于另外一个数                            |
| >=     | 判断一个数是否大于等于另外一个数                        |
| <=     | 判断一个数是否小于等于另外一个数                        |

:::tip 代码示例

```java
public class Demo {
	public static void main(String[] args) {
		/*
		 * 关系运算符也成为比较运算符
		 */
		int a = 10;
		int b = 12;
		System.out.println(a>b); //比较运算符显示的值是boolean类型的值
		System.out.println(a<b);
		System.out.println(a<=b);
		System.out.println(a>=b);
		System.out.println(a!=b);
		System.out.println(a==b);		
	}
}
```

运行结果：

```
false
true
true
false
true
false
```

:::



#### 逻辑运算符

逻辑运算符是用来作布尔值运算的，`&&`和`||`运算符左右两边必须是布尔值表达式，`!`运算符右边必须是布尔表达式。

| 运算符 | 描述                                               | 例子                    |
| :----- | :------------------------------------------------- | :---------------------- |
| &&     | 逻辑与运算符，当&&左右两边都为true时，则返回true   | true&&true，返回true    |
| \|\|   | 辑或操作符，当\|\|左右两边有一边为true，则返回true | true\|\|false，返回true |
| !      | 逻辑非运算符，用来反转布尔值的。                   | !true，则返回false      |

:::tip 代码示例

```java
public class Demo {
	public static void main(String[] args) {
		
		System.out.println("true&&true: "+(true&&true)); //与
		System.out.println("true&&false: "+(true&&false)); //或
		System.out.println("true||false: "+(true||false)); //非
		System.out.println("!false: "+!false);	
	}
}

```

运行结果：

```
true&&true: true
true&&false: false
true||false: true
!false: true
```

:::



**扩展：**

`&&`逻辑与，也称”短路与运算“（短路运算符），当短路与左侧的表达式为false时，直接返回false，右侧的表达式不再参与运算；

`&`单个与不属于短路运算，`&`左侧表达式为false时，右侧仍然继续运算，最后返回结果。

`||` 逻辑或，也称”短路或运算“（短路运算符），当逻辑或左侧的表达式为true时，直接返回true，右侧的表达式不再参与运算；

`|` 单个或，`|`左侧表达式为true时，右侧仍继续运算，最后返回结果。

*开发中逻辑运算推荐使用短路与、短路或。*





#### 条件运算符

条件运算符也称为三元运算符。

条件运算符包含了三个表达式，固定写法如下：

```java
布尔表达式 ? 表达式1 : 表达式2;
```

当布尔表达式为true时，则返回表达式1的值作为三元运算的结果；当条件表达式为false时，则返回表达式2的值作为三元运算的结果。

:::tip 示例代码

```java
public class Demo {
	public static void main(String[] args) {
		int a = 24;
		int b = 25;
		int c;
		
		c = a > b ? a : b;
		System.out.println(c); // 结果：25
	}
}
```

:::



:::tip 利用三元运算符比较三个数的大小

```java
public class Demo10 {
	public static void main(String[] args) {
		int a = 24;
		int b = 25;
		int d = 56;
		int c;
		c = (a>b?a:b)>d?(a>b?a:b):d;
		System.out.println(c); // 结果：56
	}
}
```

:::



### 1.10 流程控制

代码在执行过程中是按照顺序结构执行的，但有时候我们需要控制程序的执行流程，例如重复执行一段代码。

Java中的流程控制包括：

- 条件语句（if、switch）
- 循环结构（for、while等）



### 1.11 条件语句

在 Java中有两种条件判断语句：

- if语句
- switch语句



#### if

if语句由一个布尔表达式跟一个或多个语句组成。

```java
// 如果a>b,则执行代码块中的输出语句
if (a>b) {
  System.out.println("如果a>b为true，则执行该输出");
}
```

:::tip 示例代码

```java
public class Test {

   public static void main(String args[]){
      int x = 10;

      if( x < 20 ){
         System.out.print("This is if statement");
      }
   }
}
```

这将产生以下结果：

```
This is if statement
```

:::



#### if...else

任何一个if语句后面可以跟一个可选的else语句，当布尔表达式为false，else代码块语句被执行。

```java
if(a>b){
  System.out.println("如果a>b为true，则执行该输出");
}else{
  System.out.println("如果a>b为false，则执行该输出");
}
```

:::tip 示例代码

```java
public class Test {

   public static void main(String args[]){
      int x = 30;

      if( x < 20 ){
         System.out.print("This is if statement");
      }else{
         System.out.print("This is else statement");
      }
   }
}
```

这将产生以下结果：

```
This is else statement
```

:::





#### if...else if...else

if后面可以跟一个可选的else if...else语句，在不同条件下单一的if语句和else if语句是非常有用的。

```java
if(a>b){
  System.out.println("如果a>b为true，则执行该输出");
}else if(a==b){
  System.out.println("如果a==b为true，则执行该输出");
}else{
  System.out.println("如果上述两个布尔表达式都为false，则执行该输出");
}
```



当使用if、else if、else语句时有几点要牢记。

- if 语句至多有 1 个 else 语句，else 语句在所有的 else if 语句之后。

- if 语句可以有若干个 else if 语句，它们必须在 else 语句之前。

- 一旦其中一个 else if 语句检测为 true，其他的 else if 以及 else 语句都将跳过执行。

  

:::tip 示例代码

```java
public class Test {

   public static void main(String args[]){
      int x = 30;

      if( x == 10 ){
         System.out.print("Value of X is 10");
      }else if( x == 20 ){
         System.out.print("Value of X is 20");
      }else if( x == 30 ){
         System.out.print("Value of X is 30");
      }else{
         System.out.print("This is else statement");
      }
   }
}
```

这将产生以下结果：

```
Value of X is 30
```

:::





#### if 的嵌套

在if语句或者else的代码块中仍然可以使用if做条件判断。

```java
if(a>b){
  if(a==10){
    System.out.println("如果a>b为true，并且a==10时，执行该语句")
  }
}
```

::: 示例代码

```java
public class Test {

   public static void main(String args[]){
      int x = 30;
      int y = 10;

      if( x == 30 ){
         if( y == 10 ){
             System.out.print("X = 30 and Y = 10");
          }
       }
    }
}
```

这将产生以下结果：

```
X = 30 and Y = 10
```

:::



#### switch

switch语句允许一个变量来对一系列值的相等性进行判断。每个值被称为**case**，传进来的变量会与每一个case的值进行判断，直到终止。

```java
switch(expression){
    case value :
       //语句
       break; //可选
    case value :
       //语句
       break; //可选
    //你可以有任意数量的case语句
    default : //可选
       //语句
}
```



以下规则适用于 switch 语句：

- 在 switch 语句中使用的变量只能是byte、short、int、char、枚举类型（enum JDK5以后）、String（JDK7以后）这几种数据类型。
- 在一个 switch 语句中可以有任何数量的 case 语句。每个 case 后跟着即将被比较的值和一个冒号。
- 对于 case 的值必须是相同的数据类型作为开关变量，它必须是一个常量或文字。
- 当被启动了的变量与 case 是相等的，那 case 后的语句将执行，一直到 break 为止。
- 当达到一个 break 语句，switch 终止，并且控制流跳转到跟着 switch 语句的下一行。
- 不是每一个 case 需要包含一个 break。如果没有出现 break，控制流将贯穿到后面的 case 直到 break 为止。
- switch 语句可以有一个可选默认 case ，它必须出现在 switch 的结束处。在执行一项任务时没有任何 case 是真，那默认 case 可被使用。在默认 case 中不需要 break。



:::tip 示例代码

```java
public class Test {

   public static void main(String args[]){
      //char grade = args[0].charAt(0);
      char grade = 'C';

      switch(grade)
      {
         case 'A' :
            System.out.println("Excellent!"); 
            break;
         case 'B' :
         case 'C' :
            System.out.println("Well done");
            break;
         case 'D' :
            System.out.println("You passed");
         case 'F' :
            System.out.println("Better try again");
            break;
         default :
            System.out.println("Invalid grade");
      }
      System.out.println("Your grade is " + grade);
   }
}
```

编译并运行上面使用各种命令行参数的程序。这将产生以下结果：

```
Well done
Your grade is a C
```

:::



### 1.12 循环语句

在开发中存在这样一种常见情况，需要循环执行某段代码，例如遍历一个数组、集合。Java提供了非常灵活的三种循环机制：

- while 循环
- do...while 循环
- for 循环
- foreach 循环



#### while

while循环是一个控制结构，可以重复的特定任务次数，只要while的布尔表达式为true，则循环体会一直重复执行。

```java
while(布尔表达式)
{
   // 语句
}
```

在执行时，如果布尔表达式的结果为真，则循环中的动作将被执行。只要该表达式的结果为真，执行将继续下去。

在这里，while循环的关键点是循环可能不会永远运行。当表达式进行测试，结果为假，循环体将被跳过，在while循环之后的第一个语句将被执行。

:::tip 示例代码

```java
public class Test {

   public static void main(String args[]) {
      int x = 10;

      while( x < 20 ) {
         System.out.print("value of x : " + x );
         x++;
         System.out.print("\n");
      }
   }
}
```

这将产生以下结果:

```
value of x : 10
value of x : 11
value of x : 12
value of x : 13
value of x : 14
value of x : 15
value of x : 16
value of x : 17
value of x : 18
value of x : 19
```

:::



#### do...while

do ... while循环类似于while循环，不同点在于while循环是先判断是否满足条件再执行，do ... while循环是先执行，再判断是否满足条件，保证至少执行一次。

```java
do
{
   // 语句
} while (布尔表达式);
```

先执行，再判断。如果布尔值为true，继续下一次循环；布尔值为false，结束循环。



:::tip 示例代码

```java
public class Test {

   public static void main(String args[]){
      int x = 10;

      do{
         System.out.print("value of x : " + x );
         x++;
         System.out.print("\n");
      }while( x < 20 );
   }
}
```

这将产生以下结果:

```
value of x : 10
value of x : 11
value of x : 12
value of x : 13
value of x : 14
value of x : 15
value of x : 16
value of x : 17
value of x : 18
value of x : 19
```

:::



#### for

for循环是一个循环控制结构，可以有效地编写需要执行的特定次数的循环。

```java
for(初始化声明变量; 布尔表达式; 更新)
{
   // 语句
}
```

for循环的控制流程：

1. 初始化阶段声明变量，仅在for循环开始时执行一次。这一步可声明和初始化用于控制循环的变量；
2. 执行布尔表达式，如果为true，执行循环体内的语句；如果为false，结束循环；
3. 循环体执行结束之后，执行更新语句；
4. 更新语句执行结束后继续执行布尔表达式，重复上面2的阶段。



示例代码：

```java
public class Test {

   public static void main(String args[]) {
       // 计算1-100的累计和
	  int sum = 0;
      for(int i = 1; i <= 100; i++) {
         sum += i;
      }
       
       System.out.println(sum); // 结果 5050
   }
}
```

:::



#### foreach

foreach也称为“增强型for循环”，在遍历数组、集合时非常简单有效。

```java
for(声明变量 : 表达式)
{
   // 语句
}
```





:::tip 示例代码

```java
public class Test {

   public static void main(String args[]){
       // 定义数组
      int [] numbers = {10, 20, 30, 40, 50};
		
       // foreach遍历数组，打印数组中的元素
      for(int x : numbers ){
         System.out.print( x );
         System.out.print(",");
      }
      System.out.print("\n");
      String [] names ={"James", "Larry", "Tom", "Lacy"};
      for( String name : names ) {
         System.out.print( name );
         System.out.print(",");
      }
   }
}
```

这将产生以下结果:

```
10,20,30,40,50,
James,Larry,Tom,Lacy,
```

:::



### 1.13 break、continue关键字

这里介绍下break和continue关键字在循环中的使用。

#### break

`break`关键字是用来停止整个循环的。 break使用在循环结构和switch结构当中。



break在循环中单独作为一条语句：

```java
break;
```

:::tip 示例代码

```java
public class Test {

    public static void main(String[] args) {

        int [] numbers = {10, 20, 30, 40, 50};
        // 遍历numbers
        for(int x : numbers ) {
            // 如果x为30时，结束循环
            if( x == 30 ) {
                break;
            }
            System.out.println( x );
        }
    }
}
```

程序执行结果:

```
10
20
```

:::



注意：如果是嵌套循环，break只会终止当前循环结构，如果有外层循环则不会终止外层的循环结构。也就是说，当内层循环遇到break终止后，程序会继续执行外层循环。



#### continue

continue在循环中使用时，会停止本次循环并且continue后面的代码不会执行，然后立即跳转到下一次循环。

- 在for循环中，程序执行到continue时，不会再执行后面的代码，而是跳转到更新语句中；
- 在while循环或do...while循环中，程序执行到continue时，不会再执行后面的代码，而是跳转到布尔表达式进行判断是否执行下一次循环。



continue 语法是任何循环中一个单独的语句：

```java
continue;
```

:::tip 示例代码

```java
   public static void main(String args[]) {
      int [] numbers = {10, 20, 30, 40, 50};

      for(int x : numbers ) {
         if( x == 30 ) {
          continue;
         }
         System.out.print( x );
         System.out.print("\n");
      }
   }
}
```

这将产生以下结果：

```
10
20
40
50
```

:::



### 1.14 数组
