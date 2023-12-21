# Run Wearing

An application that allows runners to track their apparel across weather conditions, with the ability to make recommendations for conditions moving forward based on past experiences.

## Project Setup

### Codespaces

This project is set up to run in GitHub Codespaces (or other devcontainer solutions). It includes the main app container and a Postgres sidecar. It also includes setup for supporting tools, such as [bun](https://bun.sh/), and a nice default Zsh/oh-my-zsh/p10k setup.

### Environment

The scripts assume you have some secrets configured in your environment variables. The following are some values you need to provide:
```
NUXT_AUTH_STRAVA_CLIENT_ID=<your client id for your Strava app, for login>
NUXT_AUTH_STRAVA_CLIENT_SECRET=<your client secret for your Strava app, for login>
```

### Prisma

This project uses [Prisma](https://www.prisma.io/) to manage the database. You can view a full list of Prisma CLI commands [here](https://www.prisma.io/docs/orm/reference/prisma-cli-reference), but the key command if you are just setting up (or updating) the project is:
```
bun prisma migrate dev
```

## Running project in dev

### In Codespaces

There are some convenience scripts to run the project in GitHub Codespaces.

In order to start up the application, simply run:
```
bun migrate:dc
bun dev:dc:codespaces
```

### In a devcontainer locally (Easy with VS Code!)
There are some convenience scripts to run the project in Local DevContainers.

In order to start up the application, simply run:
```
bun migrate:dc
bun dev:dc:local
```