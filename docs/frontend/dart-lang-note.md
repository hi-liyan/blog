---
id: dart-lang-note
title: Dart 语法
---



> 随着Dart版本更新，部分内容可能已过期。
>
> 当前使用版本：Dart SDK version: 2.14.0 (stable)



## 开始

学习前的代码示例。

```dart
// 定义一个方法
printNum(int i) {
  print('输出 ${i}');
}

// main方法
main(List<String> args) {
  // 函数内可以嵌套函数
  test() {
    print('测试方法');
  }

  var num = 123;
  // 调用函数
  printNum(num);
  test();
}
```





## 变量

> 在Dart语言中，任何保存在变量中的都是一个对象 ， 并且所有的对象都是对应一个类的实例。 无论是数字，函数和 null 都是对象。所有对象继承自 Object 类。



Dart是强类型语言，在声明变量时可以显式地声明变量的类型，同时也支持类型推断，使用 `var` 关键字声明变量。

```dart
void main() {
  /**
   * 使用var声明变量
   * Dart是强类型语言，会通过初始化时赋值的数据类型确定变量的数据类型，且之后不可改变，这与JavaScript不同
   */
  var str = 'Hello Dart';
  var num = 123;

  /**
   * 也可以显示地指定数据类型
   */
  String str1 = 'Hello Dart';
  int num1 = 123;

  /**
   * 同时声明多个相同类型变量，可以使用逗号连接
   */
  int i1 = 1, i2 = 2, i3 = 3;
}
```



::: details 变量的命名规则

变量的命名规则：

1. 变量名（标识符）必须由字母、数字、下划线或美元符($)组成；
2. 变量名（标识符）开头不能为数字；
3. 变量名（标识符）不能是关键字或保留字；
4. 变量名（标识符）严格区分大小写；
5. 变量名（标识符）要见名知意，建议使用名词；方法名建议使用动词。

*变量名、方法名、类名等统称标识符。*

:::

> 未初始化的变量默认值是 `null`。即使变量是数值类型默认值也是 null，因为在 Dart 中一切都是对象，数值类型也不例外。



## 空安全

在最近的 Dart 版本中，非 Null 类型变量不能被赋值为 null 。

```dart
String name = 'Mike';
int age = null; // Null 类型不能赋值给 int 类型
```

要想把 null 赋值给变量，只需要在类型后加上问号。

```dart
String name = 'Mike';
int? age = null; // 表示该变量可以接收 null
```





## 常量

Dart语言中， `const` 或 `final` 关键字都可以用来声明常量，但用法上略有区别， `const` 不能用来修饰成员变量。

```dart
void main() {
  /**
   * 初始化后不可改变的量叫常量。
   * 
   * 使用 final 或 const 关键字声明常量
   * const 声明常量，声明时必须初始化
   * final 不仅有const编译时常量的特性，最重要的是它是运行时常量。并且final是惰性初始化，即在运行时第一次使用时才初始化
   * 
   */
  const PI = 3.14159;

  // 将一个方法的返回值赋值给一个常量时，使用 final 声明
  final NOW = new DateTime.now();
}
```





## 数据类型

**Dart支持以下数据类型：**

- 数值类型 Number
    - `num`，数值类型抽象类，是`int`和`double`的父类
    - `int`，整数
    - `double`，浮点数（小数）
- 字符串 String
    - `String`
- 布尔类型 Boolean
    - `bool`
- 数组（列表）List
    - 在Dart中，数组是List对象，所以大多数人称它为列表
- Set
- 字典 Map
    - 键值对



### 数值类型 Number

Dart中的数值类型有三种，分别是`num`、`int`、`double`，其中`num`是`int`和`double`的父类。

```dart
/// 源码
abstract class num implements Comparable<num> {}
abstract class int extends num{}
abstract class double extends num {}
```



**`num` 类中常用的方法：**

- `abs()`求绝对值
- `toInt()`转换成int类型
- `toDouble()`转换成double类型
- ...

**`int`、`double`中常用的方法：**

- `parse()` 字符串转成数值，如`int.parse('123')`，字符串必须是数值形式，否则在执行时会抛出FormatException异常





### 字符串 String

Dart中的字符串是一组UTF-16的单元序列，可以通过单引号`''`或者双引号`""`创建。

```dart
String str = 'Hello Dart';
```

字符串中可以嵌入`${expression}`表达式，如果表达式是一个标识符，可以省略`{}`。在Dart中通过调用对象的`toString()`方法



**Dart中的字符串拼接**

在Dart中可以像Java一样使用 `+` 拼接字符串，也可以使用上面提到的`${expression}`方式拼接字符串。

```dart
void main() {
  var lastName = 'li';
  var firstName = 'yan';
	
  // 方式一：EL表达式的形式，直接在引号内通过美元符($)引用变量
  print('My name is $lastName $firstName'); // 输出结果：My name is li yan
  
  // 方式二：像Java一样使用字符串连接符(+)连接字符串与变量
  print('My name is ' + lastName + ' ' + firstName); // 输出结果：My name is li yan
}
```



### 类型判断

在Dart中使用 `is` 关键字判断变量的类型。

```dart
void main() {
  var str = 'abc';
  
  if (str is String) {
    print('str是字符串');
  } else {
    print('str不是字符串');
  }
}
```



### 布尔类型 Boolean

Dart使用`bool`类型表示布尔值，布尔类型有分 `true` 和 `false` 两个字面量，这两个对象都是编译时常量。



### List 集合

Dart中的List类似JavaScript中的数组，有序、可变长度、可以存放不同数据类型的元素。

Dart中的List字面量非常像JavaScript中的array的字面量，通过字面量创建List集合。

```dart
var list = ['aaa', 'bbb', 'ccc']; 
// 初始化后list会被推断为List<String>变量，如果之后给该集合添加其它类型元素则会抛出异常
```

> 时刻谨记，Dart 是强类型语言。



Dart中可以通过泛型约束List元素的类型。

```dart
List<String> list = ['aaa', 'bbb', 'ccc'];
```



在List字面量前通过  `cosnt` 指定该List是一个不可变集合。

```dart
List<String> list = const ['aaa', 'bbb', 'ccc'];
list[0] = 'ddd'; // 此时会抛出异常
```



通过索引取值。

```dart
List<String> list = const ['aaa', 'bbb', 'ccc'];
print(list[0]); // 'aaa'
```



### Set 集合

> Dart 2.2 中引入了 Set 字面量

Set 是一个无序且元素唯一的集合，一般可以用来去重。

通过字面量创建Set集合。

```dart
var set = {'aaa', 'bbb', 'ccc'};
```



泛型。

```dart
Set<String> set = {'aaa', 'bbb', 'ccc'};
```



通过迭代器遍历Set。

```dart
Set<String> set = {'aaa', 'bbb', 'ccc'};
Iterator<String> it = set.iterator;
while (it.moveNext()) {
    String s = it.current;
    print(s);
}
```



