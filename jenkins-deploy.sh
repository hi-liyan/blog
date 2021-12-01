#!/bin/bash

#---------------------------------------------------
# Jenkisn自动化构建脚本
# author: liyan
# date: 2021-7-17
#---------------------------------------------------


# 主机地址
host="82.157.71.111"

# 用户名
username="root"

# Remote Path
r_path="/www/wwwroot/www.shiguangping.com"

# Local Path
b_path=$(pwd)

# Opt Path
opt_path="$b_path/build"

# timestamp
timestamp =$(date +%Y%m%d%H%M%S)

# isSuccess
isSuccess=0

# 发布
deploy() {
	cd $b_path

  # 安装依赖
  echo "==========0. 安装依赖=========="
  npm install --registry=https://registry.npm.taobao.org --unsafe-perm=true --allow-root

  echo "==========1. 开始构建=========="
  pwd
  # 构建
  npm run clear
  npm run build

  # 将构建好的文件打包，文件名 20211201183839.tar
  echo "==========2. 静态资源打包=========="
  tar czvf $timestamp.tar $opt_path

  # 复制本地文件到远程空间
  echo "==========3. 上传压缩包=========="
  echo "目标主机：${host} 用户名：${username}"
  scp -P22 -r $b_path/%timestamp.tar $username@$host:$r_path

  # 登陆远程服务器，先删除旧的 build/ 目录，再解压
  echo "==========2. 开始删除空间旧文件=========="
  ssh -P22 $username@$host "cd $r_path;rm -rf build/;tar zxvf $timestamp.tar;exit;"

  isSuccess=1
}

deploy

if [ $isSuccess -eq 0 ]; then
    echo "==========0. 发布完成=========="
else
    echo "==========4. 发布完成=========="
fi



