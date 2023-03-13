# Deployment

If you are in a hurry and want to get Aerie running locally quickly, please see the [fast track](/introduction/#fast-track) deployment instructions. This document goes into more depth about the Aerie system and how it should be deployed.

## Docker

Aerie uses [Docker](https://www.docker.com/) as it's main deployment infrastructure. The artifacts used to deploy Aerie are a collection of [OCI](https://opencontainers.org/) images stored on [GitHub Packages](https://github.com/orgs/NASA-AMMOS/packages?ecosystem=container&q=aerie). Here is the list of required images, their description, default port, and if they should be public (exposed to the open network):

| Image                                      | Description                                                     | Port  | Public |
| ------------------------------------------ | --------------------------------------------------------------- | ----- | ------ |
| [aerie-gateway][gateway]                   | Gateway server used for file-upload and authentication.         | 9000  | ✅     |
| [aerie-hasura][hasura]                     | Hasura Docker image with bundled Aerie-specific Hasura metadata | 8080  | ✅     |
| [aerie-merlin][merlin]                     | Service for planning and simulation                             | 27183 | ❌     |
| [aerie-merlin-worker][merlin-worker]       | Worker for executing simulations                                | 27187 | ❌     |
| [aerie-postgres][postgres]                 | Postgres Docker image with bundled Aerie-specific SQL           | 5432  | ❌     |
| [aerie-scheduler][scheduler]               | Service for scheduling                                          | 27185 | ❌     |
| [aerie-scheduler-worker][scheduler-worker] | Worker for executing scheduling goals                           | 27189 | ❌     |
| [aerie-sequencing][sequencing]             | Service for sequence generation and management                  | 27184 | ❌     |
| [aerie-ui][ui]                             | The web-based client application for Aerie.                     | 80    | ✅     |

You can launch Aerie via [Docker Compose](https://docs.docker.com/compose/) using our template [docker-compose.yml](https://github.com/NASA-AMMOS/aerie-mission-model-template/blob/main/docker-compose.yml) file.

If you need a more custom deployment you can use the Aerie [deployment directory](https://github.com/NASA-AMMOS/aerie/blob/develop/deployment), which we include with each [release](https://github.com/NASA-AMMOS/aerie/releases). For example if you want to run Hasura and Postgres outside of a Docker container (recommended for larger deployments), the deployment `.zip` file included in the release contains all the Hasura metadata and `.sql` files needed to spin up those services on their own.

## Environment Variables

Each Aerie service is configured with environment variables. A description of those variables is found in the [Environment Variable Documentation](https://github.com/NASA-AMMOS/aerie/blob/develop/deployment/Environment.md).

Of note, the `aerie-merlin`, `aerie_merlin_worker`, `aerie-scheduler`, and `aerie-scheduler-worker` containers can be provided additional JVM arguments as environment variables. For example one may choose to configure the JVM allocated heap size. On must provide any desired JVM flags to the `JAVA_OPTS` environment variable for the container being configured.

## System Requirements

### Software

| Name   | Version |
| ------ | ------- |
| Docker | 20.x    |

### Hardware

Note these numbers are lower bounds. You will need to scale Aerie based on your mission needs.

| Hardware            | Details                                |
| ------------------- | -------------------------------------- |
| CPU                 | 2 Gigahertz (GHZ) or above             |
| RAM                 | 8 GB at minimum                        |
| Storage             | 15 GB                                  |
| Display resolution  | 2560-BY-1600, recommended              |
| Internet connection | High-Speed connection, at least 60MBPS |

### Supported Browsers

| Name    | Version |
| ------- | ------- |
| Chrome  | Latest  |
| Firefox | Latest  |

## Defect Reporting Procedure

All defect reports should go to `aerie_support@jpl.nasa.gov`.

[gateway]: https://github.com/orgs/NASA-AMMOS/packages/container/package/aerie-gateway
[hasura]: https://github.com/orgs/NASA-AMMOS/packages/container/package/aerie-hasura
[merlin]: https://github.com/orgs/NASA-AMMOS/packages/container/package/aerie-merlin
[merlin-worker]: https://github.com/NASA-AMMOS/aerie/pkgs/container/aerie-merlin-worker
[postgres]: https://github.com/orgs/NASA-AMMOS/packages/container/package/aerie-postgres
[scheduler]: https://github.com/orgs/NASA-AMMOS/packages/container/package/aerie-scheduler
[scheduler-worker]: https://github.com/orgs/NASA-AMMOS/packages/container/package/aerie-scheduler-worker
[sequencing]: https://github.com/orgs/NASA-AMMOS/packages/container/package/aerie-sequencing
[ui]: https://github.com/orgs/NASA-AMMOS/packages/container/package/aerie-ui
