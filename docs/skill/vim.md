---
id: vim
title: Vim 基本使用
---

### 什么是Vim？

Vim是从Vi发展出来的一个功能非常强大的文本编辑器，在程序员中广泛使用。



### Vim/Vi的使用

基本上Vim/Vi共分为三种模式：分别是**命令模式（Command mode）**，**输入模式（Insert mode）**和**底线命令模式（Last line mode）**。这三种模式的作用分别是：



#### 命令模式：

用户进入Vim时即是**命令模式**。

#### 输入模式：

在命令模式下按 **“ i ”**进入输入模式。

输入模式下按**“ ESC ”**，退出到命令模式。

#### 底线命令模式：

在命令模式下按**“ ：“**（英文状态下的冒号），进入底线命令模式。

在底线命令模式下可以输入单个或多个字符的命令，可用的命令非常多。

在底线命令模式中，基本的命令有（已经省略了冒号）：

- q 退出程序
- w 保存文件

按**” ESC “ ** 键退出底线命令模式。



Vim工作模式：

`vim filename`进入`命令模式`

`i`进入`输入模式`

`esc`退出到`命令模式`

`:`命令模式下按冒号进入到`底线命令模式`

`:wq`保存并退出Vim



#### 常见命令：