使用 `const`  关键字定义不可变Set。

```dart
Set<String> set = const {'aaa', 'bbb', 'ccc'};
set.add('ddd');
```



### Map 字典

Map是`{ key:value}` 结构的数据类型，key 和 value 可以是任意类型，且Map中的key是唯一的。如果添加了重复的key值，后面的key值会覆盖掉前面的。

通过`{}`字面量创建Map。

```dart
var map = {'key1': "value1", 'key2': 'value2'};
```



通过 `new` 关键字创建Map。

```dart
var map = new Map();
map['name'] = '李达康';
```

> Dart 在实例化对象时，可以省略 `new` 关键字。



Map遍历

```dart
var person = {
  'name': '张三',
  'age': 20,
  'lang': ['Java', 'Dart', 'JavaScript']
};

// 1. 通过Map的forEach()方法遍历
person.forEach((key, value) => print("$key : $value"));

// 2. 调用map()方法,返回一个新的Map
Map person2 = person.map((key, value) {
  return MapEntry(key, value);
});

// 3. foreach循环
for(var key in person.keys){
  print("$key : ${person[key]}");
}
```



### dynamic/var/Object的区别

`dynamic`是Dart中表示动态数据类型的**关键字**，它可以声明任意数据类型的变量。

通过`dynamic`声明变量时，编译器不会进行类型检查，例如`dynamic a = 1; a = 'hal';`，声明一个数字类型变量a，随后将字符串赋值给a，这种声明方式是被允许的，程序只有在运行时才会推断变量的具体类型。

`var`是Dart中声明变量的关键字，它同样可以声明任意类型的变量。由于Dart是强类型语言，在变量初始化时会确定变量的具体类型，且在变量的整个生命周期中数据类型不能再被改变。

`Object`是Dart中所有类的基类，这和Java语言类似。声明的变量只能使用`Object`类中的方法，和Java中多态的概念相似，即便父类对象指向子类实例，该对象也只能使用父类中独有的方法或者子类重写父类的方法。

```dart
// dynamic 动态数据类型
dynamic x = 'hal';
print(x.runtimeType); // String
print(x); // hal

// var 关键字
var s = 'var';
print(s.runtimeType); // String
print(s); // var

// Object 类
Object o = 'obj';
print(o.runtimeType); // String
print(o); // obj
```



## 运算符

### 算术运算符

算术运算符有加`+`、减`-`、乘`*`、除`/`、取余`%`、取整`~/`

```dart
void main() {
  int a = 13;
  int b = 5;

  // 加
  print(a + b); // 输出结果：18

  // 减
  print(a - b); // 输出结果：8

  // 乘
  print(a * b); // 输出结果：65

  // 除
  print(a / b); // 输出结果：2.6

  // 取余
  print(a % b); // 输出结果：3

  // 取整
  print(a ~/ b); //输出结果：2
}
```



自增`++`和自减`--`运算符：

```dart
// 自增在变量左侧和在变量右侧执行是不一样的
// ++在右，先执行当前语句，再自加
void main() {
  var a = 1;
  print(a++); // 结果：1
}

// ++在左，先自加，再执行当前语句
void main() {
  var a = 1;
  print(++a); // 2
}

// 自减同理
```



### 关系运算符

关系运算符有等于`==`、不等于`!=`、大于`>`、小于`<`、大于等于`>=`、小于等于`<=`

```dart
void main() {
  int a = 5;
  int b = 3;

  // 判断是否相等
  print(a == b); // 输出结果：false

  // 判断是否不能
  print(a != b); // 输出结果：true

  // 判断是否大于
  print(a > b); // 输出结果：true

  // 判断是否小于
  print(a < b); // 输出结果：false

  // 判断是否大于等于
  print(a >= b); // 输出结果：true

  // 判断是否小于等于
  print(a <= b); // 输出结果：false
}
```



### 逻辑运算符

逻辑运算符有与`&&`、或`||`、非`!`，其中与、或还有这种形式`&`、`|`

```dart
void main() {
  /**
   * 逻辑运算符有三种：与 && 、或 || 、非 ！
   */

  bool f1 = true;
  bool f2 = false;

  /**
   * && 左右两边全部为true时为true，否则为false
   * 
   * && 短路与：当左边为false时，不再计算符号右边的表达式
   * & ：左右两边都计算
   */
  print(f1 && f2); // 输出结果：false

  /**
   * || 左右两边有一边为true时为true，两边都是false，则是false
   * 
   * || 短路或：当左边为true时，不再计算符号右边的表达式
   * | ：左右两边都计算
   */
  print(f1 || f2); // 输出结果：true

  /**
   * 非：取反
   */
  print(!f1); // 输出结果：false
  print(!f2); // 输出结果：true
}
```



### 赋值运算符

基本的赋值运算符：`=`、`??=`

复合赋值运算符：`+=`、`-=`、`*=*`、`/=`、`%=`、`~/=`

```dart
void main() {
  /**
   * 1. 基础赋值运算符
   * 
   * =
   * ??=
   */
  int a = 3;
  int b = 10;

  int c = a + b;

  print(c); // 输出结果：13

  // ??= 当符号左侧变量为null时，将符号右侧的值赋值给符号左侧
  int x;
  x ??= 23;

  print(x); // 输出结果：23

  /**
   * 2. 复合赋值运算符
   * 
   * += -= *= /= %= ~/=
   */
  int i = 5;
  int j = 13;

  // += 先相加，再将结果赋值给符号左边
  print(i += j); // 输出结果：18

  // -= 先相减，再将结果赋值给符号左边
  print(i -= j); // 输出结果：5

  // *= 先相乘，再将结果赋值给符号左边
  print(i *= j); //输出结果：65
}
```



## 流程控制

### 条件语句

`if-else`：

```dart
void main() {
  /**
   * if-else
   */

  int a = 3;
  int b = 5;

  if (a > b) {
    print('max num is $a');
  } else {
    print('max num is $b');
  }
}
```



三目运算符：

```dart
void main() {
  bool flag = true;

  /**
   * 条件表达式 ? 表达式为真时 : 表达式为假时
   */
  var str = flag ? 'flag = true' : 'flag = false';

  print(str); // 输出结果：flag = true
}
```



`??`运算符：

```dart
void main() {
  var a;

  /**
   * ??左侧不为空时将左侧赋值给变量b，否则将??右侧的值赋值给变量b
   */
  var b = a ?? 10;

  print(b);
}
```



### 循环语句

for循环：

```dart
void main() {
  var sum = 0;

  // for (声明变量; 条件表达式; 循环体执行完一次后执行) { 循环体 }
  for (var i = 0; i <= 100; i++) {
    sum += i;
  }

  print('0-100的累加和：$sum'); // 5050
}
```



增强for循环：

