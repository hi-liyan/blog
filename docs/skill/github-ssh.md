---
title: GitHub配置SSH
date: 2018-06-12 16:16:26
category:
- 随手记
tags:
- Github
---

## 生成SSH Key

终端输入命令：

```shell
ssh-keygen -t rsa -C "china_liyan123@yahoo.co.jp"
```

此时终端提示：

>Generating public/private rsa key pair. 
>Enter file in which to save the key (/c/Users/shado/.ssh/id_rsa): 

终端会让你选择存放ssh文件的路径，括号内的是默认路径。

直接回车选择默认路径，终端提示输入SSH密码，需要输入两次，此时输入的密码不会显示在终端上，敲完接回车即可。  

>Your identification has been saved in /c/Users/shado/.ssh/id_rsa. 
>Your public key has been saved in /c/Users/shado/.ssh/id_rsa.pub.

之后终端提示密钥已经生成，在刚才选择的默认路径中，其中`id_rsa`是私有密钥，`id_rsa.pub`是公共密钥。  



## 在GitHub中添加密钥

登陆GitHub，在页面右上角头像选择下拉菜单中`Setting`，在设置页面`SSH and GPG keys`标签页，在这个标签页下添加SSH。

点击页面右上角`New SSH key`按钮，添加SSH密钥。

打开保存SSH的默认路径，打开`id_rsa.pub`*（用任意文本编辑器打开即可）*，复制里面的内容，粘贴到`New SSH key`的key里面，Title自定义即可，之后点击Add。

回到终端窗口，敲入命令：

```shell
ssh -T git@github.com
```

此时终端提示：  
>Enter passphrase for key '/c/Users/shado/.ssh/id_rsa':  

输入之前设置的密码，输入时密码不会显示在终端上。

密码输入正确后，终端会提示：  

>Hi ENNRIaaa! You've successfully authenticated, but GitHub does not provide shell access.

说明SSH密钥已经配置成功。



拉取仓库要选择ssh仓库地址。