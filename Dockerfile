FROM registry-in.beta.sohucs.com/nginx:1.9.4
COPY . /opt/web/draft-reform
ENV PATH=${PATH}:/opt/apps/node/bin NODE_ENV=test
RUN apt-get -y update \
    && apt-get install -y curl \
    && curl -OL http://cdn.npm.taobao.org/dist/node/v7.9.0/node-v7.9.0-linux-x64.tar.gz \
    && tar -xzvf node-v7.9.0-linux-x64.tar.gz \
    && mkdir -p /opt/apps/node \
    && cp -R node-v7.9.0-linux-x64/* /opt/apps/node \
    && rm -rf node-v7.9.0-linux-x64 \
    && rm node-v7.9.0-linux-x64.tar.gz \
    && npm config set registry https://registry.npm.taobao.org
WORKDIR /opt/web/draft-reform
RUN npm install && npm run init
CMD npm run start:test && nginx -g 'daemon off;'