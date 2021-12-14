---
id: java-multi-thread
title: Java 多线程
---

#  一、了解进程和线程

## 1.1 什么是进程？

**进程**，顾名思义，指正在进行中的程序，是*系统进行资源分配*的基本单位。

目前操作系统都是支持多进程的，可以同时执行多个进程，通过进程ID(Process ID)区分。



## 1.2 什么是线程？

线程，又称轻量级进程(Light Weight Process)。进程中的一条执行路径，也是*CPU资源调度*的基本单位。
一个进程由一个或多个线程组成，彼此间完成不同的工作，同时执行，称为多线程。



## 1.3 进程和线程的区别

1. 进程是操作系统资源分配的基本单位，而线程是CPU资源调度的基本单位；
2. 一个程序运行后至少有一个进程；
3. 一个进程包含至少一个线程；
4. 进程间不能共享数据段地址，但是一个进程中的线程之间可以共享。



## 1.4 线程的组成

任何一个线程都具有如下的基本组成部分：

- CPU时间片：操作系统会为每个线程分配执行时间；
- 运行数据：
    - 堆空间：存储线程需要使用的对象，多个线程可以共享堆中的对象
    - 栈空间：存储线程需要使用的局部变量，每个线程都拥有独立的栈
- 线程的逻辑代码



## 1.5 线程的特点

- 线程抢占式执行
    - 效率高
    - 可防止单一线程长时间独占CPU
- 在单个CPU核心中，多个线程宏观上是同时执行，微观上是顺序执行（根据操作系统分配的时间片执行）





# 二、Java中创建线程

## 2.1 创建线程

Java中创建线程的三种方式：

1. 继承`Thread`类，重写`run()`方法；
2. 实现`Runnale`接口
3. 实现`Callable`接口（JDK1.5+）



## 2.2 方式一（继承Thread类）

自定义一个线程类，继承`Thread`类

```java
package com.shiguangping.day2;

/**
 * @author liyan
 */
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("线程ID：" + this.getId() + " 线程名：" + this.getName() + " 子线程：" + i);
        }
    }
}
```



测试类`main()`方法中创建线程类对象，启动线程。

```java
package com.shiguangping.day2;

/**
 * @author liyan
 */
public class TestThread {

    public static void main(String[] args) {
        // 创建线程类对象
        MyThread myThread = new MyThread();
        // 启动线程
        myThread.start();

        for (int i = 0; i < 100; i++) {
            System.out.println("主线程：" + i);
        }

    }
}
```



其中，执行`main()`方法的线程叫主线程，自定义执行的线程是子线程。

`Thread`类中提供的基本方法：

| 方法                   | 作用                   |
| ---------------------- | ---------------------- |
| getId()                | 获取线程ID             |
| getName()              | 获取线程名称           |
| setName()              | 设置线程名称           |
| Thread.currentThread() | 获取当前执行的线程对象 |



## 2.3 方式二（实现Runable接口）

`Runnable`接口源代码，该接口是一个函数式接口，内部只有一个抽象方法。

```java
@FunctionalInterface
public interface Runnable {
    /**
     * When an object implementing interface <code>Runnable</code> is used
     * to create a thread, starting the thread causes the object's
     * <code>run</code> method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method <code>run</code> is that it may
     * take any action whatsoever.
     *
     * @see     java.lang.Thread#run()
     */
    public abstract void run();
}
```



创建一个`Runnable`接口的实现类，实现`run()`方法。

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("线程ID：" + Thread.currentThread().getId() + "，线程名称：" + Thread.currentThread().getName() + "，数值：" + i);
        }
    }
}
```



测试类`main()`方法中创建MyRunnable对象，该对象表示线程具体要实现的功能。通过`new Thread(Runnable target)`创建线程对象，并启动线程。

```java
public class TestThread {

