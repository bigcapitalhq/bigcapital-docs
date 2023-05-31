---
sidebar_position: 3
---

# Troubleshooting

### Ports unavailable

If you encountered that ports 80 or 443 are not available, it's recommended to terminate all processes using these ports and restart them. If it is not possible to stop the processes occupying these ports, **you can modify the public port of the application proxy and re-run Bigcapital once more**.

1. From `.env` there are two envirment variable for proxy port, change these ports to your custom port as shown in the below example.

```
# App Proxy
PUBLIC_PROXY_PORT=8000
PUBLIC_PROXY_SSL_PORT=443
```

2. Run `docker-compose up -d`

:::tip
To stop a previous version of Bigcapital running on these ports, run the following:

Stop production containers: `docker-compose --file docker-compose.prod.yml down` <br />
Stop development containers: `docker-compose down` <br />
Kill all running containers: `docker container kill $(docker ps -q)`
:::
