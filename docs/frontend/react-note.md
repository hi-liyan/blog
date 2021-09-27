---
id: react-note
title: React 语法
---

## 0、前言

**React**是由Facebook于2013年推出的前端开发框架。使用函数式编程风格，JSX表达式可以让我们在JS中编写UI界面，它也是全球范围内使用人数最多的前端开源框架。

这篇笔记是基于React 16进行编写，React 16也被称之为`React Fiber`。

我认为React的语法风格对后端开发者特别友好，当然这是我的个人看法。



### 参考

- [官方网站](https://reactjs.org)



## 一、React 基本使用

如何使用React JS呢？在项目中使用React JS一般有两种方式：

- 第一种是在HTML页面中通过`script`标签来引入React JS库，这也是传统的使用方式；
- 第二种是利用React脚手架来创建React项目，这也是现在常用的方式。



### 1.1 传统使用方式

1. 通过npm初始化前端项目。

   ```bash
   npm init
   ```

2. 进入项目根目录，安装react、react-dom库。

   ```bash
   npm i react react-dom
   ```

3. 在html页面内引入react相关的库。

   ```html
   <script src="./node_modules/react/umd/react.development.js"></script>
   <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
   ```

4. 创建react元素。

   ```javascript
   const title = React.createElement('h1',null,'我是一个H1标题')
   ```

   React.createElement()方法参数说明：

   - 第一个参数：要创建的标签名称；
   - 第二个参数：标签的属性，使用对象表示；
   - 第三个参数及其之后的参数：表示该元素的子节点。（可以设置多个）

5. 元素创建好之后，渲染元素到DOM挂载点。

   ```javascript
   ReactDOM.render(title, document.getElementById('root'))
   ```

   ReactDOM.render()方法参数说明：

   - 第一个参数：要渲染的元素；
   - 第二个参数：指定挂载点。



:::tip 代码示例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React基本使用</title>
</head>

<body>
    <div id="root"></div>
</body>
<!-- 1. 引入js文件 -->
<script src="./node_modules/react/umd/react.development.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>

<script>
    // 2. 创建react元素
    const title = React.createElement('h1',null,'我是一个H1标题')

    // 3. 渲染元素
    ReactDOM.render(title, document.getElementById('root'))

</script>

</html>
```

:::

页面效果：

![image-20210801203543888](https://images.shiguangping.com//imgs/image-20210801203543888.png)



### 1.2 React 脚手架

1. 使用`npx create-react-app`命令创建React项目。

   ```bash
   npx create-react-app my-app
   ```

   第一次创建会比较慢。创建好后，会生成如下图一样的项目结构：

   ![image-20210801204751580](https://images.shiguangping.com//imgs/image-20210801204751580.png)

