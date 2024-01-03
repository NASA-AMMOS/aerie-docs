# Advanced - Reverse Proxy

# Deploying with HTTPS / Behind a reverse proxy

The `./deployment/proxy` folder contains the following as a standard pattern for deploying Aerie with a reverse proxy:
```
- nginx.conf # nginx (reverse proxy) configuration file that terminates TLS and proxies traffic to internal containers
- Dockerfile # runs an nginx instance as configured above
- docker-compose-proxy.yml # docker-compose that runs the above Docker container within the Aerie stack, closing unneccesary ports
```

In this example, an [`nginx`](https://nginx.org) instance runs within the Aerie container stack, acting as the single ingress point for all network traffic, which strips TLS and forwards HTTP traffic to internal containers.

## Generating a self-signed TLS certificate for testing

Running the following command will generate a self-signed certificate for testing TLS. It will prompt you for several fields which can all be left blank (i.e. just press enter).

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 --nodes
```

Move these `key.pem` and `cert.pem` files into the `./deployment/proxy` folder, so `nginx` can read them.

## Define Aerie deployment host
When running a production deployment of Aerie, you can use DNS records to point a domain to your deployment server's IP address.

To emulate DNS on a local machine, you can edit `/etc/hosts` (on unix-based machines). Adding the following line will redirect `localhost.jpl.nasa.gov` to `127.0.0.1`, which will allow us to use a fake domain name for a local Aerie deployment. This can be any domain, but it's a best practice to use something that doesn't exist as a public site.

```
127.0.0.1 localhost.jpl.nasa.gov
```

## Run Aerie instance with reverse proxy
Edit your Aerie `./deployment/.env` file to define `AERIE_HOST=${whatever domain you put in your /etc/hosts or DNS}`.

Running the following command from the `./deployment` directory of the Aerie repo will now deploy the regular Aerie stack with `nginx` proxying all connections.
```
docker compose -f docker-compose.yml -f ./proxy/docker-compose-proxy.yml up -d --build
```

You can now visit `https://here-is-the-domain-you.set`, which will prompt you to trust a self-signed certificate, and then forward you to Aerie as usual!
