---
sidebar_position: 2
---

# Docker

## Docker Bigcapital Production deployment guide

### Pre-requisites

:::info
Before proceeding, make sure you have the latest version of docker and docker-compose installed.
:::

### Steps to deploy Bigcapital using docker-compose

1. Download the required files. 

In a directory of your choosing, clone the Bigcapital repository and navigate into the `./bigcapital` directory by entering the following commands:

```
git clone --depth 1 https://github.com/bigcapitalhq/bigcapital.git && cd ./bigcapital
```

The most important files in the docker deployment the `docker-compose.prod.yml`, `.env.example` and `docker` folder, we're not going to build docker images of the application from scratch, but docker-compose already imports built images from Github Registry where our continuous-deployment push the new built images when we release new versions.

3. Configure the `.env` file.

Change all mail variables to configure it with your mail server and the password of databases.

```
cp .env.example .env && nano .env
```

4. Get the services up and running.

```
docker-compose --file docker-compose.prod.yml up -d
```

- `-f` and the path to your configuration file
- `-d` to run containers in the background

5. **Your Bigcapital installation is complete.** Please note that the containers are not exposed to the internet and they only bind to the localhost. You don't have to setup Nginx or any other proxy server to the requests, we're already set up Nginx container on docker-compose file as proxy server.

Wait for all containers to be in running state, and then point your browser to `http://<IP-ADDRESS>:8000/` to access the application.

### Verify the Installation

1. Ensure that your containers are running correctly. To view the status of your containers, run the following command:

```
docker ps
```

The output should look similar to the following:

```
CONTAINER ID   IMAGE                                COMMAND                  CREATED          STATUS          PORTS                                      NAMES
28b2727fa769   bigcapital-nginx                     "/bin/sh -c nginx"       13 seconds ago   Up 8 seconds    0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   bigcapital-nginx-gateway
7fad8c349625   ghcr.io/bigcapitalhq/server:latest   "docker-entrypoint.s…"   13 seconds ago   Up 9 seconds                                               bigcapital-server
4822ee034710   bigcapital-redis                     "docker-entrypoint.s…"   14 seconds ago   Up 10 seconds   6379/tcp                                   bigcapital-redis
0c1806951917   bigcapital-mongo                     "docker-entrypoint.s…"   14 seconds ago   Up 11 seconds   27017/tcp                                  bigcapital-mongo
ce5c8de35d28   bigcapital-mysql                     "docker-entrypoint.s…"   14 seconds ago   Up 10 seconds   3306/tcp, 33060/tcp                        bigcapital-mysql
984978c4f75d   ghcr.io/bigcapitalhq/webapp:latest   "/docker-entrypoint.…"   14 seconds ago   Up 10 seconds   80/tcp                                     bigcapital-webapp
```

### Database migration

Once you get the services up and running, the docker-compose file has `database_migration` container once listen to the `mysql` container and will execute the migration command in automated way and the container stop automatically after finish the migration (the container do not have to be run all the time), you have to execute it once to update the database schema.

#### Make sure the database migration ran successfully.

Get the container ID by listing all containers `docker ps -a | grep bigcapital-database_migration` and show the logs of that container by `docker logs -f CONTAINER_ID`

### Upgrading

First we need just to pull latest version of images of docker-compose file

```
docker-compose --file docker-compose.prod.yml pull
```

and start using them again.

```
docker-compose --file docker-compose.prod.yml up -d
```