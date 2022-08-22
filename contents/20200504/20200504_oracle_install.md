---
date: '2020-05-04'
title: 'CentOS7 Oracle Database install'
categories: ['Oracle', 'DB', 'CentOS7']
summary: 'CentOS7 서버에서 Oracle db 인스톨하는 방법'
thumbnail: './img/14-1.png'
---

### 1.CentOS サーバで openssh インストール

```bash
yum -y install openssh
```

### 2.MAC のターミナルから CentOS1 サーバへ接続

```bash
$ ssh -Y root@10.211.55.6
```

### 3.oracle インストールに必要なパッケージーを準備

```bash
yum update
yum install -y binutils compat-libcap1 gcc gcc-c++ glibc glibc glibc-devel glibc-devel ksh compat-libstdc++-33 libaio libaio libaio-devel libaio-devel libgcc libgcc libstdc++ libstdc++ libstdc++-devel libstdc++-devel libXi libXi libXtst libXtst make sysstat xorg-x11-apps

yum install -y  libaio-0.3.105 compat-libstdc++-33-3.2.3 elfutils-libelf-devel-0.97 libaio-devel-0.3.105 libgcc-3.4.6 libstdc++-3.4.6 unixODBC-2.2.11 unixODBC-devel-2.2.11 pdksh-5.2.14
```

### 4.MAC から CentOS へ oracle インストールファイル転送

```bash
$ scp -r /Users/hwangboyoung/Downloads/linux.x64_11gR2_database_1of2.zip root@10.211.55.6:/home/oracle
$ scp -r /Users/hwangboyoung/Downloads/linux.x64_11gR2_database_2of2.zip root@10.211.55.6:/home/oracle
unzip linux.x64_11gR2_database_1of2.zip
unzip linux.x64_11gR2_database_2of2.zip
```

### 5.oracle 用グループとユーザ作成

```bash
groupadd oinstall
groupadd dba
useradd -g oinstall -G dba oracle
passwd oracle
```

### 6.oracle ユーザの Base ディレクトリ作成および環境変数設定

```bash
cd /home/oracle
mkdir db
chown -R oracle:oinstall db
chmod -R 775 db
chmod g+s db
vi /home/oracle/.bash_profile
```

真下のラインに下部内容を追加。

```bash
export TMP=/tmp
export TMPDIR=/tmp
export ORACLE_BASE=/home/oracle/db
export ORACLE_SID=orcl
export ORACLE_HOME=$ORACLE_BASE/product/12.1.0/dbhome_1
export ORACLE_HOME_LISTNER=$ORACLE_HOME/bin/lsnrctl
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib
PATH=$PATH:$HOME/.local/bin:$HOME/bin
export PATH=$ORACLE_HOME/bin:$PATH
```

### ７.カーネル設定修正

```bash
vi /etc/sysctl.conf
```

真下のラインに下部内容を追加。

```text
fs.aio-max-nr = 1048576
fs.file-max = 6815744
kernel.shmall = 2097152
kernel.shmmax = 1987162112
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
net.ipv4.ip_local_port_range = 9000 65500
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048586
```

修正したカーネル内容確認と適用

```bash
sysctl -p
```

### 8.shell limit 設定

```bash
vi /etc/security/limits.conf
```

```
oracle soft nproc 2047
oracle hard nproc 16384
oracle soft nofile 1024
oracle hard nofile 65536
```

### 9.GUI を使用するための X11 設定

MAC に XQuartz をインストール

インストール直後は DISPLAY 環境変数は設定されていない

```bash
$ echo $DISPLAY
```

MAC に再ログインすると設定される

### 10.リモートサーバ(oracle をインストールする CentOS サーバ)で sshd 設定

● 設定する前に oracle ユーザに sudo 権限付与

sudoers ファイルに修正権限の付与

```bash
# ll /etc/sudoers
-r--r-----. 1 root root 4328 11月 28 03:38 /etc/sudoers
# chmod +w /etc/sudoers
# ll /etc/sudoers
-rw-r-----. 1 root root 4328 11月 28 03:38 /etc/sudoers
```

sudoers ファイルを編集

```bash
vi /etc/sudoers
```

下部の内容を追加

```
oracle ALL=(ALL) ALL
```

sudoers ファイルに付与した修正権限を回収

```bash
[root@localhost ~]# chmod -w /etc/sudoers
[root@localhost ~]# ll /etc/sudoers
-r--r-----. 1 root root 4349  5月  4 19:56 /etc/sudoers
```

●sshd 設定

```bash
$ sudo vim /etc/ssh/sshd_config
```

```
X11Forwarding yes
X11DisplayOffset 10
X11UseLocalhost no
```

```bash
$ sudo systemctl restart sshd
```

### 11.MAC からリモートサーバに ssh で接続

```bash
$ ssh -XY oracle@10.211.55.6
```

(나는 여기서 루트로 접속을 해서 su커맨드로 oracle유저로 전환을 했는데 전환을 해버리면

옵션 XY(ssh -X 는 X11 Forwarding, ssh -Y 는 trusted X11 forwarding 명령어)가 먹히지 않아서

계속 인스톨러 화면이 나오지 않았음.)

### 12.文字化けしないように出力言語を英語に指定

```bash
export LANG=C
```

### 13.OUI 起動

```bash
$ ./runInstaller
```

### 14.設定

![14-1](./img/14-1.png)
![14-2](./img/14-2.png)
![14-3](./img/14-3.png)
![14-4](./img/14-4.png)
![14-5](./img/14-5.png)
![14-6](./img/14-6.png)
![14-7](./img/14-7.png)
![14-8](./img/14-8.png)
![14-9](./img/14-9.png)
![14-10](./img/14-10.png)
![14-11](./img/14-11.png)
![14-12](./img/14-12.png)
![14-13](./img/14-13.png)
![14-14](./img/14-14.png)
![14-15](./img/14-15.png)
![14-16](./img/14-16.png)
![14-17](./img/14-17.png)
![14-18](./img/14-18.png)
![14-19](./img/14-19.png)
![14-20](./img/14-20.png)
![14-21](./img/14-21.png)
![14-22](./img/14-22.png)
![14-23](./img/14-23.png)
![14-24](./img/14-24.png)
![14-25](./img/14-25.png)
http://localhost:1158/em
![14-26](./img/14-26.png)
![14-27](./img/14-27.png)
![14-28](./img/14-28.png)

終わり
