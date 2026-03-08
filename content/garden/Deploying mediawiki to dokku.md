---
title: Deploying mediawiki to dokku
created: 2026-03-07T00:40
updated: 2026-03-08T00:24
tags:
  - how-to
  - dokku
  - mediawiki
stage: seedling
---
# Migrating a mediawiki instance from one dokku server to another

## On the old server

```shell
dokku mysql:export wiki_db > wiki_db.dump
tar -cvf storage.tar.gz /var/lib/dokku/data/storage
```

## On local machine

Download the dump

```shell
sftp user@oldvps
get wiki_db.dump
get storage.tar.gz
```

Then exit `sftp` and copy the dump to the new server

```shell
scp wiki_db.dump vps:/home/user/
scp storage.tar.gz vps:/home/user/
```

## Dokku on the new server

```shell
dokku apps:create wiki
tar xfv storage.tar.gz
sudo cp -r storage/wiki /var/lib/dokku/data/storage/wiki

dokku storage:ensure-directory wiki

dokku storage:mount wiki /var/lib/dokku/data/storage/wiki/extensions:/var/www/html/extensions

dokku storage:mount wiki /var/lib/dokku/data/storage/wiki/images:/var/www/html/images

dokku storage:mount wiki /var/lib/dokku/data/storage/wiki/LocalSettings.php:/var/www/html/LocalSettings.php 

dokku storage:mount wiki /var/lib/dokku/data/storage/wiki/skins:/var/www/html/skins

dokku mysql:create wiki_db
dokku mysql:link wiki_db wiki
dokku mysql:import wiki_db < wiki_db.dump
```

Look at what the `DATABASE_URL` has been set to and get the db pass from there.

Modify the `LocalSettings.php` to use the new password 
```
## The protocol and server name to use in fully-qualified URLs  
$wgServer = "https://wiki.example.com";

## Database settings
$wgDBtype = "mysql";
$wgDBserver = "dokku-mysql-wiki-db:3306";
$wgDBname = "wiki_db";
$wgDBuser = "mysql";
$wgDBpassword = "supersecretstring";
```

While you're at it, check the `LocalSettings.php` for any skins that might loaded but not installed.

```
dokku git:from-image wiki mediawiki:stable
dokku letsencrypt:enable wiki
```

Then manually upgrade:
```
dokku enter wiki web
# mediawiki
php maintenance/run.php update.php
```

Then rebuild:
```
dokku ps:rebuild wiki
```

**Troubleshooting**

If there's an error about the skins when you go to the wiki, you might have to unmount the skins folder and copy it from the container.

```
dokku storage:unmount wiki /var/lib/dokku/data/storage/wiki/skins:/var/www/html/skins
dokku ps:rebuild wiki
```

Get the container id from `sudo docker ps`. Then copy the skins folder from container to host.
```
sudo docker cp 6aa2d9e79a12:/var/www/html/skins skins
cd /var/lib/dokku/data/storage/wiki
sudo mv skins oldskins
sudo cp ~/skins .
dokku storage:ensure-directory wiki
dokku storage:mount wiki /var/lib/dokku/data/storage/wiki/skins:/var/www/html/s  
kins
dokku ps:rebuild wiki
```