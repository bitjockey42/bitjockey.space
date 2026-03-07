---
title: Deploying a ghost blog to dokku
created: 2026-03-06T23:26
updated: 2026-03-06T23:30
tags:
  - how-to
  - dokku
stage: seedling
---
# Deploying a new instance

## On dokku

```shell
dokku apps:create ghost
dokku mysql:create ghost
dokku mysql:link ghost ghost
dokku storage:ensure-directory ghost
dokku storage:mount ghost /var/lib/dokku/data/storage/ghost:/var/lib/ghost/content
```

Then set the config:

```
dokku config:set ghost \
    database__client=mysql \
    database__connection__database=ghost \
    database__connection__host=dokku-mysql-ghost \
    database__connection__password=supersecretstring \
    database__connection__port=3306 \
    database__connection__user=mysql \
    mail__from=notifications@example.com \
    mail__options__auth__pass=mailtrappass \
    mail__options__auth__user=smtp@mailtrap.io \
    mail__options__host=live.smtp.mailtrap.io \
    mail__options__port=587 \
    mail__options__secure=false \
    mail__options__service=Mailtrap \
    mail__transport=SMTP \
    url=https://ghost.example.com
```

Then finally, deploy from docker:
```
dokku git:from-image ghost ghost:latest
dokku ports:set ghost http:80:2368
dokku letsencrypt:enable ghost 
```