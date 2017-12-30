FROM nginx
MAINTAINER goliatone <hello@goliatone.com>

# Install vi, for development
RUN apt-get update && apt-get install vim -y

# Ensure we have a default.conf so we can mount the volume.
COPY ./ops/nginx/conf.d/coreio.nginx.conf /etc/nginx/conf.d/default.conf

# Set contents
COPY ./output /usr/share/nginx/html
