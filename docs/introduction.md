# Introduction

Aerie is a next-generation software framework for modeling spacecraft. It is developed by the [NASA Jet Propulsion Laboratory (JPL)](https://www.jpl.nasa.gov/), and is being used for planning and operating spacecraft missions like [Europa Clipper](https://europa.nasa.gov/).

Some of the main features of Aerie include:

- A library to write mission models in the Java programming language
- A highly performant discrete-event simulator
- An embedded domain specific language (EDSL) for defining and executing goal-based scheduling rules
- An EDSL for defining and executing activity and resource constraints
- An EDSL for defining and executing activity command expansions
- An EDSL for defining sequences, and a fully-featured browser-based sequence editor
- A GraphQL API so you can easily build tools on top of Aerie
- A web-based [client application](https://github.com/NASA-AMMOS/aerie-ui)

## Fast Track ⏱️ {#fast-track}

Understand Aerie in **5 minutes** by trying it out!

1. Before starting you first need to install [Docker](https://www.docker.com/get-started/) on your local machine. The Aerie system is essentially a collection of [OCI](https://opencontainers.org/) [images](https://github.com/orgs/NASA-AMMOS/packages?ecosystem=container&q=aerie).

1. If you’re running macOS, Linux, or another Unix-like OS you can use following command in your terminal to download the [Docker Compose](https://docs.docker.com/compose/) file:

   ```sh
   curl https://raw.githubusercontent.com/NASA-AMMOS/aerie-mission-model-template/main/docker-compose.yml --output docker-compose.yml
   ```

   If you're running a different OS and do not have [curl](https://curl.se/) available you can [download the docker-compose.yml here](https://raw.githubusercontent.com/NASA-AMMOS/aerie-mission-model-template/main/docker-compose.yml).

1. To start the Aerie services you can use the following command in the same directory as the `docker-compose.yml` file from the previous step:

   ```sh
   docker compose up
   ```

1. Visit [http://localhost/](http://localhost/) to view the [Aerie UI](https://github.com/NASA-AMMOS/aerie-ui).

1. Head over to the planning documentation to learn how to [upload a mission model](../planning/upload-mission-model).
