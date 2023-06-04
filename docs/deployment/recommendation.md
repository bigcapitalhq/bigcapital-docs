---
sidebar_position: 1
---

# System Recommendations

This page includes information about the minimum requirements you need to install and use self-managed Bigcapital.

### CPU

CPU requirements are dependent on the number of users, organizations, volume of transactions and expected workload.

- 2 cores is the recommended minimum number of cores and supports up to 10 organizations.

### Memory

Memory requirements are dependent on the number of users, organizations, volume of transactions and expected workload.

- 4 GB RAM is the required minimum memory size and supports up to 10 organizations

:::note
The higher volume transactions and journal entries you have the higher CPU and memory you need, generating financial reports with a large number of transactions necessitates substantial computational power and memory resources.
:::

### MariaDB Server

The server running MariaDB should have at least 5-10 GB of storage available, though the exact requirements depend on the number of organizations.

The minimum MariaDB version should be >= `v10.2.0`