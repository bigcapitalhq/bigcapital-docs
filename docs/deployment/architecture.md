---
sidebar_position: 2
---

# Architecture

Bigcapital is built with a multi-tenancy architecture that allows multiple organizations to use the same software while keeping their data separate from each other. This means that every organization that uses the software has its own database that is isolated from other organizations' databases. At the same time there's a master or system database mutual between all tenants.

- Every organization that signs up for the software is given a unique identifier (Tenant ID). When an organization logs in, the server retrieves the organization's tenant ID from the login request and uses it to identify the organization's database.
- All database operations performed by the organization's users are performed on their own database.
- The server instance acts as a middleware between the client-side application and the database, and it routes all requests to the appropriate database based on the tenant ID.

![alt text](/img/architecture.png 'Title')

### Components:

- **Nginx Proxy**: Proxy server configured to redirect requests that start with `/api` to dynamic data (API endpoints) to the server, and all other requests to static assets of the single-page application.
- **System Database**: The system database is distinct from the tenant databases, which are used to store the data for each individual tenant and used by the software itself to manage and coordinate the different tenants and their databases.
- **Tenant Database**: Mysql tenant databases, the database is used to store all the data related to that organization and created and managed automatically by the server once the user signup and set up the account.
- **Web App**: React SPA static assets communicate with the server instance.
  Server: Stateful server instance NodeJS based (we work to make it stateless) to serve the dynamic data of API endpoints.
- **MongoDB**: MongoDB used to store Agenda jobs metadata.
- **Cache Store**: Redis to store cached data mutual between all tenants.