# Contributing

We would love for you to contribute to the Aerie documentation and help make it even better than it is today!

- [Prerequisite Knowledge](#prerequisite-knowledge)
- [Prerequisite Software](#prerequisite-software)
- [Editor](#editor)
- [Clone the Repository](#clone)
- [Install Dependencies](#install)
- [Start Documentation Server](#start)
- [Adding a New Document](#new)
- [Adding Images or Videos](#assets)
- [Submitting a Pull Request](#submit-pr)
- [Question or Problem?](#question)

## Prerequisite Knowledge

The Aerie documentation is built with [Docusaurus](https://docusaurus.io/). Documents can be written in either vanilla [Markdown](https://www.markdownguide.org/) (`.md` files), or [MDX](https://mdxjs.com/) (`.mdx` files). Most of the time you will want to use `.mdx` to [add assets](#assets), or things like [admonitions](https://docusaurus.io/docs/2.0.1/markdown-features/admonitions). Please see the [Docusaurus documentation](https://docusaurus.io/docs/next/markdown-features) for the complete set of available markdown features.

## Prerequisite Software

Before you can run the Aerie documentation locally you must install and configure the following products on your development machine:

- [Git](http://git-scm.com) and/or the [GitHub app](https://desktop.github.com/); [GitHub's Guide to Installing Git](https://help.github.com/articles/set-up-git) is a good source of information.

- [Git LFS](https://git-lfs.com/) which is used to store images and video. Make sure after installing you also run `git lfs install` to initialize Git LFS.

- [Node.js LTS](http://nodejs.org) which is used to run a development web server, and generate distributable files. We recommend using the [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to install Node.js and [NPM](https://www.npmjs.com/) on your machine. Once you have NVM installed you can use the required Node.js/NPM versions via:

  ```shell
  cd aerie-docs
  nvm use
  ```

## <a name="editor"></a> Editor

The recommended editor for writing Aerie documentation is [VS Code](https://code.visualstudio.com/) with the following settings and extensions. You can easily use another editor of your choice as long as you can replicate the formatting and spell-check settings.

### Settings.json

Your editor should follow the same settings found in [.vscode/settings.json](.vscode/settings.json).

### Extensions

1. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
1. [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
1. [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx)

## <a name="clone"></a> Clone the Repository

[Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) the aerie-docs repository:

```shell
git clone https://github.com/NASA-AMMOS/aerie-docs.git
cd aerie-docs
```

## <a name="install"></a> Install Dependencies

```sh
cd aerie-docs
npm install
```

## <a name="start"></a> Start Documentation Server

```sh
cd aerie-docs
npm start
```

Visit http://localhost:3000/aerie-docs/ to view the documentation in your local browser. Any changes you make to the documentation will auto-reload the page with your changes.

## <a name="new"></a> Adding a New Document

If you need to add a new document you need to update the [sidebar.js file](./sidebars.js) with the name of your new document. Please see the [Docusaurus documentation on the sidebar](https://docusaurus.io/docs/sidebar) for more detailed instructions.

## <a name="assets"></a> Adding Images or Videos

Images should be added to the repository using the [.png](https://en.wikipedia.org/wiki/Portable_Network_Graphics) format. Videos should be added to the repository using the [.webm](https://www.webmproject.org/) or [.mov](https://en.wikipedia.org/wiki/QuickTime_File_Format) format.

Typically images and videos should be placed in an [assets](https://docusaurus.io/docs/markdown-features/assets) directory in the section of documentation they correspond to. For example see the [command-expansion documentation](./docs/command-expansion/) and [planning documentation](./docs/planning/).

In rare cases you may need to add [static assets](https://docusaurus.io/docs/static-assets) to the [static](./static) directory if they do not easily correspond to a documentation section.

## <a name="submit-pr"></a> Submitting a Pull Request

Please follow these instructions when submitting a Pull Request:

1. Search [GitHub](https://github.com/NASA-AMMOS/aerie-docs/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate effort.
1. Make your changes in a new git branch:

   ```sh
   git checkout develop
   git pull origin develop
   git checkout -b my-fix-branch develop
   ```

1. Commit your changes using a descriptive commit message.

   ```sh
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

   ```sh
   git push origin my-fix-branch
   ```

1. In GitHub, send a pull request to `aerie-docs:develop`.
1. If we suggest changes then:

- Make the required updates.
- [Rebase your branch](https://dev.to/maxwell_dev/the-git-rebase-introduction-i-wish-id-had) and force push to your branch to GitHub (this will update your Pull Request):

  ```sh
  git rebase develop -i
  git push -f
  ```

After your pull request is merged, you can safely delete your branch and pull the changes from the repository:

- Check out the develop branch:

  ```shell
  git checkout develop
  ```

- Update your develop with the latest version:

  ```shell
  git pull origin develop
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

## <a name="question"></a> Got a Question or Problem?

If you would like to chat about the question in real-time, you can reach out via [our Slack channel](https://join.slack.com/t/nasa-ammos/shared_invite/zt-1mlgmk5c2-MgqVSyKzVRUWrXy87FNqPw).