```dart
List<int> list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

for (var value in list) {
  print(value);
}
```



集合类的`forEach()`方法遍历：

```dart
List<int> list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// 参数是一个回调函数，value是遍历的集合中的元素
list.forEach((value) => print(value));
```



while循环：

```dart
void main(List<String> args) {
  var sum = 0;
  var i = 0;
  
  while (i <= 100) {
    sum += i;
    i++;
  }

  print('0-100的累加和：$sum'); // 5050
}
```



do-while循环：

```dart
void main(List<String> args) {
  var sum = 0;
  var i = 0;

  do {
    sum += i;
    i++;
  } while (i <= 100);

  print('0-100的累加和：$sum'); // 5050
}
```

> do-while 循环至少执行一次。



**`break` 关键字使用：**

1. 在switch语句中，可以跳出switch结构；
2. 在循环语句中，结束当前循环结构。（嵌套循环只会结束当前循环结构，如果有外层循环，外层继续执行下一次循环）
3. `break`可用在switch-case中，也可用在for循环、while循环中。



**`continue`关键字使用：**

- `continue` 会终止本次循环，继续执行下一次循环。



## 集合

>Dart中的集合包括`List`、`Set`，以及字典类型`Map`。



### List

List是有序集合，它实现了`EfficientLengthIterable`抽象类，该抽象类继承了Iterable抽象类，所以可以使用`Iterator`迭代器遍历List。

```dart
abstract class List<E> implements EfficientLengthIterable<E>{...}
```



通过字面量创建集合。

```dart
List fruits = ['西瓜','苹果','哈密瓜'];
```

当前版本已经不废弃使用`new List()`创建List。

```dart
var fruits = new List();
fruits.add('橘子');
```



常用属性

| 属性       | 作用                              |
| ---------- | --------------------------------- |
| length     | 返回int类型的集合长度（元素个数） |
| isEmpty    | 判读集合是否为空，返回bool        |
| isNotEmpty | 判断集合是否不为空，返回bool      |
| reversed   | 翻转集合                          |



常用方法

| 方法                                             | 作用                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| `add(E value) `                                  | 在集合尾部添加元素                                           |
| `addAll(Iterable<E> iterable) `                  | 在集合尾部添加一个集合                                       |
| `indexOf(E element)       `                      | 返回元素在集合中的索引值，元素不存在返回-1                   |
| `remove(Object? value)      `                    | 移除集合中的元素，元素不存在返回false                        |
| `removeAt(int index)  `                          | 通过索引移除集合中的元素，返回被移除的元素                   |
| `fillRange(int start, int end, [E? fillValue]) ` | 修改从起始到结束前一个的所有元素，如(0,1,'aaa'),是将集合中的第一个元素修改为aaa |
| `insert(int index, E element)      `             | 在指定索引处插入元素                                         |
| `insertAll(int index, Iterable<E> iterable)`     | 在指定索引处插入一个集合                                     |
| `join([String separator = ""])  `                | 将集合转为字符串，参数列表传入分隔符                         |

字符串可以使用`split()`方法分隔字符串并返回一个`List<String>`集合。

```dart
String str = 'aaa,bbb,ccc';
List<String> arr = str1.split(',');
```



### Set

Set集合的特点是无序，且不能存入重复的元素，它也继承了`EfficientLengthIterable`抽象类，所以可以通过`Iterator`迭代器遍历Set。

```dart
abstract class Set<E> extends EfficientLengthIterable<E> {...}
```



Set具有元素不能重复的特性，所以可以通过Set集合实现去重效果。List集合通过`toSet()`方法将其转为Set，并去除重复的元素。

```dart
void main(List<String> args) {
  List fruits = [
    '西瓜',
    '苹果',
    '哈密瓜',
    '西瓜',
    '苹果',
  ];

  var s = fruits.toSet();
  print(s); // {西瓜, 苹果, 哈密瓜}
}
```



### Map

Map是一种`key:value`的数据结构。

通过字面量创建Map。

```dart
var person = {'name': '张三', 'age': 17, 'gender': '男'};
```

或者

```dart
var person = new Map();

info['name'] = '张三';
info['age'] = 17;
info['gender'] = '男';
```



常用属性

| 属性       | 作用                                              |
| ---------- | ------------------------------------------------- |
| keys       | 返回Map中的所有key值，返回`Iterable<K>`类型数据   |
| alues      | 返回Map中的所有value值，返回`Iterable<K>`类型数据 |
| isEmpty    | 判断Map是否为空，返回bool                         |
| isNotEmpty | 判断Map是否不为空，返回bool                       |



常用方法

| 方法                         | 作用                                        |
| :--------------------------- | ------------------------------------------- |
| addAll(Map<K, V> other)      | 添加键值对                                  |
| remove(Object? key)          | 通过key移除Map中的键值对，返回被移除的value |
| containsKey(Object? key)     | 判断Map中是否包含指定key                    |
| containsValue(Object? value) | 判断Map中是否包含指定value                  |



### 遍历集合

#### for循环

```dart
void main() {
  List list = ['Appli', 'Google', 'Microsoft'];

  for (int i = 0; i < list.length; i++) {
    print(list[i]);
  }
}
```



#### foreach 循环

```dart
void main() {
  List list = ['Appli', 'Google', 'Microsoft'];

  for (var item in list) {
    print(item);
  }
}
```



#### 集合类的 forEach() 方法

```dart
void main() {
  List list = ['Apple', 'Google', 'Microsoft'];

  list.forEach((element) {
    print(element);
  });
}
```



#### map方法

映射集合的每一个元素，将处理后的元素返回成一个Iterable类型数据

```dart
void main() {
  List list = ['Apple', 'Google', 'Microsoft'];

  var res = list.map((e) => e == 'Google' ? e = 'Tencent' : e).toList();

  print(res); // [Apple, Tencent, Microsoft]
}
```



#### where方法

将满足条件的元素返回成一个Iterable类型数据

```dart
void main() {
  List list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  var res = list.where((e) => e >= 5).toList();

  print(res); // [5, 6, 7, 8, 9]
}
```



#### any方法

集合中有任一元素满足指定条件，则返回true

```dart
void main() {
  List list = ['Apple', 'Google', 'Microsoft'];

  var res = list.any((e) => e.toString().length > 7);

  print(res);
}
```



#### every方法

集合中每个元素都满足指定条件，才返回true

```dart
void main() {
  List list = ['Apple', 'Google', 'Microsoft'];

  var res = list.every((e) => e.toString().length > 6);

  print(res);
}
```



## 函数（方法）

>Dart是一个纯粹的面向对象语言，其中函数也是一个对象，它的类型是`Function`。这意味着它可以被赋值给一个变量，也可以参数传递给其它函数。



Dart可以定义在任何位置，方法内部仍可以定义方法。方法的定义位置不同，其作用域也不同。