    public static void main(String[] args) {
        // 创建MyRunnable对象，表示线程要执行的功能
        MyRunnable myRunnable = new MyRunnable();
        // 创建线程对象
        Thread thread = new Thread(myRunnable, "我的线程1");
        // 启动线程
        thread.start();
				
      
      	// Thread构造方法中直接传入Runnable匿名内部类，或者Lambda表达式形式来创建线程
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 100; i++) {
                System.out.println("线程ID：" + Thread.currentThread().getId() + "，线程名称：" + Thread.currentThread().getName() + "，数值：" + i);
            }
        }, "我的线程2");

        thread1.start();

        for (int i = 0; i < 100; i++) {
            System.out.println("主线程-------------" + i);
        }

    }
}
```



# 三、线程的状态（基本）

## 3.1 四种基本状态

![image-20210516211929358](https://images.shiguangping.com/imgs/20210516211929.png)



线程四种基本状态：

- 初始状态（new Thread()）
- 就绪状态（.start()）
- 运行状态（获得时间片，开始运行）
- 终止状态（线程执行结束，释放时间片）



## 3.2 常见方法

### 3.2.1 休眠

```java
// 当前线程主动休眠millis毫秒。
public static void sleep(long millis)
```



### 3.2.2 谦让（让步）

```java
// 当前线程主动放弃时间片，回到就绪状态，竞争下一次时间片。
public static void yield()
```



### 3.2.3 加入

```java
// 将线程加入到当前线程中,并阻塞当前线程，直到加入线程执行完毕。
public final void join()
```



### 3.2.4 优先级

```java
// 线程优先级为1-10，默认为5，优先级越高，表示获取CPU机会越多。
public final void setPriority(int newPriority)
```



### 3.2.5 守护线程

```java
// true 设置为守护线程
public final void setDaemon(boolean on)
```

线程分为两类：用户线程（前台线程）和守护线程（后台线程）。

后台线程是为前台线程服务的，如果程序中所有前台线程都执行完毕了，后台线程会自动结束。

垃圾回收器线程属于后台线程，也就是守护线程。



## 3.3 线程状态（等待）

![image-20210516230903898](https://images.shiguangping.com/imgs/20210516230903.png)

执行`sleep()`方法，线程会进入*限期等待*状态，当休眠到期，线程会进入到*就绪状态*，等待获取CPU时间片执行线程；

执行`join()`方法，会阻塞当前线程，执行加入进来的线程，当前线程会进入*无限期等待*状态，当加入进来的线程执行完毕，当前线程会进入*就绪状态*，等待获取CPU时间片执行线程。



## 3.4 多线程安全问题

- 当多线程访问*临界资源*时，如果破坏原子操作，可能会造成数据不一致；
- 临界资源：共享资源（同一对象），一次仅允许一个线程使用，才可保证其正确性。



实例代码。

```java
package com.shiguangping.day2;

import java.util.Arrays;

public class ThreadSafe {

    private static int index = 0;

    public static void main(String[] args) throws InterruptedException {
        String[] s = new String[5];
				
      	// 向数组中添加Hello
        Runnable r1 = () -> {
            s[index] = "Hello";
            index++;
        };
        // 向数组中添加World
        Runnable r2 = () -> {
            s[index] = "World";
            index++;
        };

        Thread t1 = new Thread(r1, "线程A");
        Thread t2 = new Thread(r2, "线程B");

        t1.start();
        t2.start();
				
      	// 两个线程都执行结束后，打印数组结果
        t1.join();
        t2.join();

        System.out.println(Arrays.asList(s));

    }
}
```

可能出现的结果：

![image-20210516233155156](https://images.shiguangping.com/imgs/20210516233155.png)

正常结果应该是数组中存入了两个字符串，"Hello World"。

而出现上面这种结果的原因是，当线程t1拿到时间片，当前`index`值为0，t1执行`s[index] = "Hello";`，将字符串"Hello"放入下标0的位置，但还没来得及执行`index++;`,时间片到期；然后线程t2拿到时间片开始执行，此时`index`值依然为0，t2将"World"放入数组下标0的位置，然后执行`index++;`，t2执行完后t1拿到时间片，执行`index++;`。所以导致了数组中只存入了一个字符串的问题。

这也就是上面说的，多个线程访问临界资源，也就是`index`，破坏了原子操作（存入字符串和index++应该一步完成），导致了数据不一致问题。



##  3.5 同步方式（1）

同步代码块解决线程安全问题（悲观锁）。

```java
synchronized(临界资源对象) { // 对临界资源对象加锁
  // 代码（原子操作）
}
```



解决4.1中出现的问题。

```java
package com.shiguangping.day2;

