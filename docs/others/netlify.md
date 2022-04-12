---
id: netlify
title: 静态页面托管服务 -Netlify
---

Github Pages已经凉凉了😓

[Netlify](https://app.netlify.com/)是一个提供静态网站托管的服务平台，可以持续部署，能够将托管在 GitHub，GitLab 等网站上的 Jekyll，Hexo，Hugo 等代码自动编译并生成静态网站。

<!--more-->

---

[https://app.netlify.com/](https://app.netlify.com/)

![image-20201007165401301](https://upyun.shiguangping.com/imgs/20201007165401.png)

选择使用GitHub账号登录，点击`New site from Git`：

![image-20201007165823158](https://upyun.shiguangping.com/imgs/20201007165823.png)

根据自己的托管平台，选择代码GitHub、GitLab或者BitBucket（这里以GitHub为例）：

![image-20201007165948780](https://upyun.shiguangping.com/imgs/20201007165948.png)

点击GitHub之后会弹出一个让你授权的窗口，给 Netlify 授权后，就会自动读取你 GitHub 的仓库：

![image-20201007170042761](https://upyun.shiguangping.com/imgs/20201007170042.png)

选择仓库后，Netlify 会自动识别到 Hexo，并填入相关信息，这时候只要无脑点击 `Deploy site`就可以：

![image-20201007170528878](https://upyun.shiguangping.com/imgs/20201007170528.png)

构建成功后设置自定义域名：

![image-20201007171404020](https://upyun.shiguangping.com/imgs/20201007171404.png)

填写域名：

![image-20201007171434450](https://upyun.shiguangping.com/imgs/20201007171434.png)

点击核实后添加域名：

![image-20201008092109409](https://upyun.shiguangping.com/imgs/20201008092109.png)

设置站点名称：

![image-20201008092206210](https://upyun.shiguangping.com/imgs/20201008092206.png)

自己的域名CNAME解析到这个site name。

![image-20201008092729100](https://upyun.shiguangping.com/imgs/20201008092729.png)

添加SSL证书，做HTTPS：

![image-20201008092926932](https://upyun.shiguangping.com/imgs/20201008092926.png)

开启强制HTTPS：

![image-20201008093007836](https://upyun.shiguangping.com/imgs/20201008093007.png)

---

![image-20201007171806439](https://upyun.shiguangping.com/imgs/20201007171806.png)

Netlify提供了自动化构建的功能，站点部署完成之后，每次push代码都会帮我们自动构建。在上面的页面可以查看到每次构建的信息。

---

**使用Netlify部署Gitbook**

在 build command 里，填入：`npm install -g gitbook-cli && gitbook install && gitbook build`

在 publish 目录填入： `_book/` 

