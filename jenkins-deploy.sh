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

# isSuccess
isSuccess=0

# 发布
deploy() {
	cd $b_path

  echo "==========0. 安装依赖=========="

  # 安装依赖
  npm install --registry=https://registry.npm.taobao.org --unsafe-perm=true --allow-root

  echo "==========1. 开始构建=========="
  pwd


npm run clear
npm run build

echo "==========2. 开始删除空间旧文件=========="
echo "目标主机：${host} 用户名：${username}"

# 登陆远程服务器 删除远程空间文件
ssh -P22 $username@$host "cd /;cd $r_path;rm -rf *;exit;"

echo "==========3. 开始上传空间新文件=========="
# 复制本地文件到远程空间
scp -P22 -r $opt_path/* $username@$host:$r_path
 
# echo "==========4. 发布完成=========="

isSuccess=1
}


deploy

if [ $isSuccess -eq 0 ]; then
    echo "failed"
else
    echo "succeed"
fi



