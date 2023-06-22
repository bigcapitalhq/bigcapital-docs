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
git clone --depth 1 -b main https://github.com/bigcapitalhq/bigcapital.git && cd ./bigcapital
```

The most important files in the docker deployment the `docker-compose.prod.yml`, `.env.example` and `docker` folder, we're not going to build docker images of the application from scratch, but docker-compose already imports built images from Github Registry where our continuous-deployment push the new built images when we release new versions.

2. Configure the `.env` file.

Change all mail variables to configure it with your mail server and the password of databases.

```
cp .env.example .env && nano .env
```

:::info
The `.env.example` file contains all the necessary environment variable values, allowing you to begin using the application directly with these pre-configured settings. You also have the option to modify the values as needed.
:::

3. Get the services up and running.

```
docker-compose --file docker-compose.prod.yml up -d
```

- `-f` and the path to your configuration file
- `-d` to run containers in the background

4. **Your Bigcapital installation is complete.** Please note that the containers are not exposed to the internet and they only bind to the localhost. You don't have to setup Nginx or any other proxy server to the requests, we're already set up Nginx container on docker-compose file as proxy server.

Wait for all containers to be in running state, and then point your browser to `http://<IP-ADDRESS>:8000/` to access the application.

:::info
Once the installation is done, you will have to create your first account. No default account is provided.
:::

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

First we need just to pull latest version of the project, might be some changes on the docker-compose files.

```
git pull origin main
```

Now we are going to pull the latest images from regsitry by doing.

```
docker-compose --file docker-compose.prod.yml pull
```

and start build and using them again.

```
docker-compose --file docker-compose.prod.yml up --build -d
```

### Changing `.env` values after running Docker containers

Once the Docker containers are built and running, the application inside the container has already read the values from the .env file and is using them.
If you need to change the environment variable values, you will have to stop and re-start the Bigcapital containers.

If you were on **production**, use the following command.

```
docker-compose --file docker-compose.prod.yml restart
```

Or if you were on **development** mode.
```
docker-compose restart
```

:::caution
All environment variables of databases cannot be modified. This is because the initial user, username, password and database name have already been set up by the database. However, if it becomes necessary to change these credentials, you can access the MySQL container and execute SQL queries to modify the username, password, or even the system database name. Afterwards, you can update the corresponding values in the .env file to ensure they match the changes made.

**Alternatively**, you can remove the MySQL volume by performing the following action, but that it will delete all your database data.

*on production*
```
docker volume rm bigcapital_prod_mysql
```

*on development*
```
docker volume rm bigcapital_dev_mysql
```
:::