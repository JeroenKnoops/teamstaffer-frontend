# Teamstaffer frontend

## Teamstaffer

This is the frontend part of the Teamstaffer application.

## Components

### Teamstaffer service

The backend: https://github.com/rholdorp/teamstaffer-service

### Teamstaffer frontend

This repo.

## How to run frontend only

### Build

```
yarn
```

### Start
Make sure you've started the backend service. See instruction: http://github.com/rholdorp/teamstaffer-service

```
yarn start
```

Goto http://localhost:3000

## How to run teamstaffer suite

### Build application

```
docker build . -t teamstaffer_frontend
```

### Run teamstaffer suite.

The backend projects contains a docker-compose file with backend, frontend and database settings.

```
cd ../teamstaffer-service
docker-compose up -d
```

Goto http://localhost:3000


