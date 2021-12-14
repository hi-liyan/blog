---
id: stored-procedure-oracle
title: 基于Oracle数据库存储过程的创建及调用
---

## 概念和目的

**什么是PLSQL？**

1. PL/SQL（Procedure Language/SQL）
2. PLSQL是Oracle对SQL语言的过程化扩展（类似Basic）
3. 指在SQL命令语言中增加过程处理语句（如分支、循环等），使SQL语言具有过程处理能力。



## 程序结构

通过PL/SQL Developer工具的`Test Window`工具创建程序模板，或者通过SQL语句在`SQL Window`中编写。

PLSQL中大小写不敏感。

PL/SQL可以分TT三部分：声明部分，可执行部分，异常处理部分。

```plsql
-- Created on 2021/3/15 by ADMINISTRATOR
DECLARE
	-- 声明变量、游标
	I INTEGER;
BEGIN
	-- 执行语句
	
	-- [异常处理]
END;
```

其中，`DECLARE`是变量、游标（结果集类型变量）声明的部分，如果程序中无变量声明，这部分可以省略。



## Hello World

```plsql
-- Created on 2021/3/15 by ADMINISTRATOR
BEGIN
	-- 输出Hello World
	DBMS_OUTPUT.PUT_LINE('Hello World');
END;
```

其中`DBMS_OUTPUT`是Oracle内置的程序包，相当于Java中的`System.out`。而`PUT_LINE()`是调用的方法，相当于`println()`方法。



在命令行中（sqlplus）执行，需要在程序的最后敲一个`/`斜杠，标识整个程序的结束 。

命令行中默认输出是关闭的，通过`set serveroutput on`开启输出功能。



## 变量

PLSQL编程中，常见的变量有两大类：

1. 普通数据类型(char/varchar2/date/number/boolean/long)
2. 特殊变量类型（引用型变量、记录型变量）



声明变量的方式：

```plsql
-- 变量名 变量类型 （变量长度）
v_name varchar(20);
```



### 普通变量

变量赋值的方式有两种：

1. 直接赋值语句 `:=`
2. 语句赋值，使用`select ... into ...`赋值。（select 值 into 变量）



【示例】打印个人信息：姓名、薪水、地址。

```plsql
DECLARE
  -- 姓名(声明变量时直接赋值)
  v_name varchar2(20) := '李达康';

  -- 薪水
  v_sal number;

  -- 地址
  v_addr varchar2(200);
BEGIN
  -- 在程序中直接赋值
  v_sal := 2000;

  -- 语句赋值
  SELECT '辽宁盘锦' INTO v_addr FROM dual;

  -- 打印输出
  DBMS_OUTPUT.PUT_LINE('姓名：' || v_name || ',薪水：' || v_sal || ',地址：' ||
                       v_addr);
END;

```



### 引用型变量

变量类型的长度取决于表中字段的类型和长度。

通过`表名.字段名%TYPE`的形式指定变量的类型，如`v_name emp.ename%TYPE;`。



【示例】查询emp表中7839号员工的姓名及薪水。

```plsql
DECLARE
	v_name emp.ename%TYPE;
	v_sal emp.sal%TYPE;
	
BEGIN
	-- 查询表中的姓名和薪水，并赋值给变量
	-- 注意：查询的字段和赋值的变量的顺序、个数、类型都要一致
	SELECT ename,sal INTO v_name,v_sal FROM emp WHERE empno = 7839;
	
	DBMS_OUTPUT.PUT_LINE('姓名：' || v_name || ',薪水：' || v_sal);
	
END;
```



**使用引用变量的好处：**

不使用引用变量，则需要提前知道数据表中字段的类型及长度。而使用引用型变量则无需考虑这一问题。



### 记录型变量

接收一整行的数据，类似于Java中的一个实体对象。

语法：

```plsql
-- 变量名 表名%ROWTYPE;
v_emp emp%ROWTYPE;
```



【示例】查询工号为7839的员工信息，并打印输出姓名和薪水。

```plsql
DECLARE
	v_emp emp%ROWTYPE;
	
BEGIN
	
	SELECT * INTO v_emp FROM emp WHERE empno = 7839;
	
	DBMS_OUTPUT.PUT_LINE('姓名：' || v_emp.ename || ',薪水：' || v_emp.sal);
	
END;
```

**注意：记录型变量只能接收一个完整的行数据，而不是某一行的某几个字段。**



## 流程控制

### 条件分支

语法结构：

```plsql
BEGIN
	
	IF 条件1 THEN 执行1
	
	ELSIF 条件2 THEN 执行2
	
	ELSE 执行3
	
	END IF;

END;
```



【示例】判断员工表中数据的条数。

```plsql
DECLARE
  v_count NUMBER;

BEGIN

  -- 查询计数
  SELECT count(1) INTO v_count FROM emp;

  IF v_count > 20 THEN
    DBMS_OUTPUT.put_line('EMP表中的记录数大于20，共：' || v_count);
  ELSIF v_count >= 10 THEN
    DBMS_OUTPUT.put_line('EMP表中的记录数在10-20之间，共：' || v_count);
  ELSE
    DBMS_OUTPUT.put_line('EMP表中的记录数小于10，共：' || v_count);
  END IF;

END;

```



