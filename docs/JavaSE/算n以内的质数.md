---
id: 算n以内的质数
title: 算n以内的质数
---

代码如下：

```java
package com.neu.test;

import java.util.Scanner;
/** 
 * @author liyan
 * 计算n以内的质数
 */
public class Demo7 {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.print("输入最大取值：");
		int num = sc.nextInt();	
		//编写一个方法，输出大于200的最小的质数。
		for(int i=2;i<num;i++) {
			int a = 1; //变量a做判断
			/*
			 * 内层循环i整除j，如果能被整除，变量a=0，跳出循环，继续外层循环
			 * 如果内存循环整除都不等于0，则变量a=1，执行外层循环内输出语句
			 */
			for(int j=2;j<i;j++) {
				if(i%j==0) {
					a=0;
					break;
				}	
			}
			if(a==1) {
				System.out.println(i);
			}
		}
	}
}

```

