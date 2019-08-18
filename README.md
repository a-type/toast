# Toast

Toast is a meal planning app. Each directory in `services` is a relevant service.

## Developing

This repo uses `lerna` to orchestrate interdependent microservices in the `services` directory.

### Setup & Dependencies

To start, `npm i -g lerna`. This installs the CLI.

To install all dependencies for all services, run `lerna bootstrap` in the root directory.

To add a new dependency to a specific service, run `lerna add <dependency> --scope=<service name>`, where service name is like "`toast-ui`".

### Developing Locally

The best way to develop locally is to connect to the development environment in Google Cloud. The development environment includes the core database, media storage, and identity management.

I'm not going to put the credentials needed to connect to that environment here, though. You'll need to ask me. I'll send you over the `.env` files you need for each service to connect to the development environment.

Once you have the credentials, you can run `npm run devenv:start` from the `toast-core` service to spin up the dev database. It automatically sleeps at midnight.

To run any service, run `npm run dev` in its module directory.

I'm not honestly sure how to set up a development environment that doesn't rely on Google Cloud yet. The main trick is identity management. If there's a good local mock of that or something similar, you could theoretically run ArangoDB locally and maybe just ignore (or mock) media storage.

### Deploying

Commits to `master` deploy to prod automatically. See the `cloudbuild.yaml`.
