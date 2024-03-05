# Introduction

Aerie is an open source, extensible software system for planning, scheduling, and commanding space missions. Developed and maintained by NASA's [Advanced Multi-Mission Operation System (AMMOS)](https://ammos.nasa.gov/), it provides modeling and simulation capabilities that can be used for mission planning and analysis during project formulation all the way through operations, where it can be used to manage and validate spacecraft activity plans. Aerie is actively being used on flagship missions like [Europa Clipper](https://europa.nasa.gov/), but is equally suitable for smaller missions and constellations.

Some of the main features of Aerie include:

- A library to write mission models in the Java programming language
- A highly performant discrete-event simulator
- An embedded domain specific language (EDSL) for defining and executing goal-based scheduling rules
- An EDSL for defining and executing activity and resource constraints
- An EDSL for defining and executing activity command expansions
- An EDSL for defining sequences, and a fully-featured browser-based sequence editor
- A GraphQL API so you can easily build tools on top of Aerie
- A web-based [client application](https://github.com/NASA-AMMOS/aerie-ui)

As a multi-tenant system, Aerie allows multiple distributed users to [collaborate](https://nasa-ammos.github.io/aerie-docs/planning/collaboration/introduction/) in real-time on a single plan or concurrently work on multiple plans for multiple missions. Additionally, Aerie's [service based architecture](https://nasa-ammos.github.io/aerie-docs/overview/software-design-document/#aerie-system-design) allows for efficient system deployment and scalability on the cloud.

## Fast Track ⏱️ {#fast-track}

Understand Aerie in **5 minutes** by trying it out!

1. Before starting you first need to install [Docker](https://www.docker.com/get-started/) on your local machine. The Aerie system is essentially a collection of [OCI](https://opencontainers.org/) [images](https://github.com/orgs/NASA-AMMOS/packages?ecosystem=container&q=aerie).

1. If you’re running macOS, Linux, or another Unix-like OS you can use following command in your terminal to download the [Docker Compose](https://docs.docker.com/compose/) file:

   ```sh
   curl https://raw.githubusercontent.com/NASA-AMMOS/aerie-mission-model-template/main/docker-compose.yml --output docker-compose.yml
   ```

   If you're running a different OS and do not have [curl](https://curl.se/) available you can [download the docker-compose.yml here](https://raw.githubusercontent.com/NASA-AMMOS/aerie-mission-model-template/main/docker-compose.yml).

   Note that this compose file starts the [latest](https://github.com/NASA-AMMOS/aerie/releases/latest) version of Aerie.

1. To start the Aerie services you can use the following command in the same directory as the `docker-compose.yml` file from the previous step:

   ```sh
   docker compose up
   ```

1. Visit [http://localhost/](http://localhost/) to view the [Aerie UI](https://github.com/NASA-AMMOS/aerie-ui).

   Note that the fast track deployment is not configured to connect to an authentication and authorization provider. As such, and any credentials are accepted.

1. Head over to the planning documentation to learn how to [upload a mission model](../planning/upload-mission-model).
