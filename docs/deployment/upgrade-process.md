# Upgrade Process

This document describes how to upgrade your Aerie deployment when a new version is released. New releases are released periodically and can be found on our [Github Releases page](https://github.com/NASA-AMMOS/aerie/releases). We recommend staying up to date with new releases as much as is practical.


## Backups

It's a good idea to keep regular backups of your Aerie instance, and to make a backup immediately before upgrading, so you have a restore point if anything goes wrong. See our notes about [backing up Aerie on the Production Deployment guide](/aerie-docs/deployment/production-deployment/#data-persistence-and-backups).

## Upgrade Guide

Before upgrading, determine the version you are upgrading *from* and *to*. Go to the [Upgrade Guides](/upgrade-guides/3-2-0-to-3-3-0/) section of the docs, and read through every guide between your old version and the new version you're updating to. These will describe any breaking changes that occurred between versions, and will outline any changes you need to make to your configuration. Look out for guides which are noted as **"Upgrade Checkpoint"** versions (e.g. [v2.8.0](/upgrade-guides/2-7-1-to-2-8-0/)) - if you encounter one, you will first need to complete an upgrade to that version before continuing to your desired version (or the next checkpoint).

Once you're prepared, follow these instructions to upgrade:

1. Find your desired release on our [Github Releases page](https://github.com/NASA-AMMOS/aerie/releases). Go to the **Assets** section, under the release notes, and download the attached **Deployment.zip** file.
2. Extract the file to a location on the server where you're deploying Aerie (or on your local machine for a local deployment).
3. Compare the contents of the new deployment directory to your existing deployment directory, and copy to the new directory any custom changes you have made to your deployment - for example, changes made while following our [Production Deployment Guide](/aerie-docs/deployment/production-deployment/#production-deployment-guide), any customizations to your `docker-compose` file, and the environment variables in `.env`. If you made a `docker-compose.prod.yml` file for your deployment, this should be copied as well.
4. Apply any necessary changes to your code or configuration that were outlined in the upgrade guides you read, to account for any breaking changes in the Aerie API since the last version.
5. Open the `.env` file in `deployment` and make sure you set the variable `DOCKER_TAG` to the new Aerie version you are deploying - eg. `DOCKER_TAG=v3.3.0`
6. Bring down your old Aerie containers, if they are still running, with the command: `docker compose down`.
  - If this is a test deployment with disposable data that you don't care about preserving, you can run `docker compose down -v` and skip the migration step below.
7. Bring the new containers up with whatever `docker compose up` command you usually use, eg.:
```
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
8. If you are preserving your data, read through the [Database Migrations](advanced-database-migrations.mdx) guide and run the command to migrate your database forward to the new version, passing any flags as needed, eg:
```
aerie_db_migration.py migrate -a --all
```

