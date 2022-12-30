# Aerie Documentation

The main documentation site for Aerie.

### Pull Repository

Note that this repository uses [Git LFS](https://git-lfs.com/) to store video files. Please make sure you have it installed before working in this repo.

```sh
git clone https://github.com/NASA-AMMOS/aerie-docs.git
```

### Installation

Make sure you have [Node.js LTS](https://nodejs.org/en/) installed, then do:

```sh
cd aerie-docs
npm install
```

### Local Development

```sh
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```sh
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
