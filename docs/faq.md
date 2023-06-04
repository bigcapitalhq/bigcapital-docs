---
sidebar_position: 4
---

# FAQs

## Installation - FAQs

### Can I install Bigcapital without Docker?

No, it is not supported as of today.

### Can I change the values of database environment variables after containers running?

When you compose up the Bigcapital database container, it's initializing the system database and creates the system database from the given name from env variable and creates a user and it will give it all the neccessary privileges, but if you changed the values of database env variables the server won't be able to connect to the database with a new credentials and you need to delete the old database volume and start and build the database container again.

- Stop all Bigcapital containers: `docker-compose --file docker-compose.prod.yml down`
- Delete the database volume: `docker volume rm bigcapital_dev_mysql`
- Start and rebuild the containers again: `docker-compose --file docker-compose.prod.yml up --build -d`

:::danger
This will delete the database data entirety if you want to preserve the data you can preform some mysql queries manually to change the user name or password or even the database name and then change and match the environment variables values.
:::