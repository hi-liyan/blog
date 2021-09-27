---
id: jdk-install
title: JDK 安装
---

## 学前准备

1. 下载JDK
2. 安装IDE




### 什么是JDK？

JDK，Java Development Kit（Java开发工具包），包含了Java运行时(JRE)以及Java开发的常用工具，如javac。



JRE，Java Runtime Environment（Java运行时环境），包含了JVM以及运行时所需要的各种类库。



JVM，Java虚拟机，Java源代码会通过javac编译工具编译成`.class`后缀的二进制字节码文件，字节码文件运行在JVM虚拟机上。



### 安装JDK（JDK 8）

分两步（以Windows为例）：

1. 下载和安装JDK；
2. 配置环境变量



[下载地址](https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html)，64位操作系统下载Windows 64的exe安装程序，安装。

安装好后配置环境变量。

![image-20210719190038914](https://images.shiguangping.com/imgs/image-20210719190038914.png)

JDK默认安装路径：`C:\Program Files\Java\jdk1.8.0_291\bin`，复制该路径到系统变量的path中。

win10系统配置环境变量的位置在：右键此电脑 -> 属性 -> 高级系统设置 -> 环境变量。

![image-20210719190432145](https://images.shiguangping.com/imgs/image-20210719190432145.png)

验证环境变量是否配置成功。打开（重新打开）cmd或者powershell，敲入`java -version`，显示Java版本号说明环境变量配置成功。（如下图）

![image-20210719191205664](https://images.shiguangping.com/imgs/image-20210719191205664.png)



### 安装IDE

IDE（集成开发环境），IDE是写代码的常用工具，一般里面包含了各种开发常用的工具，插件，大大提成开发效率。

目前常用的IDE有，Jetbrains IDEA，Eclipse等等。

下载Jetbrains IDEA，[下载地址](https://www.jetbrains.com/zh-cn/idea/download/#section=windows)

![image-20210719192807004](https://images.shiguangping.com/imgs/image-20210719192807004.png)

IDEA包含两个版本，终极版和社区版本，前者付费。初学者下载安装社区版本即可。

