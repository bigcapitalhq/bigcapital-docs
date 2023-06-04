---
sidebar_position: 3
---

# Environment Variables

Bigcaptial requires the following environment variables to be configured:

### Mail

Following environment variables related to the application mail.

| Variable              | Description
| --------------------- | --------------------------------------------------------------------------------
| **MAIL_HOST**         | The hostname or IP address of the mail server used for sending emails.
| **MAIL_USERNAME**     | The username or email address used for authentication when sending emails.
| **MAIL_PASSWORD**     | The password associated with the **MAIL_USERNAME** for authentication.
| **MAIL_PORT**         | The port number on the mail server used for email communication.
| **MAIL_SECURE**       | Indicates whether the email communication should be secured with encryption.
| **MAIL_FROM_NAME**    | The sender's display name shown in the "From" field of outgoing emails.
| **MAIL_FROM_ADDRESS** | The email address shown in the "From" field of outgoing emails.

### System Database

Following environment variables related to the system database. 

| Variable               | Description
| ---------------------- | --------------------------------------------------------------------------
| **SYSTEM_DB_HOST**     | The hostname or IP address of the **system database** server.
| **SYSTEM_DB_USER**     | The port number on the **system database** server where the database service is running.
| **SYSTEM_DB_PASSWORD** | The password associated with the `SYSTEM_DB_USER` for authentication.
| **SYSTEM_DB_NAME**     | The name of the **system database** that your application will connect to. the docker-compose config will create a new fresh database after initial container running. |
| **SYSTEM_DB_CHARSET**  | Defines the character set or encoding for the **system database** connection.

### Tenant Database

Following environment variables related to the tenant databases.

| Variable                      | Description |
| ----------------------------- | ------------- |
| **TENANT_DB_NAME_PERFIX**     | The prefix name of the **tenant databases** e.g. if the prefix name is `bigcapital_` the created tenant database at the runtime wil be `bigcapital_123123` with unique organization id. 
| **TENANT_DB_HOST**            | The hostname or IP address of the **tenants database** server.
| **TENANT_DB_USER**            | The port number of the **tenants database** server where the database service is running.
| **TENANT_DB_PASSWORD**        | The password associated with the `TENANT_DB_USER` for authentication.
| **TENANT_DB_CHARSET**         | Defines the character set or encoding for the **tenants databases** connection.

### Database

Following environment variables is mutual variables between system and tenant databases if both holding the same values.

:::info
If you have set the environment variable `DB_USER=bigcapital` and `SYSTEM_DB_USER=acme`, the value of `DB_USER` will be deprecated and the system's database user will be "**acme**". Similarly, if you have defined `TENANT_DB_NAME=acme`, the tenant databases will default to "**bigcapital**" until a value set to `TENANT_DB_NAME`.
:::

| Variable              | Description |
| --------------------- | ------------- |
| **DB_HOST**           | The hostname or IP address of the **system and tenant databases** server.
| **DB_USER**           | The port number of the **system and tenant databases** server where the database service is running.
| **DB_PASSWORD**       | The password associated with the `DB_PASSWORD` for authentication.
| **DB_CHARSET**        | Defines the character set or encoding for the **system and tenants databases** connection.

### Application

| Variable           | Description |
| ------------------ | ------------- |
| **JWT_SECRET**     | should be a strong, random, and unique value to enhance the security |

### Signup Restrictions

Following environment variables related to the [Signup Restrictions](/docs/deployment/signup_restriction).

| Variable                      | Description 
| ----------------------------- | ----------------------------------------------------
| **SIGNUP_DISABLED**           | Disable the signing up of new users .
| **SIGNUP_ALLOWED_DOMAINS**    | Restrict signups to emails belonging to only a specific set of domains. This field takes a comma-separated set of values.
| **SIGNUP_ALLOWED_EMAILS**     | restrict signups to specific email addresses. This field takes a comma-separated set of values.