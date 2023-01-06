# Advanced - UI Custom Base Path

This document lists the instructions for building an aerie-ui Docker image with a [custom base path](https://kit.svelte.dev/docs/configuration#paths).

### Building

1. Clone the [aerie-ui](https://github.com/NASA-AMMOS/aerie-ui) and install dependencies. Note that [Node LTS](https://nodejs.org/) is required (currently 18.13.0).

   ```sh
   git clone https://github.com/NASA-AMMOS/aerie-ui.git
   cd aerie-ui
   npm install
   ```

   When you clone aerie-ui the default branch is [develop](https://github.com/NASA-AMMOS/aerie-ui/tree/develop). If you want to build an image from a [specific release](https://github.com/NASA-AMMOS/aerie-ui/releases) you have to checkout the proper tag. For example to checkout [v1.0.0](https://github.com/NASA-AMMOS/aerie-ui/releases/tag/v1.0.0) do:

   ```sh
   git checkout tags/v1.0.0 -b v1.0.0
   ```

2. Update [svelte.config.js](https://github.com/NASA-AMMOS/aerie-ui/blob/develop/svelte.config.js) with the [base path](https://github.com/NASA-AMMOS/aerie-ui/blob/develop/svelte.config.js#L9) you want to use. Note that a leading `/` is required. So for example a valid base path is `/aerie`.

3. Build the aerie-ui.

   ```sh
   npm run build
   ```

4. Build the aerie-ui Docker image. Change the tag as necessary. For example we tag the image here with `aerie-ui`:

   ```sh
   docker build -t aerie-ui .
   ```

5. Use the newly built image as part of your normal [Aerie Docker deployment](https://github.com/NASA-AMMOS/aerie/blob/develop/deployment/docker-compose.yml#L132).

### Cleaning

If you ever need to re-run through these instructions make sure you **always** start from a clean environment. Remove all dependencies and build artifacts in aerie-ui:

```sh
rm -rf node_modules
rm -rf .svelte-kit
rm -rf build
```

Remove the built Docker image:

```sh
docker rmi aerie-ui
```

### References

1. [aerie-ui Developer.md](https://github.com/NASA-AMMOS/aerie-ui/blob/develop/docs/DEVELOPER.md)
1. [aerie-ui Deployment.md](https://github.com/NASA-AMMOS/aerie-ui/blob/develop/docs/DEPLOYMENT.md)

### Svelte Kit Issues

Once this issue is resolved we will no longer need this document.

1. [Dynamic basepath](https://github.com/sveltejs/kit/issues/595)
