---
id: CentOS安装Docker
title: CentOS安装Docker
---

## 1. 使用官方安装脚本自动安装

安装命令如下：

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

也可以使用国内 daocloud 一键安装命令：

```bash
curl -sSL https://get.daocloud.io/docker | sh
```

<br/>

## 2. 手动安装

除了上述的自动安装脚本外，还可以手动一步一步安装，步骤如下。

### 2.1 卸载旧版本

较旧的 Docker 版本称为 docker 或 docker-engine 。如果已安装这些程序，请卸载它们以及相关的依赖项。

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 2.2 安装 Docker Engine-Community

#### 2.2.1 使用 Docker 仓库进行安装

1. 安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。

    ```bash
    sudo yum install -y yum-utils device-mapper-persistent-data lvm2
    ```

2. 在新主机上首次安装 Docker Engine-Community 之前，需要设置 Docker 仓库。之后，您可以从仓库安装和更新 Docker。使用以下命令来设置稳定的仓库。

    使用官方源地址（比较慢）

    ```bash
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

    可以选择国内的一些源地址：

    阿里云

    ```bash
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

    清华大学源

    ```bash
    sudo yum-config-manager --add-repo https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
    ```


#### 2.2.2 安装 Docker Engine-Community

安装最新版本的 Docker Engine-Community 和 containerd，或者转到下一步安装特定版本：

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

如果提示您接受 GPG 密钥，请选是。

:::tip
**有多个 Docker 仓库吗？**

如果启用了多个 Docker 仓库，则在未在 yum install 或 yum update 命令中指定版本的情况下，进行的安装或更新将始终安装最高版本，这可能不适合您的稳定性需求。
:::

Docker 安装完默认**未启动**。并且已经创建好 docker 用户组，但该用户组下没有用户。

<br/>

要安装特定版本的 Docker Engine-Community，请在存储库中列出可用版本，然后选择并安装：

1. 列出并排序您存储库中可用的版本。此示例按版本号（从高到低）对结果进行排序。

    ```bash
    yum list docker-ce --showduplicates | sort -r
    ```

    ```
    docker-ce.x86_64  3:18.09.1-3.el7           docker-ce-stable
    docker-ce.x86_64  3:18.09.0-3.el7           docker-ce-stable
    docker-ce.x86_64  18.06.1.ce-3.el7           docker-ce-stable
    docker-ce.x86_64  18.06.0.ce-3.el7           docker-ce-stable
    ```

2. 通过其完整的软件包名称安装特定版本，该软件包名称是软件包名称（docker-ce）加上版本字符串（第二列），从第一个冒号（:）一直到第一个连字符，并用连字符（-）分隔。例如：docker-ce-18.09.1。

    ```bash
    sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
    ```



### 2.3 启动 Docker

Docker 安装完后默认是未启动的，通过下面的命令启动 Docker：

```bash
sudo systemctl start docker
```

停止 Docker：

```bash
sudo systemctl stop docker
```

查看 Docker 版本：

```bash
docker -v
```

<br/>

## 3. 卸载Docker

查询包含`docker`的软件列表

```bash
yum list installed | grep docker
```

![image-20201129124331166](https://upyun1.surcode.cn/imgs/20201129124331.png)

移除Docker

```bash
yum -y remove containerd.io.x86_64
yum -y remove docker-ce.x86_64
```

