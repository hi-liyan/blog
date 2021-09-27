---
id: frp-install
title: 内网穿透工具 -Frp
---

:::tip
Frp 是一款内网穿透软件，它由客户端和服务端两部分组成，客户端部署在要穿透的内网主机中，服务端一般部署在具有固定公网IP的服务器中，具体配置方式如下。
:::

## 准备工作

- 具有固定公网IP的主机（如阿里云、腾讯云主机）
- 主角：**Frp**工具，[下载地址](https://github.com/fatedier/frp/releases)
- 内网主机（要穿透的内网主机）


---

## 配置服务端（VPS）

### 下载Frp

Github地址：[https://github.com/fatedier/frp/releases](https://github.com/fatedier/frp/releases)

```bash
wget https://github.com/fatedier/frp/releases/download/v0.34.0/frp_0.34.0_linux_amd64.tar.gz
```

>*下载速度不理想可以先下载到本地，再上传到Linux服务器上*
>
>1、从服务器上下载文件
>
>```bash
>scp username@servername:/path/filename /var/www/local_dir（本地目录）
>```
>
>2、上传本地文件到服务器
>
>```bash
>scp /path/filename username@servername:/path
>```
>
>3、从服务器下载整个目录
>
>```bash
>scp -r username@servername:/var/www/remote_dir/（远程目录） /var/www/local_dir（本地目录）
>```
>
>4、上传目录到服务器
>
>```bash
>scp  -r local_dir username@servername:remote_dir
>```

**解压：**

```bash
tar -zxvf frp_0.34.0_linux_amd64.tar.gz
```

**进入目录：**

![image-20201006125017260](https://images.shiguangping.com/imgs/20201006125017.png)

目录中主要文件：

- `frps`：服务端可执行程序
- `frps.ini`：服务端配置文件
- `frps_full.ini`：服务端所有配置项

- `frpc`：客户端可执行程序
- `frpc.ini`：客户端配置文件
- `frpc_full.ini`：客户端所有配置项
- `LICENSE`：许可证



### 编辑`frps.ini`

```bash
vim frps.ini
```

配置文件：

```ini
[common]
# 服务端端口号
# 用于与客户端进行连接通信
bind_port = 7000

# 连接认证token(可选)
token = 12345678

# 访问内网主机的web服务时配置（可选）
vhost_http_port = 80
vhost_https_port = 443

# 仪表盘端口，只有设置了才能使用仪表盘（即后台）
dashboard_port = 81
# 仪表盘访问的用户名密码，如果不设置，则默认都是 admin
dashboard_user = admin
dashboard_pwd = admin
```

### 启动frps

```bash
screen -S frps ./frps -c frps.ini
```

:::tip
安装screen：

```bash
yum install screen
```
:::

使用快捷键Ctrl+A D(即按住Ctrl，依次再按A,D)，使程序在后台运行。

---

## 配置客户端（内网主机）

### 下载Frp

在内网主机中下载Frp，或通过本地上传：

```bash
wget https://github.com/fatedier/frp/releases/download/v0.34.0/frp_0.34.0_linux_amd64.tar.gz
```

**同服务端操作一样，解压后进入目录：**

### 编辑`frpc.ini`

配置文件：

```ini
[common]
# 服务端ip
server_addr = 121.197.190.123
# 服务端端口号
server_port = 7000
# 服务端设置的token
token = 12345678

[ssh]
type = tcp
# 本地服务端口号
local_port = 22
# 映射到服务端主机的端口号
remote_port = 6000
# 加密和压缩
use_encryption = true
use_compression = true
```

通过访问`远程主机IP:remote_port`来访问内网主机的`local_port`端口的服务。

例如在外网通过ssh连接到内网主机，`ssh -p 6000 121.197.190.123`来SSH连接到内网主机，*22端口是ssh的默认端口号*。

### 配置内网主机中要穿透的应用端口

对于内网主机上部署了如mysql数据库、redis缓存等服务也可以通过这种方式配置：

Mysql:

```ini
[mysql]
type = tcp
local_port = 3306
remote_port = 3306
use_encryption = true
use_compression = true
```

Redis:

```ini
[redis]
type = tcp
local_port = 6379
remote_port = 6379
use_encryption = true
use_compression = true
```

*远程主机使用的是阿里云或者腾讯云等虚拟主机，要在安全组规则中放行端口*

### 配置内网主机中要穿透的web服务

```ini
[web]
type = http
本地web服务IP地址和端口号
local_ip = 127.0.0.1
local_port = 9000
# 域名要解析到服务端主机IP
custom_domains = www.liyan.run
```

访问`www.liyan.run:80`可访问到内网中的9000端口服务。

*80端口是在服务端frps.ini中vhost_http_port配置。http默认端口号是80，访问时可省略*

### 启动frpc

```bash
screen -S frpc ./frpc -c frpc.ini
```



## 测试

```bash
ssh -p 6000 121.197.190.123
```

可以连接到内网主机，说明内网穿透成功。

---

详细的文档：

中文：[https://gitee.com/dengweiwen/frp](https://gitee.com/dengweiwen/frp)

英文：[https://github.com/fatedier/frp](https://github.com/fatedier/frp)

