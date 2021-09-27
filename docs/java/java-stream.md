---
title: Java学习之-Java SE 8的流库
date: 2021-6-9
category:
- Java学习
tags:
- Java
---

# Java SE 8 的流库

## 1. 从迭代到流操作

通过下面的示例代码来认识流操作。

```java
/**
 * @author liyan
 * 计算数组中字符长度大于4的单词个数
 */
public class CountLongWords {

    public static void main(String[] args) {

        List<String> words = Arrays.asList("Hello", "World", "Java", "Go", "Dart", "Python");
				
      // 通过迭代计算字符长度大于4的单词
        long count = 0;
        for (String w : words) {
            if (w.length() > 4) {
                count++;
            }
        }
        System.out.println("迭代长度大于4个字符的单词个数：" + count);

			
      // 通过管道流处理计算字符长度大于4的单词
        long count1 = words.stream().filter(w -> w.length() > 4).count();
        System.out.println("流处理长度大于4个字符的单词个数：" + count1);

    }
}
```

从代码上看，流的操作更简洁直观。

流的操作包含了三个阶段的操作管道：

1. 创建流；
2. 将初始流转换为其他流的中间操作，可能包含多个步骤；
3. 应用的终止操作，产生结果。这一操作会强制执行之前的惰性操作，之后这个流将不能再被使用。

<br>

通过上面的代码，我们来认识流的接口：

>package java.util.stream;

```java
public interface Stream<T> extends BaseStream<T, Stream<T>> {
  
  // 返回由此流中与给定谓词匹配的元素组成的流。（这是一个中间操作）
  Stream<T> filter(Predicate<? super T> predicate);
  
  // 返回这个流中元素的个数。
  long count();
}
```

<br>

> package java.util;

```java
public interface Collection<E> extends Iterable<E> {
  
  // 将该集合作为数据源返回一个串行流。
  default Stream<E> stream() {
        return StreamSupport.stream(spliterator(), false);
    }
  
  // 将该集合最为数据源尽可能地返回一个并行流，也允许返回一个串行流。
  default Stream<E> parallelStream() {
        return StreamSupport.stream(spliterator(), true);
    }
}
```

<br>

## 2. 流的创建

1. 通过Collection接口的`stream()`方法创建流。

   ```java
   default Stream<E> stream() {
     return StreamSupport.stream(spliterator(), false);
   }
   ```

2. 通过Stream接口中的`of(T... values)`方法创建流，参数列表是可变长参数。

   ```java
   public static<T> Stream<T> of(T... values) {
     return Arrays.stream(values);
   }
   ```

3. 通过Arrays类的`stream(T[] array)`创建流，它还包含了多个重载方法。

   ```java
   public static <T> Stream<T> stream(T[] array) {
     return stream(array, 0, array.length);
   }
   ```

4. 可以通过Stream接口中的`empty()`方法返回一个不包含任何元素的流。

   ```java
   public static<T> Stream<T> empty() {
     return StreamSupport.stream(Spliterators.<T>emptySpliterator(), false);
   }
   ```

   