方法定义格式：

```dart
返回值类型 方法名 (参数列表) {
  方法体
}
```

如果方法没有返回值，则返回值类型为`void`，也可以省略不写。

::: details 示例

```dart
void printName(String name) {
  print('Hello $name');
}
```

:::



> 方法名的命名规范：
>
> 方法名使用小驼峰命名方式，即方法名第一个单词首字母小写，其余单词首字母均大写。
>
> 如 `fetch()` 、`findAll()` ...





### 函数的参数

> 函数的参数有 `required ` 和 `optional` 两种类型，required 参数在参数列表的最前面，随后是 optional 类型参数。可选命名参数可以使用 `required` 关键字将其指定为 required 类型的参数。
>
> optional 类型参数可以指定默认值，required 类型参数属于必传参数，不能指定默认值。



```dart
/**
 * 返回 a + b 的值
 */
int plus(int a, int b) {
  return a + b;
}

void main() {
  // 调用plus()方法
  var sum = plus(10, 5);
  print(sum);
}
```

>函数参数可以不指定参数类型，不指定类型时，参数是`dyanmic`类型。

```dart
getUserInfo(name, age) {
    // ...
}
```





### 可选参数

> 可选参数可以是位置参数或者命名参数，但一个参数只能选择其中一种方式修饰。



#### 可选位置参数 Optional positional parameters

参数列表中可以使用`[]`定义可选参数`optional`，可选参数可以定义多个，且只能定义在其它参数后面。

```dart
/**
 * 返回用户信息
 */
String getUserInfo(String name, String gender, [String? age, String? addr]) {
  age = age ?? '保密';
  addr = addr ?? '无';
  return "姓名：$name，性别：$gender，年龄：$age, 住址：$addr";
}

void main() {
  // 调用getUserInfo()方法时，可选参数可以不传值
  var info = getUserInfo('张三', '男');
  print(info); // 姓名：张三，性别：男，年龄：保密, 住址：无
}
```





#### 可选命名参数 Optional named parameters

使用花括号 `{}` 定义命名参数，命名参数与可选参数类似，属于 `optional` 类型参数，都可以选择性的传参，但传参方式上有区别，需要按照 `参数名:参数值` 的形式传参。

命名参数也可以设置默认值，并且可以通过参数名选择性传参。而可选参数在传参时只能按照参数的顺序传参。

```dart
/**
 * 返回用户信息
 */
String getUserInfo(String name, {String gender = '男', int age = 0}) {
  return "姓名：$name，性别：$gender，年龄：$age";
}

void main() {
  var info = getUserInfo('小野', gender: '女', age: 23);
  print(info); // 姓名：小野，性别：女，年龄：23
}
```



#### 参数默认值

可选位置参数和可选命名参数可以设置默认值。

```dart
/**
 * 返回用户信息
 */
String getUserInfo(String name, [String gender = '未知', age = 0]) {
  return "姓名：$name，性别：$gender，年龄：$age";
}

void main() {
  var info = getUserInfo('张三');
  print(info); // 姓名：张三，性别：未知，年龄：0
}
```



#### required 关键字

可选命名参数使用 `required` 关键字修饰，则该参数变成必传参数，且不能指定默认值。

```dart
/**
 * 返回用户信息
 */
String getUserInfo(
    {required String name, String gender = '男', required int age}) {
  return "姓名：$name，性别：$gender，年龄：$age";
}

void main() {
  var info = getUserInfo(name: '小野', age: 23);
  print(info); // 姓名：小野，性别：女，年龄：23
}
```



### main 函数

任何应用都应有一个顶级的 `main()` 函数作为应用开始的入口。main 函数没有返回值，参数列表是 `List<String>`，不需要时可以省略。

```dart
main(List<String> args) {
  
}
```





### 函数作为参数

也就是回调函数。

```dart
void main() {
  func1() {
    print('我是func1');
  }

  func2(func) {
    // 调用传入的方法
    func();
  }

  func2(func1);
}
```

::: details 示例代码

```dart
// 自定义一个集合类
class CustomList<T> {
  List<T> list = [];

  void add(T t) {
    list.add(t);
  }

  // 定义forEach方法，接收一个函数作为参数
  void forEach(void action(T e)) {
    for (int i = 0; i < list.length; i++) {
      // 调用传入的函数，将List元素传给该函数
      action(list[i]);
    }
  }
}

main(List<String> args) {
  CustomList<String> list = new CustomList();

  list.add('aaa');
  list.add('bbb');
  list.add('ccc');

  list.forEach((e) {
    print(e);
  });
}
```

:::



### 匿名函数

大多数函数都是有名字的，也可以创建没有名字的函数，这种函数叫做**匿名函数**，也叫也被称为 *lambda* 或者 *closure* 。匿名函数可以被赋值给一个变量。

命名函数的参数同样可以是可选的，并且可以省略参数类型。

```dart
var func = ([name, age, gender]) {
  print('$name $age $gender');
};

main(List<String> args) {
  func("Mike", 16); // Mike 16 null
}
```



### 自执行函数

```dart
void main() {
  (() {
    print('自执行方法');
  })();
}
```

传参

```dart
void main() {
  ((int n) {
    print(n);
  })(123);
}
```



### 递归

通过递归计算0-100的累加和。

```dart
void main() {
  int sum = 0;

  plus(n) {
    sum += n;

    if (n == 100) {
      return;
    }
    plus(n + 1);
  }

  plus(1);

  print(sum); // 5050
}
```



### 闭包

全局变量：全局变量常驻内存，全局变量污染全局；

去不变量：局部变量不会常驻内存，会被垃圾回收机制回收，并且不会污染全局。

如果我们既想让一个变量常驻内存，又不想让它污染全局，这时就产生了闭包。

闭包的写法：方法中嵌套方法，并return里面的方法。

```dart
void main() {
  func() {
    int a = 1;
    return () {
      a++;
      print(a);
    };
  }

  var f = func();
  f(); // 2
  f(); // 3
  f(); // 4
}
```



### 返回值

所有函数都会返回一个值。 如果没有明确指定返回值， 函数体会被隐式的添加 `return null;` 语句。



### 箭头语法

> 箭头语法 `=> expr;` 是 `{ return expr; }` 的简写形式，且箭头右侧只能是***一个***表达式，而不能是语句。

```dart
// 获取随机数，一般写法
getRandom() {
  int ran = Random().nextInt(100);
  return ran;
}

// 获取随机数，箭头语法
getRandom1() => Random().nextInt(100);

main(List<String> args) {
  int i = getRandom1();
  print('随机数：$i');
}
```

箭头语法实际是省略了花括号`{}`以及`return`关键字。



## 异常处理

在 Dart 中可以抛出和捕获异常，异常表示发生了未知情况的错误，如果异常没有被捕获，则会抛出异常，导致抛出异常的代码被终止。

