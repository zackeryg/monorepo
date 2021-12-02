FROM node:17

WORKDIR /app

RUN npm i -g npm@7.19

ARG workspace

COPY package.json .
COPY package-lock.json .

COPY api ./api
COPY packages/backend ./packages/backend

# TODO: This is suboptimal but works for now
RUN npm i -w @zgriesinger/${workspace}

# We can pull in lerna to make this "just work"
RUN npm run build -w @zgriesinger/logger

RUN npm run build -w @zgriesinger/${workspace}

# TODO maybe do a prod install here

CMD ["npm", "run", "start:prod", "-w", "@zgriesinger/service-a"]

