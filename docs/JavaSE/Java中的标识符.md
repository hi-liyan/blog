---
id: Java中的标识符
title: 4. Java中的标识符
---

Java当中所有能够自己定义名字的地方，都叫标识符。如：**类名、变量名、方法名、接口名、枚举名**。

### 标识符的命名规则：

1. 标识符的组成：
   - 字母
   - 数字
   - 下划线 _
   - 美元符 $
2. 标识符开头不能为数字
3. 标识符中不能有空格
4. 标识符不能是Java的关键字



### 标识符的命名规范：

1. 定义名称要有意义，尽量使用英文单词，见名知义。

2. **类名**、**接口名**、**枚举名**要用大驼峰命名（每个单词首字母大写）

   ```java
   public class MyInformationAboutStudy{}
   ```

3. **变量名**、**方法名**要用小驼峰命名（第一个单词首字母小写，其余后面每个单词首字母均大写）

   ```java
   int myName;
   public static void myShow(){}
   public static void changeUI(){}
   ```

4. **常量名**每个单词字母大写，单词之间用下划线连接

   ```java
   int MY_INT
   int MY_INT_TEMP1
   ```

5. **包名使用域名的反写形式：

   `www.shiguangping.com` => `com.shiguangping.包名`

