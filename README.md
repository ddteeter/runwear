# Run Wearing

An application that allows runners to track their apparel across weather conditions, with the ability to make recommendations for conditions moving forward based on past experiences.

## Project Setup

### Codespaces

This project is set up to run in GitHub Codespaces (or other devcontainer solutions). It includes the main app container and a Postgres sidecar.

### .env

The scripts in the package.json assume a .env file will be provided at the root of the project for development. The following are some non-secrets you need to drop in:
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
```