Dart 中的异常都是非检查异常，和Java有所不同，方法不会声明它们抛出的异常， 也不要求捕获任何异常。

Dart 提供了`Exception` 和 `Error`类型， 以及一些子类型。 当然也可以定义自己的异常类型。 但是，此外 Dart 程序可以抛出任何非 null 对象， 不仅限 Exception 和 Error 对象。



### 自定义异常

使用`implements`关键字实现`Exception`抽象类自定义异常。

>在 Dart 语言中没有关键字如`interface`定义接口，但`implements`关键字既可以实现普通类，也可以实现抽象类，因为抽象类可以定义抽象方法，所以一般用抽象类定义接口。
>
>`implements`实现一个类，必须实现其全部的成员属性和方法。

```dart
// 自定义异常，实现 Exception
class CustomException implements Exception {
  final dynamic msg;

  CustomException([this.msg]);

  @override
  String toString() {
    String? msg = this.msg;
    if (msg == null) {
      return 'CustomException';
    } else {
      return 'CustomException: $msg';
    }
  }
}
```

>由于Dart中`throw`可以抛出任意类型对象，即便不实现`Exception`类，同样可以正常抛出。但根据规范，我们依然需要实现`Exception`或者继承`Error`。



### throw

```dart
func() {
  // 抛出自定义异常
  throw CustomException('抛出自定义异常');
}
```



### catch

捕获异常可以避免异常继续传递（除非重新抛出（ rethrow ）异常）。 

在Dart语言中，有两个关键字可以捕获异常，`on`和`catch`。这两个关键字可以单独使用，也可以同时使用。`on`关键字可以指定要捕获的异常类型，`catch`关键字可以捕获异常对象。

```dart
main(List<String> args) {
  try {
    func();
  } on CustomException { // 指定要捕获的异常类型
    print('捕获到异常');
  }
}
```

`on`和`catch`一起使用。

```dart
main(List<String> args) {
  try {
    func();
  } on CustomException catch (e) {
    print('捕获到异常: $e'); // 捕获到异常: CustomException: 抛出自定义异常
  }
}
```

也可以捕获多个异常。

```dart
main(List<String> args) {
  try {
    func();
  } on CustomException catch (e) {
    print('捕获到异常: $e'); // 捕获到异常: CustomException: 抛出自定义异常
  } on Exception catch (e) {
    print('捕获异常: $e');
  }
}
```

不指定异常类型时，会捕获全部类型异常。

```dart
main(List<String> args) {
  try {
    func();
  } catch (e) {
    print('捕获到异常: $e'); // 捕获到异常: CustomException: 抛出自定义异常
  }
}
```



### finally

不管是否抛出异常， `finally` 中的代码都会被执行。 如果 `catch` 没有匹配到异常， 异常会在 `finally` 执行完成后，再次被抛出。



## 类

面向对象的三大特性：封装、继承、多态。

>封装：将有共同状态和行为的事物封装成抽象的类；
>
>继承：Dart是单继承，可以继承父类的属性和方法；
>
>多态：

在Dart中，一切皆对象，即便是基本数据类型（int、double ...）都是类，所有的类最终都继承自`Object`类。

Dart是一门使用类和单继承的语言，这一点和Java等类似。所有的对象都是类的实例，并且所有的类都是Object类的子类。

一个类通常由属性和方法组成。



### 实例化

在学习面向对象中，有这么一句话，`对象是类的实例，类是对象的抽象`。因为类是抽象的，所以我们需要把它实例化成对象，再使用类中的属性和方法。

```dart
Set<String> langs = new Set();

langs.add("dart"); // 通过 对象.方法名 调用其方法
int len = langs.length; // 通过 对象.实例属性名 调用其属性
```

> 在 Dart 2.x 版本中，实例化对象时 `new` 关键字可以省略。



### 定义类

使用`class`关键字定义类。类名的命名规范：大驼峰，所有单词的首字母均大写。

```dart
class 类名 {
  ...
}
```



::: details Demo

```dart
void main() {
  // 实例化Person
  var zs = new Person();
  zs.name = '张三';
  zs.age = 17;
  String info = zs.getInfo();
  print(info);
}

class Person {
  // 属性
  String name;
  int age;

  // 方法
  String getInfo() {
    return "姓名：$name，年龄：$age。";
  }
}
```

:::



### 构造函数

构造函数的函数名与类名相同。构造函数是用来实例化对象的，在实例化时被调用，即`new 类名()`时调用。

```dart
class Person {
  String name;
  int age;

  // 默认构造函数
  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    print("name: $name, age: $age.");
  }
}

void main() {
  // 实例化时会调用类中的构造函数
  Person p = new Person('张三', 17);
  p.getInfo();
}
```

构造函数简写：

```dart
void main() {
  // 实例化时会调用类中的构造函数
  Person p = new Person('张三', 17);
  p.getInfo();
}

class Person {
  String name;
  int age;

  // 构造函数简写
  Person(this.name, this.age);

  getInfo() {
    print("name: $name, age: $age.");
  }
}
```



> 构造函数不能被继承。



### 默认构造函数

在没有声明构造函数的情况下， Dart 会提供一个默认的构造函数。 默认构造函数没有参数并会调用父类的无参构造函数。



### 命名构造函数

使用命名构造函数可为一个类实现多个构造函数， 也可以使用命名构造函数来更清晰的表明函数意图：

```dart
class Person {
  String name;
  int age;

  // 默认构造函数
  Person(this.name, this.age);

  // 命名构造函数
  Person.now() {
    print('我是命名构造函数');
  }

  getInfo() {
    print("name: $name, age: $age.");
  }
}

void main() {
  // 调用类中的命名构造函数
  Person p = new Person.now();
}
```



### 调用父类非默认构造函数

默认情况下，子类的构造函数会自动调用父类的默认构造函数（匿名，无参数）。 父类的构造函数在子类构造函数体开始执行的位置被调用。 如果提供了一个 `initializer list` （初始化参数列表）， 则初始化参数列表在父类构造函数执行之前执行。 总之，执行顺序如下：

1. initializer list （初始化参数列表）
2. superclass’s no-arg constructor （父类的无名构造函数）
3. main class’s no-arg constructor （主类的无名构造函数）

如果父类中没有匿名无参的构造函数， 则需要手动调用父类的其他构造函数。 在当前构造函数冒号 `:` 之后（初始化列表中），函数体之前，声明要调用父类构造函数。



```dart
// 父类 Person
class Person {
  String? name;
  String? gender;
  int? age;

  Person.withArgs([this.name, this.gender, this.age]);

  void printInfo() {
    print('name: $name, gender: $gender, age: $age .');
  }
}

// 子类 Employee
class Employee extends Person {
    // 使用冒号 : 调用父类的非默认构造函数
  Employee(String name, String gender, int age)
      : super.withArgs(name, gender, age);
}

main(List<String> args) {
  Employee employee = Employee('Mike', '男', 18);
  employee.printInfo();
}
```

