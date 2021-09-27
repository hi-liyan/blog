#!/bin/bash

#---------------------------------------------------
# Jenkisn自动化构建脚本
# author: liyan
# date: 2021-7-17
#---------------------------------------------------


# 主机地址
host="139.198.19.125"

# 用户名
username="root"

# Remote Path
r_path="/www/wwwroot/www.shiguangping.com"

# Local Path
b_path=$(pwd)

# Opt Path
opt_path="$b_path/build"

# package 签名
package_lock="${b_path}/package-lock.json"
package_md5_file="${b_path}/package-md5"
touch $package_md5_file
package_md5=$(head -n 1 ${package_md5_file})
package_md5_changed=0

# 校验 package 版本
check_version() {
  echo "==========比较依赖版本=========="

  current_package_md5=$(md5sum ${package_lock} | cut -d" " -f 1)

  echo -e "$cyan prev: ${package_md5} current: ${current_package_md5}  $none"

  if [ "$current_package_md5" != "$package_md5" ]; then
    echo "==========依赖有变化=========="
    echo $current_package_md5 >${package_md5_file}
    package_md5_changed=1
  else
    echo "==========依赖无变化=========="
  fi
}


# 发布
deploy() {
	cd $b_path


check_version

  if [[ $package_md5_changed -eq 1 || $install_dependencies -eq 1 ]]; then
    echo "==========0. 安装依赖=========="
    pwd

    # 安装依赖
    npm install --registry=https://registry.npm.taobao.org --unsafe-perm=true --allow-root
  fi

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
 
echo "==========4. 发布完成=========="
}


deploy



