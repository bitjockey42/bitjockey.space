---
title: Deploying a writefreely instance to dokku
created: 2026-03-06T22:59
updated: 2026-03-06T23:21
tags:
  - how-to
  - dokku
  - writefreely
stage: seedling
---

# Deploying a new instance
## On dokku

```shell
dokku apps:create write
dokku storage:ensure-directory write
dokku storage:mount write /var/lib/dokku/data/storage/write:/data
dokku mariadb:create write_db
dokku mariadb:link write_db write
dokku builder-dockerfile:set write dockerfile-path Dockerfile.prod
```

## On local machine
```shell
git clone git@github.com:writefreely/writefreely.git
cd writefreely
git remote add dokku dokku@vps:write
git push -u dokku master
```

This will fail because you need to run some more commands on dokku (see next section).
## Back on dokku
```shell
dokku run write writefreely config start
dokku run write writefreely keys generate
dokku run write writefreely --init-db
dokku ports:set write http:80:8080
dokku letsencrypt:enable write
```

Edit the `config.ini`:
```shell
sudo vim /var/lib/dokku/data/storage/write/config.ini
```

Edit these parts of `config.ini`:
```
[database]  
type     = mysql  
filename =    
username = mariadb  
password = somesecretstring
database = write_db
host     = dokku-mariadb-write-db  
port     = 3306  
tls      = false
```

# Migrating writefreely from one dokku server to another one

## On the old server

```shell
dokku mariadb:export > writefreely.dump
tar -cvf storage.tar.gz /var/lib/dokku/data/storage
```

## On local machine

Download the dump

```shell
sftp user@oldvps
get writefreely.dump
get storage.tar.gz
```

Then exit `sftp` and copy the dump to the new server

```shell
scp writefreely.dump vps:/home/user/
scp storage.tar.gz vps:/home/user/
```

## Dokku on the new server

```shell
dokku apps:create write
tar xfv storage.tar.gz
sudo cp -r storage/write /var/lib/dokku/data/storage/write
dokku storage:ensure-directory write
dokku storage:mount write /var/lib/dokku/data/storage/write:/data
dokku mariadb:create write_db
dokku mariadb:link write_db write
```

Look at what the `DATABASE_URL` has been set to and get the db pass from there.

Modify the `config.ini` to use the new password:

```
[database]  
type     = mysql  
filename =    
username = mariadb  
password = somesecretstring
database = write_db
host     = dokku-mariadb-write-db  
port     = 3306  
tls      = false
```

## On local machine

```
git clone git@github.com:writefreely/writefreely.git
cd writefreely
git remote add dokku dokku@vps:write
git push -u dokku master
```

