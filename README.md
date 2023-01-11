# Aerie Documentation

The main documentation site for Aerie.

### Pull Repository

Note that this repository uses [Git LFS](https://git-lfs.com/) to store media. Please make sure you have it installed before working in this repo.

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

### Adding Images or Videos

Images should be added to the repository using the [.png](https://en.wikipedia.org/wiki/Portable_Network_Graphics) format. Videos should be added to the repository using the [.webm](https://www.webmproject.org/) format.

Typically images and videos should be placed in an [assets](https://docusaurus.io/docs/markdown-features/assets) directory in the section of documentation they correspond to. For example see the [command-expansion documentation](./docs/command-expansion/) and [planning documentation](./docs/planning/).

In rare cases you may need to add [static assets](https://docusaurus.io/docs/static-assets) to the [static](./static) directory if they do not easily correspond to a documentation section.
