# Development guide

## Architecture

Matrika is a SPA (Single Page Application) with a backend API.

## Stack

The backend is written in Node.js using Express.js, `sequelize` and `mongoose` for ORM.
Frontend is written in Vue.js using Vuetify for UI, vue-router and Pinia for state management.

Why two databases? Mongo is used for auth related data and is shared with another project, while MySQL is used for the rest of the data, which is highly relational.

## Running locally

A docker compose file is provided to run the project locally.

To run the project locally, you need to have Docker installed.

```
docker compose up -d
```

Do not use 'root' as the database username, otherwise, the container will not start.

Note that if you are on Windows and use WSL2 for Docker, it is advisable to have the project directory in the WSL2 filesystem, otherwise the performance will be abysmal.

Also note that if the mongodb container starts to an unhealthy state, it might help to remove the `mongo` volume and restart the containers.

### Docker compose services

- `backend` - backend / api
- `mongo` - mongo database
- `mysql` - mysql database
- `frontend` - frontend
- `migration` - migration service, run once to migrate mysql database and seed dummy data
- `test` - test service, run tests

## Testing

Tests for backend are provided.
Tests are written using Mocha.

To run the tests, run the following command in the `backend` directory:

```
npm run test
```

Notice that you need to provide environment variables for the tests to run.

A simpler way to run the tests is use the provided docker-compose file.

There is a container `test` which runs the tests.

## CI / CD

The project is set up with Github Actions for CI / CD.

Any push is tested.

Any push to a branch with a name starting with `release/` will be deployed to the staging server.

## Deploying

Deployment can be done using docker or by hand.

An automated deployment process is part of the [CI / CD pipeline](#ci--cd).

Additional files are provided to aid with deployment in the `deployment` directory.

- [logrotate.conf](./deployment/logrotate.conf) file for log rotation
- [nginx.conf](./deployment/nginx.conf) nginx configuration for running api on the same domain under `/api` path
- [cron.conf](./deployment/cron.conf) for running cron jobs on backend
