# Production Deployment

This document describes some of the things you'll need to consider when deploying Aerie to a shared production server, and provides a guide for configuring and running Aerie in your environment. 

:::danger

Aerie allows execution of user-provided code in the simulation and scheduling environments, so it is important to protect your environment from being accessed by anonymous Internet users. The safest way to deploy Aerie is with *network-level access controls*, limiting access to eg. only IP addresses on your local network or VPN. You may want to also use an [authentication adapter](/deployment/advanced-sso/) to implement user-level access controls. Do not run Aerie on the public internet without one or both of these controls in place!

:::

## Infrastructure details

Before deployment, consider how you plan to handle these details about your infrastructure: 

* **Domain name** - if you are using a domain name for your Aerie services, make sure you configure the DNS to point to your server's IP address, whether internal or public. This name will also be used in your docker-compose configuration - see below.
* **HTTPS** - we recommend that Aerie deployments, **especially** those on public networks, use HTTPS with a valid TLS certificate. You can use a TLS certificate from an authority like [Let's Encrypt](https://letsencrypt.org/), or a self-signed certificate from your organization for deployments on a private network.
* **Reverse proxy/load balancer** - _if_ you are using HTTPS, you will need to configure an additional service to be the single ingress point for all (HTTPS) network traffic, strip TLS and forward HTTP traffic to the Aerie services. One way to accomplish this is with the **[reverse proxy pattern](/deployment/advanced-reverse-proxy/)**, for which an example is provided. If you are using AWS infrastructure, you may find it easier to manage your certificate with [Amazon Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html) and route all traffic through an [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) instead of using a reverse proxy.
* **Authentication/SSO** - Aerie **does not include** its own fully-featured implementation of user authentication, and should either be used with an **"authentication adapter,"** or in a private network with limited access. We provide an adapter for use with JPL CAM, a JPL-internal SSO solution - [instructions here](/deployment/advanced-sso/). Users needing to integrate with other SSO/auth systems may need to write their own auth adapters following the same pattern.


## Production Deployment Guide

This checklist outlines a set of steps for running a minimal production Aerie deployment. Note that these will vary somewhat from one environment to another, so feel free to adapt them as needed.

1. Ensure you have **Docker Engine and Docker Compose installed** on your server. We recommend following the official [Engine install guide](https://docs.docker.com/engine/install/) and [Compose install guide](https://docs.docker.com/compose/install/#scenario-two-install-the-docker-compose-plugin) for your platform, as simply running eg. `yum install docker` may install Podman instead of Docker on some platforms.
2. Ensure your server has the necessary **network ports exposed** for Aerie services - namely, ports **80, 8080, and 9000**, unless you plan to modify these default ports in the docker-compose file. Port rules are usually configured via your server's firewall settings. See [Aerie services & images](/deployment/introduction/#aerie-services--images) for details on services and their port assignments.  If you are running on an AWS EC2 instance, you may need to set rules for the instance's *security group* to allow these ports to send & receive TCP traffic.
3. Copy the `Deployment.zip` file from an [Aerie release](https://github.com/NASA-AMMOS/aerie/releases) to your server and extract it, for example:
    ```
    curl -sLO https://github.com/NASA-AMMOS/aerie/releases/download/v3.1.1/Deployment.zip
    unzip Deployment.zip
    tar -xf deployment.tar
   ```
4. Modify the `.env` file to fill in the required variables - see [Environment Variables](/deployment/introduction/#environment-variables). Importantly, all services need usernames and passwords set, and Hasura needs a secret key - see eg. [this completed example](https://github.com/NASA-AMMOS/aerie-mission-model-template/blob/main/.env.template).
5. Modify the [`docker-compose.yml` file](/deployment/introduction/#docker-composeyml) for your specific environment.
    - A useful pattern is to **[merge Compose files](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/)** when running Aerie, to keep your custom compose file changes separate from the original file provided by the deployment, rather than modifying the original. You can create a file called eg. `docker-compose.prod.yml` which contains *only* the overriding changes you want to make to the original file. Then, when running your services, you can pass them both to Compose [with the `-f` flag](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/).
    - If you are using [CAM/SSO authentication adapters](/deployment/advanced-authentication/) and/or [a reverse proxy](/deployment/advanced-reverse-proxy/), review their docs to determine the Compose file modifications they require.
    - Regardless of your other settings, your compose file needs to provide the `aerie-ui` service with the **fully-qualified domain names** (FQDNs) it will use to make requests to the other services. This is generally done by adding an additional variable to the `.env` file with your base domain, eg.:
      ```
      AERIE_HOST="myaerie.myorg.com"
      ```
      and then adding the following lines to your `docker-compose.prod.yml` file:
      ```
      aerie_ui:
        environment:
          ORIGIN: https://${AERIE_HOST}
          PUBLIC_GATEWAY_CLIENT_URL: https://${AERIE_HOST}:9000
          PUBLIC_HASURA_CLIENT_URL: https://${AERIE_HOST}:8080/v1/graphql
          PUBLIC_HASURA_WEB_SOCKET_URL: wss://${AERIE_HOST}:8080/v1/graphql
      ```
      If you do not have a proper domain name set up yet, you can use your server's IP address or any other FQDN you have available.
6. Finally, use the `up` command to run all of the Aerie services in their docker containers, eg.:
  ```
  docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
  ```
  After a few seconds, you can check on the status of the services by running `docker ps`. It may take a minute or two to fully initialize the system, but eventually all services should show an "Up" status. If not, check your Docker logs for errors from the services (see [Logging](#logging) below).

## Other Considerations

### Data persistence and backups
It's a good idea to have a strategy for backing up and restoring your Aerie data in case something goes wrong with your server. Aerie mainly persists data in two ways:
* The Postgres database, managed by the `aerie-postgres` container, stores the majority of user-created data such as plans and simulation runs.
* Some data is also stored in the filesystem of the Aerie container, such as uploaded mission model JAR files.

Both types of data are persisted using [Docker Volumes](https://docs.docker.com/engine/storage/volumes/). One way to handle backups is simply to copy all data out of the Aerie volumes (to another location, off of your main instance) on a eg. nightly basis.

It may be useful sometimes to just backup the state of your Postgres database using a utility like `pg_dump` eg. before performing complex database operations - just remember this does not backup the files in the filesystem and therefore is only useful for recovering from database issues. 

### Upgrading your Aerie Environment

Aerie releases new versions roughly every two weeks, and eventually you may want to upgrade your environment to a new version. If you want to preserve your environment's data from the previous version, you should take care to upgrade and migrate your data forward in a safe way:
* Carefully read the [changelogs on the Releases page](https://github.com/NASA-AMMOS/aerie/releases) and the [upgrade guides](https://nasa-ammos.github.io/aerie-docs/upgrade-guides/3-1-1-to-3-2-0/) for all versions between your old version and the one you're upgrading to, and keep note of any breaking changes.
* Perform a backup of your database and/or Docker volumes before upgrading.
* To perform the upgrade: 
  - Stop your docker containers with `docker compose down`
  - Update the `DOCKER_TAG` environment variable to the new desired Aerie version
  - If necessary, modify your docker-compose or any other deployment options to deal with breaking changes
  - Bring your docker containers back up with `docker compose up`
  - Follow the instructions on the [Database Migrations page](/deployment/advanced-database-migrations/) to run the migration script, which will automatically migrate your data to be compatible with the new version.

### Logging

By default, Docker saves logs on the local filesystem for all of your Aerie services, and [displays them with the command `docker logs <container_id>`](https://docs.docker.com/reference/cli/docker/container/logs/). However, these logs are somewhat ephemeral and may be overwritten in time. If you care about retroactively investigating and debugging issues encountered by your users, it's a good idea to have a log rotation strategy and to save your logs in a more permanent archive, outside of your environment. 