### 循环

在Oracle中有三种循环方式，这里只介绍一种，叫`loop循环`。

语法结构：

```plsql
BEGIN
	
	LOOP
		
		EXIT WHEN 退出的条件
		
	END LOOP;

END;
```



【示例】输出1-10。

```plsql
-- Created on 2021/3/16 by ADMINISTRATOR 
declare
  -- 声明循环变量并赋值
  i number := 1;
begin
  
  -- loop循环结构
  loop
     
    -- 退出条件
    exit when i > 10;
  
    dbms_output.put_line(i);
    
    -- 自增
    i := i + 1;
  
  end loop;

end;
```



## 游标

### 什么是游标？

用于临时存储一个查询返回的多行数据（结果集，类似于Java中JDBC连接返回的ResultSet）。通过遍历游标，可以逐行访问处理该结果集的数据。



游标的使用方式：声明 -> 打开 -> 读取 -> 关闭



### 语法

**游标声明**

```plsql
CURSOR 游标名[(参数列表)] IS 查询语句;
```



**游标打开**

```plsql
open 游标名;
```



**游标读取**

```plsql
FETCH 游标名 INTO 变量列表;
```



**关闭游标**

```plsql
CLOSE 游标名;
```



### 游标的属性

| 游标的属性 | 返回值类型 | 说明                                        |
| ---------- | ---------- | ------------------------------------------- |
| %ROWCOUNT  | 整型       | 获得FETCH语句返回的行数                     |
| %FOUND     | 布尔值     | 最近的FETCH语句返回一行数据则为真，否则为假 |
| %NOTFOUNT  | 布尔值     | 与%FOUNT相反                                |
| %ISOPEN    | 布尔值     | 游标已经打开时，值为真                      |

其中，`%NOTFOUNT`是在找不到元素时返回为真，一般用作循环遍历时退出的判断条件。



【示例】使用游标查询员工的姓名和薪资。

```plsql
DECLARE
  -- 1. 声明游标并赋值
  CURSOR c_emp IS
    SELECT ename, sal FROM emp;
  
  -- 声明变量接收游标中的数据
  v_name emp.ename%TYPE;
  sal    emp.sal%TYPE;

BEGIN
  -- 2. 打开游标
  OPEN c_emp;

  LOOP
    
    -- 3. 读取游标数据到变量
    FETCH c_emp
      INTO v_name, sal;
  	
  	-- 最近一次fetch没有值时，返回true
    EXIT WHEN c_emp%NOTFOUND;
  
    dbms_output.put_line(v_name || ',' || sal);
  
  END LOOP;
  
  -- 4. 关闭游标
  CLOSE c_emp;

END;

```



### 	带参数的游标

【示例】查询员工的姓名和薪资，指定查询的员工编号。

```plsql
DECLARE
  -- 1. 声明带参数的游标并赋值
  CURSOR c_emp(v_no emp.eno%TYPE) IS
    SELECT ename, sal FROM emp WHERE emp.eno = v_no;
  
  -- 声明变量接收游标中的数据
  v_name emp.ename%TYPE;
  sal    emp.sal%TYPE;

BEGIN
  -- 2. 打开游标，输入值
  OPEN c_emp(4);

  LOOP
    
    -- 3. 读取游标数据到变量
    FETCH c_emp
      INTO v_name, sal;
  
    EXIT WHEN c_emp%NOTFOUND;
  
    dbms_output.put_line(v_name || ',' || sal);
  
  END LOOP;
  
  -- 4. 关闭游标
  CLOSE c_emp;

END;

```



# 存储过程

## 概念和作用

**存储过程概念：**

PLSQL变成可以进行表的操作、判断、循环裸机处理的工作，但无法重复调用。

可以理解为代码都写到了main方法中，是匿名程序。Java可以通过封装对象和方法来解决代码服用的问题。

PLSQL是将一个个PLSQL的业务处理过程存储起来进行服用，这些被存储起来的PLSQL程序称之为存储过程。



**存储过程作用：**

1. 在开发程序中，为了一个特定的业务功能，会向数据库进行多次连接关闭（连接和关闭是非常消耗资源的），需要对数据库进行多次I/O操作，性能比较低。如果把这些业务放到PLSQL中，在应用程序中只需要调用PLSQL就可以做到连接关闭一次数据库就可以实现我们的业务，大大提高效率。
2. Oracle官方的建议：能够让数据库操作的不要放在程序中，在数据库中实现基本不会出现错误，在程序中操作可能会存在错误。（如果在数据库中操作数据，可以有一定的日志恢复等功能）



## 语法

```plsql
CREATE OR REPLACE PROCEDURE 过程名称[(参数列表)] IS

BEGIN
  
END [过程名称];
```



## 无参存储