> 由于父类的构造函数参数在构造函数执行之前执行， 所以构造函数的参数可以是一个表达式或者一个方法调用。



### 初始化列表

可以在构造函数通过冒号 `:` 声明初始化列表，它除了上面提到的调用父类非默认构造函数外，还可以用来初始化参数。

```dart
class Person {
  String _name;
  int _age;

  // 带有初始化列表的构造函数
  Person()
      : _name = '张三',
        _age = 18;

  getInfo() {
    print("name: $_name, age: $_age.");
  }
}
```



### 重定向构造函数

有时，一个构造函数会被重定向到同类的另一个构造函数。重定向构造函数的函数体为空，构造函数 `:` 后指向要重定向的构造函数。

```dart
class Person {
  String? name;
  int? age;

  Person(this.name, this.age);

  // 重定向到另一个构造函数
  Person.gen(name) : this(name, null);
}

main(List<String> args) {
  Person p = Person.gen('Mike');
}
```



### 常量构造函数

如果你的类产生的对象从不会改变，那么就可以把这些对象定义为编译时常量。 为此，需要定义一个 `const` 构造函数， 并且声明所有实例变量为 `final`。

```dart
class ImmutablePoint {
  static final ImmutablePoint origin =
      const ImmutablePoint(0, 0);

  final num x, y;

  const ImmutablePoint(this.x, this.y);
}
```





### 工厂构造函数

Dart 支持工厂构造器。它可以返回其子类或者 null。要创建工厂构造器，需要使用 `factory` 关键字。

```dart
class Animal {
  String? name;
  int? age;

  Animal();
	
    // 命名工厂
  factory Animal.fromTypeName(String typeName) {
    if (typeName == 'cat') {
      return Cat();
    }
    if (typeName == 'dog') {
      return Dog();
    }

    throw ArgumentError('Unrecognized $typeName');
  }
}

class Cat extends Animal {}

class Dog extends Animal {}
```



### 实例方法

方法提供了对象的行为，实例方法允许访问实例变量，以及通过`this.`的方式调用实例方法。





### Getters 和 Setters

Getter 和 Setter 是用于实例属性读和写的特殊方法。 回想之前的例子，每个实例变量都有一个隐式 Getter ，通常情况下还会有一个 Setter 。 使用 `get` 和 `set` 关键字实现 Getter 和 Setter ，能够为实例创建**额外**的属性。

```dart
class Box {
  num _margin, _border, _padding;
  Box(this._margin, this._border, this._padding);

  num get width => _margin + _border + _padding;
  set width(num width) => _border = width - _margin - _padding;

  @override
  String toString() {
    return 'Box -> margin:$_margin border:$_border padding:$_padding -> width: $width';
  }
}

main(List<String> args) {
  Box box = Box(30, 20, 10);
  print(box); // Box -> margin:30 border:20 padding:10 -> width: 60

  box.width = 100;
  print(box); // Box -> margin:30 border:60 padding:10 -> width: 100
}
```

>最开始实现 Getter 和 Setter 也许是直接返回成员变量； 随着需求变化， Getter 和 Setter 可能需要进行计算处理而使用方法来实现； 但是，调用对象的代码不需要做任何的修改。



### 抽象方法

实例方法、getter、和 setter 方法都可以是抽象的， 抽象方法只用于定义接口不进行实现。 抽象方法只存在于抽象类中。

```dart
abstract class Animal {
  void eat();
}
```





### 引入dart文件

使用`import`关键字引入外部dart文件。

```dart
import 'lib/Person.dart';

void main() {
  // 调用类中的命名构造函数
  Person p = new Person.now();
}
```



::: details /lib/Person.dart

```dart
class Person {
  String name;
  int age;

  // 默认构造函数
  Person(this.name, this.age);

  // 命名构造函数
  Person.now() {
    print('我是命名构造函数');
  }

  getInfo() {
    print("name: $name, age: $age.");
  }
}
```

:::



### 私有属性 私有方法

Dart语言中定义私有属性和私有方法，在属性名和方法名前加上`_`下划线，来定义私有，私有属性和方法只能在类内部被访问。

```dart
class Person {
  // _ 定义私有属性
  String _name;
  int _age;

  Person(this._name, this._age);
  
  // getter方法
  get name {
    return this._name;
  }

  get age {
    return this._age;
  }
  
  // setter方法
  set name(String name) {
    this._name = name;
  }

  set age(int age) {
    this._age = age;
  }
  	
  // 私有方法
  String _getInfoStr() {
    return "name: $_name, age: $_age.";
  }

  getInfo() {
    print(_getInfoStr());
  }
}
```

如上代码，在Dart语言中，getter方法和setter方法是通过`get`关键字和`set`关键字定义的。



### static 关键字

使用 `static` 关键字修饰的属性成为**静态属性**，修饰的方法称为**静态方法**。

在静态方法中不能直接访问非静态的属性或方法，在非静态方法中，可以直接访问静态属性和静态方法。

静态属性或方法可以直接通过 `类名.属性名` 、 `类名.方法名()` 的方式调用。

静态属性也成为类属性，全局共享。

```dart
void main() {
  // 通过类名直接调用
  Person.gender = '女';
  Person.printDemo();
}

class Person {
  String name;
  int age;
  static String gender; // 静态属性

  // 静态方法
  static printDemo() {
    print('I am static method. I am $gender');
  }

  printInfo() {
    print('name: $name, age: $age, gender: $gender.');
  }
}
```



### 对象操作符

| 操作符 | 说明             |
| ------ | ---------------- |
| ?      | 条件运算符       |
| as     | 类型装换         |
| is     | 类型判断         |
| ..     | 级联操作（连缀） |



条件运算符 `?`

```dart
void main() {
  Person p; // 声明了一个Person类型的空引用，没有指向具体实例
  p = new Person('张三', 17);

  p?.printInfo(); // 如果p为null，不调用方法
}

class Person {
  String name;
  int age;

  Person(this.name, this.age);

  printInfo() {
    print('name: $name, age: $age.');
  }
}
```



类型判断 `is`

```dart
void main() {
  var p = new Person('张三', 17);

  bool res = p is Person; // 判断对象是否属于Person类型
  print(res);
}

class Person {
  String name;
  int age;

  Person(this.name, this.age);

  printInfo() {
    print('name: $name, age: $age.');
  }
}
```



类型转换 `as`

```dart
void main() {
  // 父类引用指向子类实例(向上转型)，父类引用o只能调用父类中的方法以及子类重写父类的方法
  Object o = new Person('张三', 17);

  // 如果想调用子类独有的方法，需要向下转型成Person类型，才能调用
  (o as Person).printInfo();
}

class Person {
  String name;
  int age;

  Person(this.name, this.age);

  printInfo() {
    print('name: $name, age: $age.');
  }
}
```

