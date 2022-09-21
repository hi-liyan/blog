---
id: springboot-jenkins-cicd
title: Jenkins构建部署微服务项目
---

:::tip
通过Gitlab、Jenkins、Harbor、Docker部署Spring Cloud微服务项目，本文使用Mrbird的开源项目[FEBS微服务权限系统](https://gitee.com/mrbirdd/)进行演示演示。（项目启动需要Nacos、Mysql）

- Gitlab :开源的Git仓库
- Jenkins :使用Java开发的CI/CD工具
- Harbor :Docker镜像仓库
- Docker :容器化
:::

## 准备工作

Gitlab搭建：[https://www.shiguangping.com/posts/docker-install-gitlab.html](https://www.shiguangping.com/posts/docker-install-gitlab.html)

Harbor搭建：[https://www.shiguangping.com/posts/harbor-install.html](https://www.shiguangping.com/posts/harbor-install.html)

Jenkins搭建：[https://www.shiguangping.com/posts/docker-install-jenkins.html](https://www.shiguangping.com/posts/docker-install-jenkins.html)



整个搭建过程分为两大部分：

- Jenkins 构建镜像
- Docker 部署服务



## 一、构建镜像

登陆Harbor，创建名为"febs"项目，Jenkins构建好的镜像都放到febs项目下。

![image-20201123234440416](https://upyun1.surcode.cn/imgs/20201123234440.png)

可以创建一个名为`jenkins`的用户，并在项目中添加该用户，专门用于Jenkins登陆并推送镜像使用。

---

打开后端项目，在`febs-cloud`根目录下编写以下脚本：

![image-20201123232417184](https://upyun1.surcode.cn/imgs/20201123232417.png)

pipline脚本：

:::tip Jenkinsfile

```groovy
#!groovy
pipeline {
	agent none

	parameters {
		choice(
				description: '你需要选择哪个模块进行构建 ?',
				name: 'modulename',
				choices: ['1:all', '8:system', '4:gateway', '5:auth', '2:monitor-admin', '3:tx-manager', '6:job', '7:generator']
		)

		choice(
				description: '你需要选择哪个环境进行构建 ?',
				name: 'profile',
				choices: ['development', 'testing', 'production']
		)

		string(
				description: '你要构建的版本 ?',
				name: 'pversion',
				defaultValue: '1.0.0',
		)
	}

	stages {
		stage('Build docker') {
			agent any
			environment {
				ACCESS_DOCKER = credentials('docker-register')
				REGISTRY_URL = 'localhost:7888'
			}
			steps {
				sh "docker login -u ${ACCESS_DOCKER_USR} -p ${ACCESS_DOCKER_PSW} ${REGISTRY_URL}"
				sh "febs-cloud/jenkins-deploy.sh -p ${params.modulename} -e ${params.profile} -v ${params.pversion}"
			}
		}
	}
}
```

:::

Jenkins构建脚本：

:::tip jenkins-deploy.sh

```bash
#!/bin/bash
##
## Jenkins 部署脚本
##
## Started on 2020/11/22 Liyan <18525589998@163.com>
## Last update 2020/11/22 Liyan <18525589998@163.com>
##

set -e

version="1.0.0"

# Colours
red="\033[91m"
green="\033[92m"
yellow="\033[93m"
magenta="\033[95m"
cyan="\033[96m"
none="\033[0m"

# 项目ID
project_id=""

# 环境：development, testing, production
profile_name=""

# 构建版本：1.0.0
project_version="1.0.0"

# 模块相对项目根路径
modules_path=(
  all
  febs-apm/febs-admin
  febs-tx-manager
  febs-gateway
  febs-auth
  febs-server/febs-server-job
  febs-server/febs-server-generator
  febs-server/febs-server-system
)

# 镜像仓库名
register_names=(
  all
  febs-admin
  febs-tx-manager
  febs-gateway
  febs-auth
  febs-server-job
  febs-server-generator
  febs-server-system
)

# 镜像版本由 init 生成，如：febs-auth-server:1.0.0-SNAPSHOT
image_tags=(
  all
)

# 定义环境和镜像 tag 后缀映射
declare -A image_tag_suffix_map=(["development"]="DEV" ["testing"]="SNAPSHOT" ["production"]="RELEASE")
# declare -A maven_profile_map=(["development"]="dev" ["testing"]="test" ["production"]="prod")
# 暂时处理，选择开发环境使用测试环境构建
declare -A maven_profile_map=(["development"]="test" ["testing"]="test" ["production"]="prod")

# 脚本执行工作路径
work_path=$(
  cd "$(dirname "$0")";
  pwd
)

# 项目根目录
project_root_path=$(
  cd $work_path;
  cd ..;
  pwd
)

# docker 镜像仓库地址
docker_registry_uri="localhost:7888/febs"
docker_file_path="${work_path}/Dockerfile"

init() {

	# 截取字符 10:aid-abc -> 10
	project_id=${project_id%%:*}

	# 映射 maven 环境
	maven_profile="${maven_profile_map[$profile_name]}"

	# 根据环境映射镜像tag
  for ((i = 1; i < ${#register_names[@]}; i++)); do
    ImageTag=${project_version}
    image_tags[$i]="${ImageTag}-${image_tag_suffix_map[$profile_name]}"
  done
}

error() {
  echo -e "\n$red 输入错误！$none\n"
  exit 1
}

pause() {
  read -rsp "$(echo -e "按${green} Enter 回车键 ${none}继续...或按${red} Ctrl + C ${none}取消.")" -d $'\n'
  echo
}

show_projects() {
  for ((i = 1; i <= ${#register_names[*]}; i++)); do
    Item="${register_names[$i - 1]}"
    if [[ "$i" -le 9 ]]; then
      # echo
      echo -e "$yellow  $i. $none${Item}"
    else
      # echo
      echo -e "$yellow $i. $none${Item}"
    fi
  done
}

show_deploy_projects() {
  for ((i = 1; i <= ${#image_tags[*]} - 1; i++)); do
    ItemTag="${image_tags[$i]}"
    ItemName="${register_names[$i]}"
    echo -e "$cyan ${docker_registry_uri}/${ItemName}:${ItemTag}$none"
  done
}

show_confirm_deploy() {
  echo "=============================="
  echo -e "$yellow 即将部署 $none"
  echo
  if test $project_id -eq 1; then
    show_deploy_projects
  else
    echo -e "$cyan ${docker_registry_uri}/${register_names[project_id - 1]}:${image_tags[$project_id - 1]}$none"
  fi
  echo
  echo "=============================="

#  # 提示
#  pause
#
  # 部署
  deploy
}

deploy() {

  # 部署所有项目
  if test $project_id -eq 1; then
		# 构建所有模块
#		mvn clean install -Dmaven.test.skip=true -P${maven_profile}
		mvn clean install -Dmaven.test.skip=true

    for ((i = 1; i <= ${#image_tags[*]} - 1; i++)); do
      ItemTag="${image_tags[$i]}"
      ItemName="${register_names[$i]}"
      RegisterName="${register_names[$i]}"
      ProjectPath=${project_root_path}/${modules_path[$i]}

      # 构建 docker 镜像并推送到镜像仓库
      docker build -t "${docker_registry_uri}/${RegisterName}:${ItemTag}" -f ${docker_file_path} ${ProjectPath}
      docker push "${docker_registry_uri}/${RegisterName}:${ItemTag}"

    done
  else

    # 部署选择的项目
    ItemTag="${image_tags[$project_id - 1]}"
    ItemName="${register_names[project_id - 1]}"
    RegisterName="${register_names[project_id - 1]}"
		ProjectPath=${project_root_path}/${modules_path[project_id - 1]}

		# 构建指定模块
#		mvn clean install -Dmaven.test.skip=true -pl :${RegisterName} -am -P${maven_profile}
		mvn clean install -Dmaven.test.skip=true -pl :${RegisterName} -am

    # 构建 docker 镜像并推送到镜像仓库
    docker build -t "${docker_registry_uri}/${RegisterName}:${ItemTag}" -f ${docker_file_path} ${ProjectPath}
    docker push "${docker_registry_uri}/${RegisterName}:${ItemTag}"
  fi
  echo
  echo -e "${green}===============部署成功===============${none}"
  echo
}

run() {

  # clear
  echo
  while :; do
    echo -e "请选择要部署的项目 [${magenta}1-${#register_names[*]}$none]"
    echo

    # 显示所有项目
    show_projects

    # 读取用户输入
    # read -p "$(echo -e "(默认: ${cyan}all$none)"):" project_id

    pwd

    # project_id=1

    case $project_id in
    [1-9]|1[0-9])
      echo
      echo -e "$yellow 已选择 $cyan${register_names[$project_id - 1]}$none"
      break
      ;;
    *)
      error
      ;;
    esac
  done

  # 显示确认部署信息
  show_confirm_deploy
}

usage() {
  echo -e "$red Usage:`basename $0` -p [Project ID] -e [development | testing | production] -v [Build Version]$none"
  echo -e "$red `basename $0` -p 1:xxx -e testing -v 1.0.0 $none"

  show_projects

  exit 1
}

# 获取输入参数
while getopts "hp:e:v:" opt; do
  case $opt in
  h)
    usage
    ;;
  p)
    project_id=$OPTARG
    ;;
  e)
    profile_name=$OPTARG
    ;;
  v)
    project_version=$OPTARG
    ;;
  ?)
    usage
    ;;
  esac
done

# 检查输入参数
echo $*
if [ $# == 0 ]; then
  usage
fi

if [[ -z $project_id || -z $profile_name ]]; then
  usage
fi

# 进入工作目录
cd $work_path

# 初始化
init

# 开始执行
run
```

:::

Dockerfile：

:::tip Dockerfile

```dockerfile
FROM openjdk:8-jre-alpine as builder

WORKDIR application
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# 提取分层信息
RUN java -Djarmode=layertools -jar app.jar extract

# 第二阶段
# FROM adoptopenjdk/openjdk8
FROM openjdk:8-jre-alpine

# apk 镜像源
#RUN echo -e "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.9/main\n\
#https://mirror.tuna.tsinghua.edu.cn/alpine/v3.9/community" > /etc/apk/repositories

# 安装字体库，easyexcel 依赖
RUN apk --update add ttf-dejavu && \
      rm -rf /var/cache/apk/*

WORKDIR application

# 制作镜像层
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
COPY --from=builder application/snapshot-dependencies/ ./
COPY --from=builder application/application/ ./

ENV TZ="Asia/Shanghai" PORT=80 JAVA_OPTS=" " SPRING_OPTS=" "

VOLUME ["/log", "/agent"]

EXPOSE $PORT

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom org.springframework.boot.loader.JarLauncher ${SPRING_OPTS}"]
```

:::

脚本中的仓库地址替换成实际的镜像仓库地址，脚本编辑好后将项目推送到Gitlab上。

---

登陆Jenkins，系统管理 -> 凭证管理中添加Gitlab凭证，为了后面Jenkins可以登陆Gitlab并拉取项目代码。（如果系统管理中没有`Manager Credentials`,则需要到插件管理中安装该插件）

![image-20201123232847835](https://upyun1.surcode.cn/imgs/20201123232847.png)

添加凭证：

![image-20201123233159466](https://upyun1.surcode.cn/imgs/20201123233159.png)

*如果要构建的是Gitlab中的私有项目，要确保该账号已经添加到项目中，并有权限拉取代码。*

添加Harbor登陆凭证，用于登陆并推送镜像，配置同上：

![image-20201123234236275](https://upyun1.surcode.cn/imgs/20201123234236.png)

凭证添加完后，回到Jenkins主页面，**新建任务**，输入项目名，选择创建**多分支流水线**：

![image-20201123233625601](https://upyun1.surcode.cn/imgs/20201123233625.png)

在配置中添加**分支源**：

![image-20201123233831854](https://upyun1.surcode.cn/imgs/20201123233831.png)

向下拉，在**Build Configuration**配置项添加Jenkinsfile脚本路径：

![image-20201123233936648](https://upyun1.surcode.cn/imgs/20201123233936.png)

最后，点击保存。这时Jenkins会开始扫描多分支流水线，执行登陆仓库拉取代码，扫描仓库中的每一个分支，寻找Jenkinsfile脚本文件。

![image-20201122105302155](https://upyun1.surcode.cn/imgs/20201122105302.png)

扫描完成之后，回到Jenkins首页，会在面板上看到刚刚添加的`FEBS-Cloud`任务：

![image-20201123235834687](https://upyun1.surcode.cn/imgs/20201123235834.png)

点进去之后选择dev分支，点击左侧`Build with Parameters`，开始构建镜像。构建出现问题，可以查看日志，找到问题发生的步骤以及原因。

---

打开febs-cloud-web项目，编写脚本文件：

![image-20201124000634274](https://upyun1.surcode.cn/imgs/20201124000634.png)

Jenkins脚本：

:::tip Jenkinsfile

```groovy
#!groovy
pipeline {
	agent any

	parameters {
		choice(
				description: '你需要选择哪个环境进行构建 ?',
				name: 'profile',
				choices: ['development', 'testing', 'production']
		)

		string(
				description: '你要构建的版本 ?',
				name: 'pversion',
				defaultValue: '1.0.0',
		)

		choice(
				description: '是否强制安装依赖？',
				name: 'install',
				choices: ['0', '1']
		)
	}

	stages {
		stage('Build docker') {
			environment {
				ACCESS_DOCKER = credentials('docker-register')
				REGISTRY_URL = 'localhost:7888'
				PROJECT_NAME = 'febs-cloud-web'
			}
			steps {
				sh "docker login -u ${ACCESS_DOCKER_USR} -p ${ACCESS_DOCKER_PSW} ${REGISTRY_URL}"
				sh "./scripts/jenkins-deploy.sh -p ${PROJECT_NAME} -e ${params.profile} -v ${params.pversion} -i ${params.install}"
			}
		}
	}
}
```

:::

jenkins-deploy.sh脚本：

:::tip jenkins-deploy.sh

```bash
#!/bin/bash
##
## 自动化构建部署脚本
##
## Started on 2020/11/22 Liyan <18525589998@163.com>
## Last update 2020/11/22 Liyan <18525589998@163.com>
##

set -e

version="1.0.0"

# Colours
red="\033[91m"
green="\033[92m"
yellow="\033[93m"
magenta="\033[95m"
cyan="\033[96m"
none="\033[0m"

# 项目名称
project_name=""

# 环境：development, testing, production
profile_name=development

# 构建版本：1.0.0
project_version=1.0.0

# 强制安装依赖
install_dependencies=0

usage() {
  echo -e "$red Usage:`basename $0` -p [Project Name] -e [development | testing | production] -v [Build Version] | -i [install]$none"

  exit 1
}

# 获取输入参数
while getopts "hp:e:v:i:" opt; do
  case $opt in
  h)
    usage
    ;;
  p)
    project_name=$OPTARG
    ;;
  e)
    profile_name=$OPTARG
    ;;
  v)
    project_version=$OPTARG
    ;;
  i)
    install_dependencies=$OPTARG
    ;;
  ?)
    usage
    ;;
  esac
done

# 检查输入参数
echo $*
if [ $# == 0 ]; then
  usage
fi

if [ -z $project_name ]; then
  usage
fi

# 脚本执行工作路径
work_path=$(
  cd "$(dirname "$0")";
  pwd
)
project_path=$(
  cd "$work_path";
  cd ../;
  pwd
)

# docker 镜像仓库地址
docker_registry_uri="localhost:7888/febs"
docker_file_path="${project_path}/Dockerfile"

# 定义环境和镜像 tag 后缀映射
declare -A image_tag_suffix_map=(["development"]="dev" ["testing"]="staging" ["production"]="release")
declare -A profile_map=(["development"]="stage" ["testing"]="stage" ["production"]="prod")

# 镜像tag
image_tag="${project_version}-${image_tag_suffix_map[$profile_name]}"

# 执行环境
profile="${profile_map[$profile_name]}"

# 镜像地址
image_path="${docker_registry_uri}/${project_name}:${image_tag}"

# package 签名
package_lock="${project_path}/package-lock.json"
package_md5_file="${work_path}/package-md5"
touch $package_md5_file
package_md5=$(head -n 1 ${package_md5_file})
package_md5_changed=0

# 校验 package 版本
check_version() {
  echo -e "$cyan ==========比较依赖版本========== $none"

  current_package_md5=$(md5sum ${package_lock} | cut -d" " -f 1)

  echo -e "$cyan prev: ${package_md5} current: ${current_package_md5}  $none"

  if [ "$current_package_md5" != "$package_md5" ]; then
    echo -e "$cyan ==========依赖有变化========== $none"
    echo $current_package_md5 >${package_md5_file}
    package_md5_changed=1
  else
    echo -e "$cyan ==========依赖无变化========== $none"
  fi
}

deploy() {
  echo "=============================="
  echo -e "$yellow 即将部署 $none"
  echo
  echo -e "$cyan ${image_path} $none"
  echo
  echo "=============================="

  check_version

  if [[ $package_md5_changed -eq 1 || $install_dependencies -eq 1 ]]; then
    echo -e "$cyan ==========安装依赖========== $none"
    pwd

    # 安装依赖
    npm install --registry=https://registry.npm.taobao.org --unsafe-perm=true --allow-root
  fi

  echo -e "$cyan ==========开始构建========== $none"
  pwd

  # 打包
  npm run build:${profile}

  echo -e "$cyan ==========开始构建镜像文件========== $none"
  # 构建镜像
  docker build -t "${image_path}" -f ${docker_file_path} ${project_path}

  echo -e "$cyan ==========发布镜像========== $none"
  # 发布镜像
  docker push ${image_path}

  echo
  echo -e "${green}===============部署成功===============${none}"
  echo

}

# 开始执行
deploy
```

:::

Dockerfile：

:::tip Dockerfile

```dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /etc/nginx/html

EXPOSE 80
```

:::

脚本编辑好后，推送代码到Gitlab。

回到Jenkins，新建任务，选择多分支流水线，添加分支源以及Jenkinsfile文件路径后点击保存。任务创建完成后，尝试构建项目。

我在第一次构建时遇到了`npm: command not found`错误，这是因为Docker部署的Jenkins容器内没有node环境。

:::tip

终端输入以下命令进入Jenkins容器：

```bash
docker exec -it Jenkins /bin/bash
```

下载nodejs并解压：

```bash
wget https://nodejs.org/dist/v14.15.1/node-v14.15.1-linux-x64.tar.xz

tar -xvf node-v14.15.1-linux-x64.tar.xz
```

配置环境变量：

```bash
vim /etc/profile
# 或者使用vi
vi /etc/profile
```

profile:

```profile
export NODE=/opt/node-v15.2.1-linux-x64/bin
export PATH=$NODE:$PATH
```

使环境变量生效：

```bash
source /etc/profile
```

打印当前环境变量：

```bash
echo $PATH
```

![image-20201124003656181](https://upyun1.surcode.cn/imgs/20201124003656.png)

复制终端输出的环境变量，回到Jenkins，系统管理 -> 系统配置，全局属性中添加环境变量，如下图，将终端复制的环境变量粘贴过来，保存。

![image-20201124003421166](https://upyun1.surcode.cn/imgs/20201124003421.png)

然后，回到前端任务，再次尝试构建。

:::

---

前后端分别构建成功后，登陆Harbor，进入febs项目，镜像都被推送到仓库中。至此，整个构建流程结束。

![image-20201124004306614](https://upyun1.surcode.cn/imgs/20201124004306.png)



## 二、部署服务

创建Swarm集群，拉取镜像：

```bash
docker pull swarm
```

初始化：

```bash
docker swarm init
```

初始化Swarm，当前服务器节点成为管理节点，通过下图命令可以向Swarm中添加工作节点。

![image-20201122194938799](https://upyun1.surcode.cn/imgs/20201122194938.png)

编写前后端docker-compose：

docker-compose-backend.yml

:::tip docker-compose-backend.yml

```yaml
version: "3"

services:
  febs-gateway-service:
    image: localhost:7888/febs/febs-gateway:1.0.0-SNAPSHOT
    ports:
      - "8301:8301"
    networks:
      - febs-net-test
    extra_hosts:
      - "dockerhost:10.0.11.1"
    env_file:
      - ./env
    environment:
      - SW_AGENT_NAME=gateway
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - /root/docker-deploy/skywalking/agent:/agent
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
      resources:
        limits:
          cpus: "1"
          memory: 1024M
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"

  febs-admin-service:
    image: localhost:7888/febs/febs-admin:1.0.0-SNAPSHOT
    ports:
      - "8401:8401"
    networks:
      - febs-net-test
    extra_hosts:
      - "dockerhost:10.0.11.1"
    env_file:
      - ./env
    environment:
      - SW_AGENT_NAME=admin
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - /root/docker-deploy/skywalking/agent:/agent
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
      resources:
        limits:
          cpus: "1"
          memory: 1024M
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"

  febs-tx-manager-service:
    image: localhost:7888/febs/febs-tx-manager:1.0.0-SNAPSHOT
    ports:
      - "8888:8888"
      - "8501:8501"
    networks:
      - febs-net-test
    extra_hosts:
      - "dockerhost:10.0.11.1"
    env_file:
      - ./env
    environment:
      - SW_AGENT_NAME=tx-manager
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - /root/docker-deploy/skywalking/agent:/agent
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
      resources:
        limits:
          cpus: "1"
          memory: 1024M
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"

  febs-auth-service:
    image: localhost:7888/febs/febs-auth:1.0.0-SNAPSHOT
    networks:
      - febs-net-test
    extra_hosts:
      - "dockerhost:10.0.11.1"
    env_file:
      - ./env
    environment:
      - SW_AGENT_NAME=auth
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - /root/docker-deploy/skywalking/agent:/agent
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
      resources:
        limits:
          cpus: "1"
          memory: 1024M
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"

  febs-job-service:
    image: localhost:7888/febs/febs-server-job:1.0.0-SNAPSHOT
    networks:
      - febs-net-test
    extra_hosts:
      - "dockerhost:10.0.11.1"
    env_file:
      - ./env
    environment:
      - SW_AGENT_NAME=job
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - /root/docker-deploy/skywalking/agent:/agent
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
      resources:
        limits:
          cpus: "1"
          memory: 1024M
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"

  febs-generator-service:
    image: localhost:7888/febs/febs-server-generator:1.0.0-SNAPSHOT
    networks:
      - febs-net-test
    extra_hosts:
      - "dockerhost:10.0.11.1"
    env_file:
      - ./env
    environment:
      - SW_AGENT_NAME=generator
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - /root/docker-deploy/skywalking/agent:/agent
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
      resources:
        limits:
          cpus: "1"
          memory: 1024M
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"

  febs-system-service:
    image: localhost:7888/febs/febs-server-system:1.0.0-SNAPSHOT
    networks:
      - febs-net-test
    extra_hosts:
      - "dockerhost:10.0.11.1"
    env_file:
      - ./env
    environment:
      - SW_AGENT_NAME=system
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - /root/docker-deploy/skywalking/agent:/agent
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
      resources:
        limits:
          cpus: "1"
          memory: 1024M
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"

networks:
  febs-net-test:
    external: true
```

:::

docker-compose-frontend.yml

:::tip docker-compose-frontend.yml

```yaml
version: "3"

services:
  febs-cloud-web:
    image: localhost:7888/febs/febs-cloud-web:1.0.0-staging
    ports:
      - "3901:80"
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
    logging:
      driver: "json-file"
      options:
        max-size: "20m"
        max-file: "2"
```

:::

env:

:::tip env

```
# JVM
JAVA_OPTS=-Xmx800m -Xms800m -javaagent:/agent/skywalking-agent.jar -Dskywalking.collector.backend_service=192.168.3.6:11800
# SPRING_OPTS=--server.tomcat.max-threads=200
SPRING_OPTS=--spring.cloud.nacos.discovery.namespace=febs-cloud-test --spring.cloud.nacos.config.namespace=febs-cloud-test

NACOS_URL=192.168.3.6
MYSQL_URL=192.168.3.6
REDIS_URL=192.168.3.6
MONGO_URL=192.168.3.6
FEBS_TX_MANAGER=192.168.3.6
FEBS_ADMIN=febs-admin-service
FEBS_GATEWAY=febs-gateway-service
```

:::

通过Portainer创建Networks，如下图：（或者在终端使用docker命令创建网络）

![image-20201122200959957](https://upyun1.surcode.cn/imgs/20201122201000.png)

创建后端服务：

```bash
docker stack deploy -c docker-compose.backend.test.yml febs-cloud-backend --with-registry-auth
```

![image-20201122201107858](https://upyun1.surcode.cn/imgs/20201122201107.png)

创建前端服务：

```bash
docker stack deploy -c docker-compose.frontend.test.yml febs-cloud-frontend --with-registry-auth
```

![image-20201122203443158](https://upyun1.surcode.cn/imgs/20201122203443.png)

---

至此，微服务项目部署完成。（前端要修改后端API地址后才可正常访问服务）

|                           演示地址                           | 用户名 |   密码   |
| :----------------------------------------------------------: | :----: | :------: |
| [http://centos.liyan.run:3901/](http://centos.liyan.run:3901/) | scott  | 1234qwer |

*服务器性能和网络带宽问题，访问有点儿慢*

