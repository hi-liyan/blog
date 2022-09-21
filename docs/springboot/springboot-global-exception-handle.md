---
id: springboot-global-exception-handle
title: SpringBoot 统一异常处理
---

## 统一返回数据接口

### 定义接口返回数据结构

```json
{
  "code": 0,
  "message": "SUCCESS",
  "data": {}
}
```



### 数据接口字段模型定义

```java
package net.pjsk.demo.domain;

import lombok.Data;

/**
 * 接口返回数据模型
 *
 * @author liyan
 * @date 2021.2.19
 */
@Data
public class Result<T> {

    private Integer code;

    private String message;

    private T data;
}
```



### 封装接口返回方法（成功、失败）

````java
package net.pjsk.demo.util;

import cn.hutool.core.util.ObjectUtil;
import net.pjsk.demo.domain.Result;

/**
 * 封装接口返回方法
 *
 * @author liyan
 * @date 2021.2.19
 */
public class ResultUtil {

    /**
     * 成功
     *
     * @param data
     * @return
     */
    public static Result success(Object data) {
        Result result = new Result();
        result.setCode(0);
        result.setMessage("SUCCESS");
        if (data != null) {
            result.setData(data);
        }
        return result;
    }

    /**
     * 成功(无需返回数据)
     *
     * @return
     */
    public static Result success() {
        return success(null);
    }

    /**
     * 失败
     *
     * @param code
     * @param message
     * @return
     */
    public static Result error(Integer code, String message) {
        Result result = new Result();
        result.setCode(code);
        result.setMessage(message);
        return result;
    }
}
````



## 统一异常处理

### 状态消息枚举

```java
package net.pjsk.demo.enums;

/**
 * 状态消息枚举
 *
 * @author liyan
 * @date 2021.2.19
 */

public enum MessageEnum {

    SYSTEM_ERROR(1001,"系统错误"),
    NAME_EXCEEDED_CHARRACTER_LIMIT(2000, "姓名超过了限制，最大4个字符!");

    private Integer code;
    private String message;

    MessageEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
```



### 自定义异常类

```java
package net.pjsk.demo.exception;

import net.pjsk.demo.enums.MessageEnum;

/**
 * 自定义异常类
 *
 * @author liyan
 * @date 2021.2.19
 */
public class UserException extends RuntimeException{

    private Integer code;

    public UserException(MessageEnum messageEnum){
        super(messageEnum.getMessage());
        this.code = messageEnum.getCode();
    }

    public Integer getCode(){
        return code;
    }

    public void setCode(Integer code){
        this.code = code;
    }
}
```



### @ControllerAdvice 统一处理异常

```java
package net.pjsk.demo.handler;

import net.pjsk.demo.domain.Result;
import net.pjsk.demo.exception.UserException;
import net.pjsk.demo.util.ResultUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 统一处理异常
 *
 * @author liyan
 * @date 2021.2.19
 */
@ControllerAdvice
public class ExceptionHandle {

    private final static Logger logger = LoggerFactory.getLogger(ExceptionHandle.class);

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result handle(Exception e) {
        logger.info("进入error");

        if (e instanceof UserException) {
            UserException userException = (UserException) e;
            return ResultUtil.error(userException.getCode(), userException.getMessage());
        } else {
            logger.error("系统异常 {}", e);
            return ResultUtil.error(1000, "系统异常");
        }
    }


}
```



## 测试

```java
package net.pjsk.demo.controller;

import net.pjsk.demo.dao.UserDao;
import net.pjsk.demo.domain.Result;
import net.pjsk.demo.domain.User;
import net.pjsk.demo.enums.MessageEnum;
import net.pjsk.demo.exception.UserException;
import net.pjsk.demo.util.ResultUtil;
import org.springframework.web.bind.annotation.*;

/**
 * @author liyan
 * @date 2021.2.19
 */
@RequestMapping("/user")
@RestController
public class UserController {

    /**
     * 获取用户列表
     *
     * @param exception
     * @return
     */
    @GetMapping("/{exception}")
    public Result<?> getUserList(@PathVariable("exception") Boolean exception) {
        if (exception) {
            // 手动设置一个除零异常
            int a = 1 / 0;
        }
        return ResultUtil.success(UserDao.getUserList());
    }

    /**
     * 新增用户
     *
     * @param user
     * @return
     */
    @PostMapping
    public Result<?> addUser(@RequestBody User user) {
        if (user.getName().length() > 4) {
            throw new UserException(MessageEnum.NAME_EXCEEDED_CHARRACTER_LIMIT);
        }
        UserDao.add(user);
        return ResultUtil.success();
    }

}
```



### 测试正常返回及发生异常

正常返回：

![image-20210220000657896](https://upyun1.surcode.cn/imgs/20210220000658.png)

发生异常：

![image-20210220000756723](https://upyun1.surcode.cn/imgs/20210220000756.png)



### 测试自定义异常

![image-20210220000839465](https://upyun1.surcode.cn/imgs/20210220000839.png)