面向对象的多态性：

- 父类引用(对象)指向子类实例，称为向上转型(自动转型、隐式转型)
- 子类引用指向父类实例，称为向下转型(强制转型、显示转型)

如果要将父类对象转为子类类型，用到`as`关键字。



连缀操作 `..`

```dart
void main() {
  Person p = new Person('张三', 17);

  // 连缀操作
  p
    ..name = '李四'
    ..age = 19
    ..printInfo();
}

class Person {
  String name;
  int age;

  Person(this.name, this.age);

  printInfo() {
    print('name: $name, age: $age.');
  }
}
```



### 继承

Dart语言中的继承：

- 子类使用 `extends` 关键字类继承父类；
- 子类可以继承父类非私有的实例属性和方法，但不能继承构造函数；
- 子类能复写父类的方法 getter 和 setter。

```dart
void main() {
  Person p = new GoodMan('张三', 17);
  p.printInfo();
}

class Person {
  String name;
  int age;

  Person(this.name, this.age);

  printInfo() {
    print('name: $name, age: $age.');
  }
}

class GoodMan extends Person {
  String flag;

  // 在子类实例化时默认会调用父类的构造函数，父类中含有有参的构造函数，所以在子类的构造函数中要通过super关键字调用父类的构造器为属性赋值
  GoodMan(String name, int age) : super(name, age);
	
  // 重写父类的方法
  @override
  printInfo() {
    print('name: $name, age: $age, I am a goods man.');
  }
}
```



### 抽象类

Dart中的抽象类：Dart抽象类主要用于定义标准，子类可以继承 `extends` 抽象类，也可以实现 `implements` 抽象类接口。

- 抽象类通过 `abstract` 关键字类定义；
- Dart中的抽象方法不能使用 `abstract` 关键字声明，这一点和 Java 不同。在Dart中没有方法体的方法称为抽象方法，且只能在抽象类中定义抽象方法；
- 如果子类继承 `extends` 一个抽象类，则必须实现抽象类里**全部抽象方法**；
- 如果把抽象类当做接口实现 `implements` 的话，则必须要实现抽象类中定义的**全部属性和方法**。
- 抽象类不能被实例化，如果要实例化抽象类，可以通过定义工厂构造器实现。



`extends` 和 `implements` 关键字的用法：

- 如果要复用抽象类里面的方法，并且要用抽象方法约束子类的话，一般使用 `extends` 继承抽象类；
- 如果把抽象类当做定义标准的话，一般使用 `implements` 实现抽象类，实现时需要实现其全部的属性及方法。



```dart
void main() {
  Animal dog = new Dog();
  Animal cat = new Cat();
  dog.eat(); // 小狗喜欢啃骨头
  cat.eat(); // 小猫爱吸猫薄荷
  cat.printInfo(); // 我是抽象类中的普通方法
}

abstract class Animal {
  // 没有方法体的方法是抽象方法，且抽象方法只能在抽象类中定义
  eat();

  // 普通方法
  printInfo() {
    print('我是抽象类中的普通方法');
  }
}

class Dog extends Animal {
  // 子类必须重写父类（抽象类）中的抽象方法
  @override
  eat() {
    print('小狗喜欢啃骨头');
  }
}

class Cat extends Animal {
  @override
  eat() {
    print('小猫爱吸猫薄荷');
  }
}
```



### 多态

Dart中的多态：

- 允许将子类类型的指针赋值给父类类型的指针，同一个函数调用会有不同的执行结果；
- 也就是将子类实例指向（赋值给）父类引用（对象），父类对象调用同一个被不同子类重写的方法会有不同的执行结果；
- 多态就是父类定义一个方法，继承它的子类重写该方法，每个子类有不同的表写，即对象的多态性。



```dart
void main() {
  // 父类引用指向子类实例（向上转型），父类对象调用被子类重写的方法得到不同的执行结果，表现了对象的多态性
  Animal dog = new Dog();
  Animal cat = new Cat();
  dog.eat(); // 小狗喜欢啃骨头
  cat.eat(); // 小猫爱吸猫薄荷
}

abstract class Animal {
  // 抽象方法
  eat();
}

class Dog extends Animal {
  @override
  eat() {
    print('小狗喜欢啃骨头');
  }
}

class Cat extends Animal {
  @override
  eat() {
    print('小猫爱吸猫薄荷');
  }
}
```



>注意：
>
>父类引用（对象）指向子类实例，此时父类引用只能调用父类独有的方法以及子类重写父类的方法，**不能**调用子类独有的方法。
>
>如果要调用子类独有的方法，需要将父类引用强制转换（向下转型）成子类类型，才能调用子类中的方法。

```dart
void main() {
  Animal dog = new Dog();
  // 父类对象只能调用父类独有或者子类重写父类的方法
  dog.eat(); // 小狗喜欢啃骨头

  // 需要将Animal类型转型Dog类型，才能调用Dog中的run()方法
  (dog as Dog).run(); // 小狗喜欢跑
}

abstract class Animal {
  // 抽象方法
  eat();
}

class Dog extends Animal {
  @override
  eat() {
    print('小狗喜欢啃骨头');
  }

  // 子类独有的方法
  run() {
    print('小狗喜欢跑');
  }
}
```



### 接口

Dart语言中有接口，但是没有定义接口的关键字，如 `interface` 。普通类和抽象类都可以作为接口被实现。实现接口的关键字是 `implements` 。

Dart中，如过要实现一个普通类或者抽象类，则需要重写其所有的属性和方法。

因为抽象类中可以定义抽象方法，所以一般使用抽象类来定义接口。

```dart
class Animal {
  String name;
  int age;

  eat() {
    print('动物会吃东西');
  }
}

// 实现Animal类，需要重写其所有的属性和方法
class Dog implements Animal {
  @override
  int age;

  @override
  String name;

  @override
  eat() {
    // TODO: implement eat
    throw UnimplementedError();
  }
}
```



### 实现多个接口

```dart
abstract class A {
  String name;
  printA();
}

abstract class B {
  printB();
}

// 可以实现多个接口，并需要重写实现接口的所有属性和方法
class C implements A, B {
  @override
  String name;

  @override
  printA() {
    // TODO: implement printA
    throw UnimplementedError();
  }

  @override
  printB() {
    // TODO: implement printB
    throw UnimplementedError();
  }
}
```



### mixins

`mixins`的中文意思是“混入”，就是在类中混入其他功能。

在Dart语言中，可以使用mixins实现类似多继承的功能。

因为mixins使用的条件随着Dart版本一直在变，这里讲的是Dart 2.x中使用mixins的条件：