import java.util.Arrays;

public class ThreadSafe {

    private static int index = 0;

    public static void main(String[] args) throws InterruptedException {
        String[] s = new String[5];

        Runnable r1 = () -> {
            synchronized (s) {
                s[index] = "Hello";
                index++;
            }
        };

        Runnable r2 = () -> {
            synchronized (s) {
                s[index] = "World";
                index++;
            }
        };

        Thread t1 = new Thread(r1, "线程A");
        Thread t2 = new Thread(r2, "线程B");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(Arrays.asList(s));

    }
}
```



## 3.6 线程状态（阻塞）

![image-20210517132350130](https://images.shiguangping.com/imgs/20210517132350.png)

使用`synchronized`同步锁锁定临界资源，当线程访问临界资源时发现资源已被其他线程加锁，则线程进入阻塞状态，直到其他线程释放同步锁，当前线程拿到临界资源锁时，线程进入就绪状态，等到获取CPU时间片，线程执行。

*注：在JDK1.5之后，就绪状态和运行状态统称为Runnable。*



## 3.7 同步方式（2）

同步方法:

```java
synchronized 返回值类型 方法名称 (参数列表0) { // 对当前对象（this）加锁
  // 代码（原子操作）
}
```



注：

- 只有拥有对象互斥锁标记的线程，才能进入该对象加锁的同步方法中；
- 线程退出同步方法时，会释放相应的互斥锁标记。



## 3.8 同步规则

注意：

- 只有在调用包含同步代码块的方法，或者同步方法时，才需要对象的锁标记；
- 如调用不包含同步代码块的方法，或普通方法时，则不需要锁标记，可直接调用。



已知JDK中线程安全的类：

- StringBuffer
- Vector
- HashTable
- 以上类的公开方法，均为`synchronized`修饰的同步方法。



## 3.9 死锁

死锁问题：

- 当第一个线程拥有A对象锁标记，并等待B对象锁标记，同时第二个线程拥有B对象锁标记，并等待A线程锁标记时，会产生死锁；
- 一个线程可以拥有多个对象的锁标记，当线程阻塞时，不会释放已经拥有的锁标记，由此可能会造成死锁。



案例代码。

创建一个类，提供两个资源对象。

```java
package com.shiguangping.day3;

public class MyLock {
  	// 两个筷子a和b
    public static Object a = new Object();
    public static Object b = new Object();
}
```

创建两个线程类。

```java
package com.shiguangping.day3;
// 男孩先拿筷子a，再去拿筷子b
public class Boy extends Thread {

    @Override
    public void run() {
        synchronized (MyLock.a) {
            System.out.println("男孩拿到筷子a");
            synchronized (MyLock.b) {
                System.out.println("男孩拿到筷子b");
                System.out.println("男孩可以吃东西了...");
            }
        }
    }
}
```



```java
package com.shiguangping.day3;
// 女孩先拿筷子b，再去拿筷子a
public class Girl extends Thread {

    @Override
    public void run() {
        synchronized (MyLock.b) {
            System.out.println("女孩拿到筷子b");
            synchronized (MyLock.a) {
                System.out.println("女孩拿到筷子a");
                System.out.println("女孩可以吃东西了...");
            }
        }
    }
}
```



测试类执行两个线程。

```java
package com.shiguangping.day3;

