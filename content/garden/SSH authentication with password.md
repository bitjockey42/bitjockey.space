---
title: "SSH authentication with password"
created: 2022-12-18T20:16
updated: 2022-12-18T20:16
tags: ["garden", "cli", "ssh", "snippet"]
stage: "seedling"
---

Sometimes, it's necessary to do password-based authentication with an SSH client. For example, when you're trying to SSH into your Mac Mini that's downstairs but don't have your  pubkey set there yet.

The command:

```shell
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no user@hostname
```