- 作为mixins的类只能继承自Object，不能继承其他类，不能声明任何构造方法，不能调用`super()`；
- 作为mixins的类不能有构造函数；
- 一个类可以mixins多个类；
- mixins绝不是继承，也不是接口，而是一种全新的特性 ；
- 使用`with`关键字mixins其他类；
- 继承和mixins可以同时使用，即一个类可以`extends`一个类同时`with`多个类；
- mixins的多个类中有同名的方法，在调用时会执行`with`靠后类中的方法，后面会把前面同名的方法覆盖掉。



```dart
class A {
  printA() {
    print('A');
  }
}

class B {
  printB() {
    print('B');
  }
}

// 使用 with 关键字 mixins其他类
class C with A, B {}

void main() {
  var c = new C();

  c.printA();
  c.printB();
}
```



## 泛型

泛型就是解决类、接口、方法的复用性以及对不特定数据类型的支持（数据校验）。



### 泛型方法

```dart
// 定义泛型方法 T表示泛型 可以用任意字母代替，一般用大写字母T
T getData<T>(T value) {
  return value;
}

void main() {
  // 在调用时可以指定T的具体类型
  var res1 = getData<int>(123);
  var res2 = getData<String>('dart');

  print(res1);
  print(res2);
}
```



### 泛型类

```dart
void main() {
  // 在实例化时指定泛型的具体类型
  var myList = new MyList<String>();

  myList.add('苹果');
  myList.add('西瓜');
  // myList.add(123); 无法存入int类型

  myList.printList(); // [苹果, 西瓜]
}

// 自定义一个泛型类，实现存入和打印的功能
class MyList<E> {
  List<E> _list = new List();

  add(E value) {
    this._list.add(value);
  }

  printList() {
    print(this._list.toString());
  }
}
```



### 泛型接口

示例需求：

>实现数据缓存功能：有文件缓存、内存缓存。内存缓存和文件缓存按照接口约束实现。
>
>1. 定义一个泛型接口，约束实现它的子类必须有getByKey(key)和setByKey(key,value)
>2. 要求setByKey的是偶value的类型和实例化子类的时候指定的类型一致

```dart
// 使用抽象类定义一个缓存接口，实现该接口的类必须实现setByKey()和getByKey()两个方法
abstract class Cache<T> {
  setByKey(String key, T value);
  T getByKey(String key);
}

// 定义一个内存缓存实现类，实现上面的缓存接口
class MemoryCache<T> implements Cache<T> {
  Map<String, T> _cache = new Map();

  @override
  T getByKey(String key) {
    return this._cache[key];
  }

  @override
  setByKey(String key, T value) {
    this._cache.addAll({key: value});
    print('add success');
  }
}

// 测试
void main() {
  var cache = new MemoryCache<String>();

  cache.setByKey('name', '张三'); // 打印 add success

  var name = cache.getByKey('name');
  print(name); // 张三
}
```

泛型的作用，当我们要定义一个只能存一种数据类型的容器，但不确定要存入的具体类型时，可以使用泛型。

使用泛型后，容器可以在具体实例化时指定容器的数据类型。

这解决了代码冗余，并对容器增加了数据校验（不确定数据的支持）。



## 库

在Dart中，每一个dart文件都是一个库。

Dart中主要有三种库：

1. 我们自定义库；
2. 系统内置库；
3. Pub包管理系统中的库。



在dart文件中，使用`import`关键字引入外部的库。



### 引入自定义库

```dart
import 'lib/Person.dart';
```



### 引入系统内置库

```dart
import 'dart:io';
import 'dart:math';
```

如发起网络请求：

```dart
import 'dart:convert';
import 'dart:io';

void main() async {
  var result = await _getDataFromZhihuAPI();
  print(result);
}

_getDataFromZhihuAPI() async {
  // 1. 创建HttpClient对象
  var httpClient = new HttpClient();
  // 2. 创建uri对象
  var uri = new Uri.http('www.shiguangping.com', '/');
  // 3. 发起请求，等待请求
  var request = await httpClient.getUrl(uri);
  // 4. 关闭请求，等待响应
  var response = await request.close();
  // 5. 解析响应的内容
  return await response.transform(utf8.decoder).join();
}
```



>`async`和`await`关键字：
>
>`async`是让方法变成异步，`await`是等待异步方法执行完成。
>
>只有`async`方法中才能使用`await`关键字，如果是调用其他的`async`方法必须使用`await`关键字。

```dart
// 异步方法
func() async {
  return '我是async方法';
}

void main() {
  // 调用异步方法需要获取返回值，需要使用await关键字 var res =  await func();
  var res = func();
  print('我是main方法');
  print(res); // Instance of 'Future<dynamic>'
}
```



### 引入第三方库

从下面的网址获取常用的第三方库：

[https://pub.dev/packages](https://pub.dev/packages)

[https://pub.flutter-io.cn/packages](https://pub.flutter-io.cn/packages)

[https://pub.dartlang.org/flutter](https://pub.dartlang.org/flutter)



项目中创建`pubspec.yaml`文件管理库依赖

```yaml
name: xxx
description: A new flutter module project.
dependencies:
  http: ^0.12.2
```

安装第三方库的三步：

第一步：在`pubspec.yaml`的`dependencies`属性下添加要安装的库：

```yaml
dependencies:
  http: ^0.12.2
```

第二步：执行命令：

```bash
pub get
```

第三步：引入

```dart
import 'package:http/http.dart';
```



### 库的别名

引入的两个库如果存在相同的类名会存在冲突，可以使用`as`关键字为库起别名，使用`别名.类名`的方式引用库中的类。

```dart
// 引入的两个库中都存在Person类，可以为库起别名，通过别名调用要使用的类
import 'lib/Person1.dart' as p1;
import 'lib/Person2.dart' as p2;

void main() {
  p1.Person person1 = new p1.Person();
  p2.Person person2 = new p2.Person();
}
```



### 部分导入

如果只需要引入库中的一部分功能，有两种方式：

- 只导入需要的部分，使用`show`关键字。引入多个使用`,`逗号分隔；

  ```dart
  // 使用 show 关键字 引入库中的部分功能
  import 'lib/MyMath.dart' show getInt, getDouble;
  
  void main() {
    getInt();
    getDouble();
    // getString();
  }
  ```

- 隐藏不需要的部分，使用`hide`关键字

  ```dart
  // 使用 hide 关键字 隐藏库中不需要的功能
  import 'lib/MyMath.dart' hide getInt, getDouble;
  
  void main() {
    // getInt();
    // getDouble();
    getString();
  }
  ```



### 延迟加载

也称为懒加载，可以在需要的时候再进行加载。懒加载最大的好处是可以减少APP的启动时间。

懒加载使用`deferred as`关键字来指定，如下例子所示：

```dart
import 'package:deferred/hello.dart deferred as hello';
```

当需要使用的时候，需要使用loadLibrary()方法来加载：

```dart
greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```



## 结尾

Dart语言部分至此告一段落，接下来开始进入Flutter阶段。