public class MyLockTest {

    public static void main(String[] args) {
        Boy boy = new Boy();
        Girl girl = new Girl();

        boy.start();
        girl.start();

    }
}
```

![image-20210517141301893](https://images.shiguangping.com/imgs/20210517141301.png)

最终会出现，男孩拿到筷子a的锁标记，然后去拿筷子b，同时女孩拿着筷子b的锁标记，去拿筷子a，最终两个线程都阻塞，造成死锁。

所以，在开发中，应避免这种死锁情况。



## 3.10 线程通信

线程通信的有关方法：

- 等待

    - `public final void wait()`
    - `public final void wait(long timeout)`

  必须在对obj（也就是临界资源）加锁的同步代码块中。在一个线程中，调用`obj.wait()`时，此线程会释放其拥有的所有锁标记，同时此线程将阻塞在o的等待队列中。释放锁，进入等待队列。



- 通知

    - `public final void notify()`
    - `public final void notifyAll()`

  用来唤醒位于等待队列中等待的线程。



使用`wait()`和`notify()`方法，控制银行存取钱案例中，当余额有钱时才能取钱，没钱时需要存钱，实现存一笔取一笔。

```java
package com.shiguangping.day3;

/**
 * 银行账户
 *
 * @author liyan
 */
public class BankAccount {

    /**
     * 金额
     */
    private double amount;
    /**
     * 账户标记：true有钱 false没钱
     */
    private boolean flag;

    /**
     * 存钱
     *
     * @param m
     */
    public synchronized void save(double m) {
        // 如果账户有钱，则线程进入等待队列，并释放锁
        if (flag) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        // 如果没有钱，则存入钱，并唤醒等待队列中的取钱线程
        amount += m;
        System.out.println(Thread.currentThread().getName() + "存入" + m + "元，当前余额：" + amount + "元。");
        this.flag = true;
        this.notify();
    }

    /**
     * 取钱
     *
     * @param m
     */
    public synchronized void take(double m) {
        // 如果账号没有钱，则线程进入等待序列，并释放锁
        if (!flag) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        // 如果有钱，则取出钱，并唤醒等待队列中的存钱线程
        amount -= m;
        System.out.println(Thread.currentThread().getName() + "取出" + m + "元，当前余额：" + amount + "元。");
        this.flag = false;
        this.notify();
    }
}

```



```java
package com.shiguangping.day3;

public class BankAccountTest {

    public static void main(String[] args) {
        // 1. 创建银行账户
        BankAccount account = new BankAccount();

        // 2. 创建存钱、取钱操作各10次
        Runnable addMoney = () -> {
            for (int i = 0; i < 10; i++) {
                account.save(1000);
            }
        };

        Runnable subMoney = () -> {
            for (int i = 0; i < 10; i++) {
                account.take(1000);
            }
        };

        // 创建两个线程
        Thread chen = new Thread(addMoney, "晨晨");
        Thread bing = new Thread(subMoney, "冰冰");

        bing.start();
        chen.start();

    }
}
```



## 3.11 生产者、消费者

若干生产者生产产品，这些产品将提供给若干个消费者去消费，为了使生产者和消费者能并发执行，在两者之间设置一个能存储多个产品的缓冲区，生产者将生产的产品放入缓冲区中，消费者从缓冲区取走产品进行消费，显然生产者和消费者之间必须保持同步，即不允许消费者到一个空的缓冲区中取产品，也不允许生产者向一个满的缓冲区放入产品。



```java
package com.shiguangping.day4;

/**
 * 面包类
 * @author liyan
 */
public class Bread {
    private int id;
    private String productName;

    public Bread() {
    }

