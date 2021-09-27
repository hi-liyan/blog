---
id: group-concat-max-length
title: Mysql修改GROUP_CONCAT函数最大长度
---

## 问题描述

通过角色ID查询菜单ID时，发现当查询的数据较多时，查询的结果被截取了：

```sql
SELECT r.role_id                roleId,
       r.role_name              roleName,
       r.remark,
       r.create_time            createTime,
       r.modify_time            modifyTime,
       GROUP_CONCAT(rm.menu_id) menuIds
FROM t_sys_role r
         LEFT JOIN t_sys_role_menu rm ON (r.role_id = rm.role_id)
WHERE 1 = 1
GROUP BY r.role_id;
```

查询出的`menuIds`字符长度超出了GROUP_CONCAT函数默认的长度限制（默认值：1024），导致查询内容被截取，丢失了一部分数据：

![image-20201214095540410](https://images.shiguangping.com//imgs/20201214095547.png)

### 

查询`GROUP_CONCAT`最大长度：

```sql
show variables like "%concat%"
```



## 解决办法

在Mysql配置文件上添加：

```
group_concat_max_len = 102400 # 你要的最大长度
```



或者执行SQL语句修改最大长度：

```sql
SET GLOBAL group_concat_max_len=102400;
SET SESSION group_concat_max_len=102400;
```

