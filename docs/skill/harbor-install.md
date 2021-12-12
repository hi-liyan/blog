---
id: harbor-install
title: Harbor 搭建私有 Docker 镜像库
---

在本地环境下（或者公司局域网），将Docker镜像推送到Docker Hub速度比较慢，推荐的做法是安装一个第三方的Docker镜像仓库，这里推荐使用Harbor。Harbor是一款开源的Docker镜像存储仓库，其扩展了Docker Distribution，在此基础上添加了我们常用的功能，比如安全认证，RBAC用户权限管理，可视化页面操作等功能。

## 安装Harbor

登陆到服务器，在服务器上新建并切换到`harbor`目录：

``` bash
mkdir /opt/harbor
cd /opt/harbor
```

下载harbor离线包：

离线包仓库地址，[https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases)，tgz文件右键复制链接地址，粘贴到服务器终端下载：

```bash
wget https://github.com/goharbor/harbor/releases/download/v2.1.1/harbor-offline-installer-v2.1.1.tgz
```

下载后解压：

```bash
tar -zxvf harbor-offline-installer-v2.1.1.tgz
```

解压后进入harbor目录，修改`harbor.yml`配置文件：

```bash
cd harbor
vim harbor.yml
```

将`hostname`修改为宿主机IP：

![image-20201130224414488](https://images.shiguangping.com//imgs/20201130224414.png)

如果当前docker容器中已经存在Redis容器，则需要在harbor.yml中配置Redis，否则安装时会出错，提示已经存在Redis容器。*

![image-20201101151002963](https://images.shiguangping.com//imgs/20201101151003.png)

*（Redis主机地址不要使用localhost，如果访问不了可能会导致`harbor-jobservice`等服务无法启动。）*



安装前提，服务器需要安装docker、docker compose，否则会安装失败。修改好配置文件后，执行当前目录下的`install.sh`脚本进行安装：

```bash
sh install.sh
# 或者
./install.sh
```



安装成功后，使用浏览器访问`localhost:7888`：

![image-20201101151221741](https://images.shiguangping.com//imgs/20201101151221.png)

默认的用户名：`admin`，密码：`Harbor12345`。