    public Bread(int id, String productName) {
        this.id = id;
        this.productName = productName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
```



```java
package com.shiguangping.day4;

/**
 * 面包容器
 * @author liyan
 */
public class BreadCon {
    /**
     * 存放面包的容器，大小是6
     */
    private Bread[] cons = new Bread[6];
    /**
     * 面包在容器中的位置
     */
    private int index;

    /**
     * 存放面包
     *
     * @param bread
     */
    public synchronized void input(Bread bread) {
        // 判断容器是否存满
        while (index >= 6) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        cons[index] = bread;
        System.out.println(Thread.currentThread().getName() + "生产了面包---" + bread.getId() + " " + bread.getProductName());
        index++;
        // 唤醒
        this.notifyAll();
    }

    /**
     * 取出面包
     */
    public synchronized void output() {
        // 判断容器是否有面包
        while (index <= 0) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        index--;
        Bread bread = cons[index];
        System.out.println(Thread.currentThread().getName() + "消费了面包---" + bread.getId() + " " + bread.getProductName());
        cons[index] = null;
        // 唤醒
        this.notifyAll();
    }
}
```



```java
package com.shiguangping.day4;

/**
 * 测试类
 * @author liyan
 */
public class BreadTest {

    public static void main(String[] args) {
        // 1. 创建面包容器对象
        BreadCon con = new BreadCon();

        // 2. 创建生产、消费操作
        Runnable producer = () -> {
            for (int i = 0; i < 30; i++) {
                con.input(new Bread((i + 1), Thread.currentThread().getName()));
            }
        };

        Runnable consumer = () -> {
            for (int i = 0; i < 30; i++) {
                con.output();
            }
        };
        
        // 3. 创建线程对象
        Thread chen = new Thread(producer, "晨晨");
        Thread bing = new Thread(consumer, "冰冰");
        Thread ming = new Thread(producer, "明明");
        Thread li = new Thread(consumer, "丽丽");

        // 4. 启动线程
        chen.start();
        bing.start();
        ming.start();
        li.start();
    }
}
```



# 四、多线程高级

## 4.1 线程池概念

- 问题
    - 线程是计算机中宝贵的内存资源，单个线程约占1MB空间，过多分配容易造成内存溢出；
    - 频繁的创建和销毁线程会增加虚拟机的回收频率和资源开销，造成程序性能下降。



- 线程池
    - 线程容器，可设定线程分配的数量上限；
    - 将预先创建的线程对象存入池中，并重用线程池中的线程对象；
    - 避免频繁地创建和销毁。



## 4.2 创建线程池

常用的线程池接口和类（所在包`java.util.concurrent`）:

`Executor`接口：线程池的顶级接口，里面只包含了一个`execute()`抽象方法；

```java
public interface Executor {
    void execute(Runnable command);
}
```



`ExecutorService`接口：线程池接口，继承自`Excutor`接口，可通过`submit(Runnable task)`提交任务代码；

`Executors`工厂类：通过此类可以获得一个线程池；

- 通过`newFixedThreadPool(int nThreads)`方法获得固定数量的线程池；
- 通过`newCachedThreadPool()`获得动态数量的线程池，如果不够则创建新的，没有上限；



### 4.2.1 使用Executors工具类创建线程池

创建固定线程个数线程池。

```java
package com.shiguangping.day5;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Demo1 {

    public static void main(String[] args) {
        // 创建固定线程个数的线程池
        ExecutorService es = Executors.newFixedThreadPool(10);

        Runnable runnable = new Runnable() {
            private int ticket = 100;
            Object o = new Object();

            @Override
            public void run() {
                while (true) {
                    synchronized (o) {
                        if (ticket <= 0) {
                            break;
                        }
                        System.out.println(Thread.currentThread().getName() + "卖了第" + ticket + "张票。");
                        ticket--;
                    }
                }
            }
        };

        for (int i = 0; i < 4; i++) {
            es.submit(runnable);
        }
        // 关闭线程池
        es.shutdown();
    }
}
```

创建缓存线程池。

```java
package com.shiguangping.day5;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Demo1 {

    public static void main(String[] args) {

        // 创建缓存线程池，由任务多少决定
        ExecutorService es = Executors.newCachedThreadPool();

        Runnable runnable = new Runnable() {
            private int ticket = 500;
            Object o = new Object();

            @Override
            public void run() {
                while (true) {
                    synchronized (o) {
                        if (ticket <= 0) {
                            break;
                        }
                        System.out.println(Thread.currentThread().getName() + "卖了第" + ticket + "张票。");
                        ticket--;
                    }
                }
            }
        };

        for (int i = 0; i < 10; i++) {
            es.submit(runnable);
        }
        // 关闭线程池
        es.shutdown();
    }
}
```

创建单线程池（池中只有一个线程对象）。

```java
// 创建单线程池（池中只有一个线程对象）
ExecutorService es = Executors.newSingleThreadExecutor();
```

创建调度线程池（调度：周期、定时执行）。

```java
// 创建调度线程池，调度：周期、定时执行
ExecutorService es = Executors.newScheduledThreadPool(5);
```



## 4.3 Callable 接口

```java
@FunctionalInterface
public interface Callable<V> {
    /**
     * Computes a result, or throws an exception if unable to do so.
     *
     * @return computed result
     * @throws Exception if unable to compute a result
     */
    V call() throws Exception;
}
```



Callable接口和Runnable接口区别：

- Callable接口中`call()`方法有返回值，Runnable接口中`run()`方法没有返回值；
- Callable接口中`call()`方法有声明异常，Runnable接口中`run()`方法没有异常。



Callable接口基本使用。

```java
package com.shiguangping.day5;

import java.util.concurrent.*;

public class Demo2 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 创建Callable实现，具有返回值
        Callable<Integer> callable = () -> {
            int sum = 0;
            for (int i = 0; i <= 100; i++) {
                sum += i;
            }
            return sum;
        };

        // 将callable对象转成FutureTask对象，该类实现了Runnable接口
        FutureTask<Integer> futureTask = new FutureTask<>(callable);

        // 创建线程并启动
        new Thread(futureTask).start();

        // get()获取结果
        System.out.println(futureTask.get());

    }
}
```



Callable接口结合线程池的基本使用。

```java
package com.shiguangping.day5;

import java.util.concurrent.*;

public class Demo3 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 创建Callable实现，具有返回值
        Callable<Integer> callable = () -> {
            int sum = 0;
            for (int i = 0; i <= 100; i++) {
                sum += i;
            }
            return sum;
        };

        // 创建线程池
        ExecutorService es = Executors.newFixedThreadPool(5);

        // 提交任务，获取任务结果
        Future<Integer> future = es.submit(callable);
        Integer res = future.get();

        System.out.println(res);

        // 结束线程池
        es.shutdown();
    }
}
```



## 4.4 Future 接口

Future接口：表示将要完成任务的结果（会在线程执行结束后获取结果）。

- 表示`ExecutorService.submit()`所返回的状态结果，就是`call()`的返回值；
- 方法`V get()`是以阻塞形式等待Future中的异步处理结果（`call()`的返回值）。

```java
package com.shiguangping.day5;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Demo4 {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 创建线程池
        ExecutorService es = Executors.newFixedThreadPool(2);

        // 提交任务
        Future<Integer> future1 = es.submit(() -> {
            int sum = 0;
            for (int i = 1; i <= 50; i++) {
                sum += i;
            }
            return sum;
        });
        Future<Integer> future2 = es.submit(() -> {
            int sum = 0;
            for (int i = 51; i <= 100; i++) {
                sum += i;
            }
            return sum;
        });

        // 输出两个线程结果的和
        System.out.println(future1.get() + future2.get());

        // 关闭线程池
        es.shutdown();
    }
}
```



## 4.5 Lock 接口

Lock接口，同步锁，在JDK1.5加入，与`synchronized`相比，显式定义，结构更灵活。

提供更多实用性方法，功能强大，性能更优越。

常用方法：

- `void lock()` 获取锁，如锁被占用，则等待；
- `boolean tryLock()` 尝试获取锁，获取成功返回true，失败返回false，不阻塞；
- `void unlock()` 释放锁。



### 4.5.1 重入锁

`ReentrantLock`类是`Lock`的实现类，与`synchronized`一样具有互斥锁功能。

基本使用。

```java
package com.shiguangping.day5;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class MyList {

    /**
     * 创建重入锁对象
     */
    private Lock locker = new ReentrantLock();

    private String[] strings = {"A", "B", "", "", ""};
    private int count = 2;

    public void add(String v) {
      	// 加锁（如果锁被其他线程持有，则当前线程阻塞）
        locker.lock();
        try {
            strings[count] = v;
            try {
                // 休眠1秒，即便其它线程拿到时间片，由于当前线程没有释放锁，其它线程也只会被阻塞
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            count++;
        } finally {
          	// 最终释放锁
            locker.unlock();
        }
    }

    public String[] getStrings(){
        return strings;
    }
}
```



```java
package com.shiguangping.day5;

import java.util.Arrays;

public class MyListTest {

    public static void main(String[] args) throws InterruptedException {
        MyList myList = new MyList();

        Runnable r1 = () -> myList.add("Hello");
        Runnable r2 = () -> myList.add("World");

        Thread t1 = new Thread(r1);
        Thread t2 = new Thread(r2);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        String[] strings = myList.getStrings();
        System.out.println(Arrays.toString(strings));
    }
}
```





### 4.5.2 读写锁

`ReentrantReadWriteLock`类：

- 一种支持一写多读的同步锁，读写分离，可分别分配读锁和写锁；
- 支持多次分配读锁，使多个读操作可以并发执行。



互斥规则：

- 写-写：互斥，阻塞；
- 读-写：互斥，读阻塞写、写阻塞读；
- 读-读：不互斥，不阻塞；
- 在读操作远远高于写操作的环境中，可在保障线程安全的情况下，提高运行效率。



基本使用。

```java
package com.shiguangping.day5;

import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.ReadLock;

public class ReadWriteDemo<T> {
    /**
     * 创建读写锁对象
     */
    private ReentrantReadWriteLock rrl = new ReentrantReadWriteLock();

    /**
     * 创建读锁对象
     */
    private ReadLock readLock = rrl.readLock();

    /**
     * 创建写锁对象
     */
    private WriteLock writeLock = rrl.writeLock();

    private T value;

    /**
     * 读取
     *
     * @return value
     */
    public T getValue() {
        readLock.lock();
        try {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return value;
        } finally {
            readLock.unlock();
        }
    }

    /**
     * 写入
     *
     * @param value
     */
    public void setValue(T value) {
        writeLock.lock();
        try {
            this.value = value;
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } finally {
            writeLock.unlock();
        }
    }
}
```



```java
package com.shiguangping.day5;

import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ReadWriteTest {
    public static void main(String[] args) {
        ReadWriteDemo<String> rwd = new ReadWriteDemo<>();

        // 创建线程池
        ExecutorService es = Executors.newFixedThreadPool(20);

        long start = System.currentTimeMillis();
        // 分配2个写任务
        for (int i = 0; i < 2; i++) {
            es.submit(() -> {
                rwd.setValue("张三");
                System.out.println(Thread.currentThread().getName() + "写入");
            });
        }
        // 分配18个读取任务
        for (int i = 0; i < 18; i++) {
            es.submit(() -> {
                String value = rwd.getValue();
                System.out.println(Thread.currentThread().getName() + "读取：" + value);
            });
        }

        // 结束线程池
        es.shutdown();
        while (!es.isTerminated()) {

        }
        long end = System.currentTimeMillis();
        System.out.println("用时：" + (end - start));

    }
}
```



## 4.6 线程安全的集合

